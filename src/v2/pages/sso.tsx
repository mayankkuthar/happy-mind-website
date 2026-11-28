import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { auth, useAuth } from "@/v2/lib/auth";
import { useSearch, useV2Navigate } from "@/v2/lib/router";
import { createSsoCode, type SsoApp } from "@/v2/lib/auth-api";
import { Button } from "@/v2/components/ui/button";

/**
 * /v2/sso?app=quizzard|hub&return_to=<url>[&prompt=none]
 *
 * Single sign-on into Quizzard and the Games Hub (HappiPAUSE). If the user is
 * logged in here, we get a one-time code from the backend and send them
 * straight back, already signed in. If not, they log in / sign up with the
 * normal OTP flow and come back to this page, which then does the same.
 * With prompt=none (an app's silent check) we never show a login form: a
 * logged-out user goes straight back with ?sso_error=login_required.
 */

const APPS: Record<SsoApp, { name: string; home: string }> = {
  quizzard: { name: "Quizzard", home: "https://quizzard.happimynd.com/" },
  hub: { name: "HappiPAUSE", home: "https://happipause.happimynd.com/" },
};

function isSsoApp(value: string | undefined): value is SsoApp {
  return value === "quizzard" || value === "hub";
}

/** Only ever send people (and codes) back to the app's own site. */
function safeReturnTo(app: SsoApp, returnTo: string | undefined): string {
  const home = APPS[app].home;
  if (!returnTo) return home;
  try {
    const url = new URL(returnTo);
    const allowed = new URL(home);
    const devHost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    return url.origin === allowed.origin || devHost ? url.toString() : home;
  } catch {
    return home;
  }
}

function withParam(url: string, key: string, value: string): string {
  const u = new URL(url);
  u.searchParams.set(key, value);
  return u.toString();
}

export default function SsoPage() {
  const navigate = useV2Navigate();
  const { hydrated } = useAuth();
  const search = useSearch();
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  const app = isSsoApp(search.app) ? search.app : null;
  const silent = search.prompt === "none";

  useEffect(() => {
    if (!hydrated || !app || started.current) return;
    started.current = true;

    const returnTo = safeReturnTo(app, search.return_to);
    const user = auth.get();

    const goLogin = () => {
      if (silent) {
        window.location.replace(withParam(returnTo, "sso_error", "login_required"));
        return;
      }
      // Log in / sign up here, then come back to this page to finish.
      const back = `/sso?app=${app}&return_to=${encodeURIComponent(returnTo)}`;
      navigate({ to: "/login", search: { redirect: back }, replace: true });
    };

    if (!user?.token) {
      goLogin();
      return;
    }

    createSsoCode(user.token, app, returnTo).then((res) => {
      if (res.status === "success") {
        window.location.replace(res.redirect_url);
      } else if (res.status === "unauthorized") {
        // The website session has expired: log in again.
        auth.signOut();
        goLogin();
      } else if (silent) {
        window.location.replace(withParam(returnTo, "sso_error", "failed"));
      } else {
        setError(res.message);
      }
    });
  }, [hydrated, app, silent, search.return_to, navigate]);

  if (!app) {
    return (
      <Centered>
        <p className="font-semibold">This sign-in link isn't valid.</p>
        <Button className="mt-4" onClick={() => navigate({ to: "/" })}>Go to HappiMynd</Button>
      </Centered>
    );
  }

  if (error) {
    return (
      <Centered>
        <p className="font-semibold">We couldn't sign you in to {APPS[app].name}.</p>
        <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>Try again</Button>
      </Centered>
    );
  }

  return (
    <Centered>
      <LoaderCircle className="h-8 w-8 animate-spin text-lavender-deep" />
      <p className="mt-3 text-sm text-muted-foreground">Signing you in to {APPS[app].name}…</p>
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">{children}</div>
  );
}
