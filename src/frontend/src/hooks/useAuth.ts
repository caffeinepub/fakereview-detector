/**
 * Authentication hook — wraps Internet Identity from the Caffeine core
 * infrastructure and exposes a clean, typed API for the rest of the app.
 *
 * Usage:
 *   const { isAuthenticated, isLoading, login, logout, principal } = useAuth();
 */

import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export interface AuthState {
  /** True when the user has a valid Internet Identity session */
  isAuthenticated: boolean;
  /**
   * True while the identity provider is still resolving the session.
   * Avoid rendering protected content while this is true.
   */
  isLoading: boolean;
  /** The user's principal id, or null when unauthenticated */
  principal: string | null;
  /** Triggers the Internet Identity login flow */
  login: () => Promise<void>;
  /** Clears the session and all cached React Query data */
  logout: () => Promise<void>;
}

export function useAuth(): AuthState {
  const { login, clear, isLoginSuccess, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  // While isLoginSuccess is false AND we have no identity, we are loading
  const isLoading = !isLoginSuccess && !isAuthenticated;

  const handleLogin = useCallback(async () => {
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      // If already authenticated in a stale session, clear then re-login
      if (msg === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        console.error("Login failed:", msg);
      }
    }
  }, [login, clear]);

  const handleLogout = useCallback(async () => {
    await clear();
    // Wipe all server-state cache so the next user starts fresh
    queryClient.clear();
  }, [clear, queryClient]);

  const principal = identity ? identity.getPrincipal().toString() : null;

  return {
    isAuthenticated,
    isLoading,
    principal,
    login: handleLogin,
    logout: handleLogout,
  };
}
