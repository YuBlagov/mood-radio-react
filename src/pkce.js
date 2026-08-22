// PKCE (Proof Key for Code Exchange) implementation — lets us do the
// Spotify OAuth login without a backend and without a client_secret.
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateCodeVerifier(length = 64) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible[values[i] % possible.length];
  }
  return text;
}

export async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(digest);
}

export function generateRandomState(length = 16) {
  return generateCodeVerifier(length);
}
