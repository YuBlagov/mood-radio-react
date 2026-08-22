import { CONFIG } from "./config.js";
import { generateCodeVerifier, generateCodeChallenge, generateRandomState } from "./pkce.js";

const STORAGE_KEYS = {
  VERIFIER: "mr_code_verifier",
  STATE: "mr_auth_state",
  ACCESS_TOKEN: "mr_access_token",
  REFRESH_TOKEN: "mr_refresh_token",
  EXPIRES_AT: "mr_expires_at",
};

// Sends the user to the Spotify authorization page.
export async function redirectToSpotifyLogin() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = generateRandomState();

  sessionStorage.setItem(STORAGE_KEYS.VERIFIER, verifier);
  sessionStorage.setItem(STORAGE_KEYS.STATE, state);

  const params = new URLSearchParams({
    client_id: CONFIG.CLIENT_ID,
    response_type: "code",
    redirect_uri: CONFIG.REDIRECT_URI,
    scope: CONFIG.SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Called on page load: if the URL has ?code=..., exchanges it for a token.
// Returns true if a fresh login just happened.
export async function handleAuthRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");
  const error = urlParams.get("error");

  if (error) {
    throw new Error(`Spotify returned an authorization error: ${error}`);
  }
  if (!code) return false;

  const expectedState = sessionStorage.getItem(STORAGE_KEYS.STATE);
  if (!state || state !== expectedState) {
    throw new Error("State mismatch — possible CSRF attempt, login aborted.");
  }

  const verifier = sessionStorage.getItem(STORAGE_KEYS.VERIFIER);
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: CONFIG.REDIRECT_URI,
    client_id: CONFIG.CLIENT_ID,
    code_verifier: verifier,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error("Failed to exchange the authorization code for a token.");
  }

  const data = await res.json();
  storeTokens(data);

  // Strip ?code&state from the address bar so they aren't left visible or reused.
  window.history.replaceState({}, document.title, CONFIG.REDIRECT_URI);
  return true;
}

function storeTokens(data) {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
  if (data.refresh_token) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
  }
  const expiresAt = Date.now() + data.expires_in * 1000;
  localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, String(expiresAt));
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  if (!refreshToken) return null;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: CONFIG.CLIENT_ID,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) return null;
  const data = await res.json();
  storeTokens(data);
  return data.access_token;
}

// Returns a valid access token, refreshing it first if it's about to expire.
export async function getValidAccessToken() {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const expiresAt = Number(localStorage.getItem(STORAGE_KEYS.EXPIRES_AT) || 0);

  if (!token) return null;
  // Refresh 30 seconds early to avoid racing against expiry.
  if (Date.now() > expiresAt - 30000) {
    return await refreshAccessToken();
  }
  return token;
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN));
}

export function logout() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}
