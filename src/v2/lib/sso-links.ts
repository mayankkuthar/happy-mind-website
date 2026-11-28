/**
 * Links into Quizzard / HappiPAUSE through HappiMynd SSO (/v2/sso). A logged-in
 * user arrives already signed in; anyone else just lands on the app
 * (prompt=none never shows a login form).
 */
export const QUIZZARD_SSO_URL = `/v2/sso?app=quizzard&prompt=none&return_to=${encodeURIComponent("https://quizzard.happimynd.com/")}`;
export const HAPPIPAUSE_SSO_URL = `/v2/sso?app=hub&prompt=none&return_to=${encodeURIComponent("https://happipause.happimynd.com/")}`;
