import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  ConsentPreferences,
  OPEN_COOKIE_SETTINGS_EVENT,
  getStoredConsent,
  saveConsent,
} from "@/lib/cookieConsent";

// Wait for the home-page mascot splash (≈5.6s) before asking on first load.
const SHOW_DELAY_MS =
  typeof window !== "undefined" && window.location.pathname === "/" ? 6000 : 1200;

const CATEGORIES: {
  key: keyof ConsentPreferences | "essential";
  title: string;
  description: string;
}[] = [
  {
    key: "essential",
    title: "Essential",
    description:
      "Needed for the site to work: sign-in, security, forms and remembering your cookie choice. Always on.",
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Help us understand how visitors use HappiMynd (Google Analytics) so we can improve it. No personal details are shared.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Used to measure our campaigns and show you relevant HappiMynd content on other sites.",
  },
];

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (stored) {
      setPrefs(stored);
    } else {
      timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    }

    const openSettings = () => {
      const current = getStoredConsent();
      if (current) setPrefs(current);
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const commit = (next: ConsentPreferences) => {
    saveConsent(next);
    setPrefs(next);
    setVisible(false);
    setShowDetails(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed z-[95] left-4 right-4 bottom-24 sm:left-auto sm:right-24 sm:bottom-6 sm:w-[26rem] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border bg-card text-card-foreground shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground text-base">We value your privacy</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            We use cookies to keep the site working and, with your permission, to understand
            how it's used. Read our{" "}
            <a
              href="https://happimynd.com/privacy"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
        {getStoredConsent() && (
          <button
            onClick={() => {
              setVisible(false);
              setShowDetails(false);
            }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Close cookie settings"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDetails && (
        <ul className="mt-4 space-y-3">
          {CATEGORIES.map((cat) => {
            const isEssential = cat.key === "essential";
            const checked = isEssential ? true : prefs[cat.key as keyof ConsentPreferences];
            const id = `cookie-cat-${cat.key}`;
            return (
              <li key={cat.key} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor={id} className="text-sm font-medium text-foreground">
                    {cat.title}
                  </label>
                  <Switch
                    id={id}
                    checked={checked}
                    disabled={isEssential}
                    onCheckedChange={(v) =>
                      setPrefs((p) => ({ ...p, [cat.key]: v }))
                    }
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-col-reverse sm:flex-row gap-2">
        {showDetails ? (
          <button
            onClick={() => commit(prefs)}
            className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Save choices
          </button>
        ) : (
          <button
            onClick={() => setShowDetails(true)}
            className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Customise
          </button>
        )}
        <button
          onClick={() => commit({ analytics: false, marketing: false })}
          className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Reject all
        </button>
        <button
          onClick={() => commit({ analytics: true, marketing: true })}
          className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Accept all
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
