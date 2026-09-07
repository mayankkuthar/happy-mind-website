import { useEffect, useState } from "react";
import { auth } from "@/v2/lib/auth";
import { fetchSubscribedServices } from "@/v2/lib/website-api";

/**
 * Confirmed org plan ID mapping (source: tech lead / backend investigation).
 *
 * When these IDs appear in organization_plan_ids returned by
 * GET /api/v1/website/subscribed-services, the backend will accept
 * POST /api/v1/avail-free-services with amount=0 — no Razorpay redirect needed.
 */
export const ORG_PLAN_IDS = {
  HAPPILIFE_SCREENING: 1,
  HAPPILIFE_SUMMARY: 2,
  HAPPIBUDDY: 3,
  HAPPITALK: 6,  // Corporate HappiTALK entitlement (Package ID 6)
  HAPPISELF: 21,
  SOLV: 22,      // HappiGUIDE / SOLV
} as const;

export type OrgStatus = {
  /** true when organization_plan_ids is non-empty — the reliable server-side org signal */
  isOrgUser: boolean;
  /** Raw array of plan IDs provisioned by the org, e.g. [1, 2, 3, 6, 21, 22] */
  orgPlanIds: number[];
  /** Convenience: plan ID 22 (SOLV) is in orgPlanIds */
  hasSolv: boolean;
  /** Convenience: plan ID 6 (HappiTALK) is in orgPlanIds */
  hasHappiTalk: boolean;
  /** Still fetching from /subscribed-services */
  loading: boolean;
};

// Module-level cache — fetched once per session, not per component mount.
// Keyed on token so switching accounts gets fresh data.
let _cacheToken: string | null = null;
let _cacheResult: OrgStatus | null = null;
let _inFlight: Promise<OrgStatus> | null = null;

function makeFallback(): OrgStatus {
  return { isOrgUser: false, orgPlanIds: [], hasSolv: false, hasHappiTalk: false, loading: false };
}

async function resolveOrgStatus(token: string): Promise<OrgStatus> {
  // Return cached result if token matches
  if (_cacheToken === token && _cacheResult) return _cacheResult;

  // Deduplicate concurrent fetches
  if (_inFlight && _cacheToken === token) return _inFlight;

  _cacheToken = token;
  _inFlight = fetchSubscribedServices(token)
    .then((data) => {
      const orgPlanIds: number[] = data?.organization_plan_ids ?? [];
      const result: OrgStatus = {
        isOrgUser: orgPlanIds.length > 0,
        orgPlanIds,
        hasSolv: orgPlanIds.includes(ORG_PLAN_IDS.SOLV),
        hasHappiTalk: orgPlanIds.includes(ORG_PLAN_IDS.HAPPITALK),
        loading: false,
      };
      _cacheResult = result;
      _inFlight = null;
      return result;
    })
    .catch(() => {
      _inFlight = null;
      return makeFallback();
    });

  return _inFlight;
}

/** Call this when the user signs out to clear the cache. */
export function clearOrgStatusCache() {
  _cacheToken = null;
  _cacheResult = null;
  _inFlight = null;
}

/**
 * Hook: returns org status for the currently logged-in user.
 *
 * Uses organization_plan_ids from GET /api/v1/website/subscribed-services
 * as the reliable org detection signal (happimynd_code is broken on backend).
 * Results are cached for the lifetime of the session.
 *
 * Returns all-false/empty when not logged in.
 */
export function useOrgStatus(): OrgStatus {
  const [status, setStatus] = useState<OrgStatus>(() => {
    // Optimistic: return cache synchronously if already resolved
    const token = auth.get()?.token ?? null;
    if (token && _cacheToken === token && _cacheResult) {
      return _cacheResult;
    }
    return { isOrgUser: false, orgPlanIds: [], hasSolv: false, hasHappiTalk: false, loading: !!token };
  });

  useEffect(() => {
    const token = auth.get()?.token ?? null;
    if (!token) {
      setStatus(makeFallback());
      return;
    }
    resolveOrgStatus(token).then(setStatus);
  }, []);

  return status;
}
