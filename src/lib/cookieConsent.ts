/**
 * Cookie consent storage + Google Analytics Consent Mode wiring.
 *
 * The visitor's choice lives in a first-party cookie (`hm_cookie_consent`).
 * index.html reads the same cookie before gtag loads, so analytics stays
 * denied until the visitor opts in. Keep COOKIE_NAME in sync with index.html.
 */

export const COOKIE_NAME = "hm_cookie_consent";
const CONSENT_VERSION = 1;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = ConsentPreferences & { v: number; ts: number };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): ConsentPreferences | null {
  try {
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`))
      ?.slice(COOKIE_NAME.length + 1);
    if (!raw) return null;
    const parsed = JSON.parse(decodeURIComponent(raw)) as StoredConsent;
    if (parsed.v !== CONSENT_VERSION) return null;
    return { analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

export function saveConsent(prefs: ConsentPreferences) {
  const value: StoredConsent = { ...prefs, v: CONSENT_VERSION, ts: Date.now() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(value),
  )}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  applyConsent(prefs);
}

export function applyConsent(prefs: ConsentPreferences) {
  window.gtag?.("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}
