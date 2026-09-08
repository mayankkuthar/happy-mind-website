import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { auth, type AuthUser } from "@/v2/lib/auth";
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

function makeFallback(): OrgStatus {
  return { isOrgUser: false, orgPlanIds: [], hasSolv: false, hasHappiTalk: false, loading: false };
}

/** No-op export for backward compatibility if any file calls clearOrgStatusCache */
export function clearOrgStatusCache() {
  // Handled automatically by React Query + auth-change listener
}

/**
 * Hook: returns org status for the currently logged-in user.
 *
 * Uses organization_plan_ids from GET /api/v1/website/subscribed-services
 * as the reliable org detection signal (happimynd_code is broken on backend).
 *
 * Returns all-false/empty when not logged in.
 */
export function useOrgStatus(): OrgStatus {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => auth.get());

  useEffect(() => {
    const handleAuthChange = () => setAuthUser(auth.get());
    window.addEventListener("happimynd:auth-change", handleAuthChange);
    return () => window.removeEventListener("happimynd:auth-change", handleAuthChange);
  }, []);

  const token = authUser?.token;

  const { data, isLoading } = useQuery({
    queryKey: ["orgStatus", token],
    queryFn: async () => {
      if (!token) return makeFallback();
      try {
        const res = await fetchSubscribedServices(token);
        const rawIds = res?.organization_plan_ids ?? [];
        const orgPlanIds: number[] = Array.isArray(rawIds)
          ? rawIds.map((id: any) => Number(id)).filter((n: number) => !isNaN(n) && n > 0)
          : [];

        // HappiTALK is strictly Plan ID 6
        const hasHappiTalk = orgPlanIds.includes(ORG_PLAN_IDS.HAPPITALK);
        // SOLV is strictly Plan ID 22. Only free if Plan 22 is in organization_plan_ids.
        const hasSolv = orgPlanIds.includes(ORG_PLAN_IDS.SOLV);

        const result: OrgStatus = {
          isOrgUser: orgPlanIds.length > 0,
          orgPlanIds,
          hasSolv,
          hasHappiTalk,
          loading: false,
        };

        if (import.meta.env.DEV) {
          console.log("🏢 [useOrgStatus] Resolved organization plans:", {
            orgPlanIds,
            hasSolv,
            hasHappiTalk,
            tokenPrefix: token.slice(0, 8),
          });
        }

        return result;
      } catch (err) {
        console.warn("Failed to resolve org status:", err);
        return makeFallback();
      }
    },
    enabled: !!token,
    staleTime: 30_000,
  });

  if (!token) {
    return makeFallback();
  }

  return (
    data ?? {
      isOrgUser: false,
      orgPlanIds: [],
      hasSolv: false,
      hasHappiTalk: false,
      loading: isLoading,
    }
  );
}
