import { useEffect, useState, useCallback } from "react";
import {
  redirectToSpotifyLogin,
  handleAuthRedirect,
  isLoggedIn,
  logout as clearTokens,
} from "../auth.js";

// Exposes login state and a login()/logout() pair to components.
// Handles the OAuth redirect callback once, on mount.
export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const justLoggedIn = await handleAuthRedirect();
        if (!cancelled) {
          setLoggedIn(justLoggedIn || isLoggedIn());
        }
      } catch (err) {
        if (!cancelled) setAuthError(err.message);
      } finally {
        if (!cancelled) setCheckingAuth(false);
      }
    }

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(() => {
    redirectToSpotifyLogin();
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setLoggedIn(false);
  }, []);

  return { loggedIn, authError, checkingAuth, login, logout };
}
