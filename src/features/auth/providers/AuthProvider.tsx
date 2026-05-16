// src/features/auth/providers/AuthProvider.tsx
//
// Global auth state provider.
// - Restore session khi reload app (getSession)
// - Subscribe auth changes (onAuthStateChange)
// - Expose: user, loading, signIn, signUp, signOut
//
// Wrap toàn App:
//   <AuthProvider>
//     <App />
//   </AuthProvider>

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import * as authApi from "../services/auth.api";
import type { AuthResult, AuthUser, SignInCredentials, SignUpCredentials } from "../types";

// ─── Context shape ─────────────────────────────────────────────────────────────

interface AuthContextValue {
  user:    AuthUser | null;
  loading: boolean;

  signIn:  (credentials: SignInCredentials) => Promise<AuthResult>;
  signUp:  (credentials: SignUpCredentials) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // true khi đang restore session ban đầu
  const mounted = useRef(true);

  // Restore session khi app load lần đầu + subscribe changes
  useEffect(() => {
    mounted.current = true;

    // 1. Restore existing session
    authApi.getSession().then((existingUser) => {
      if (mounted.current) {
        setUser(existingUser);
        setLoading(false);
      }
    });

    // 2. Subscribe to future auth changes (login / logout / token refresh)
    const unsubscribe = authApi.onAuthStateChange((updatedUser) => {
      if (mounted.current) {
        setUser(updatedUser);
        setLoading(false);
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, []);

  // ─── Actions ──────────────────────────────────────────────────────────────

  const signIn = useCallback(async (credentials: SignInCredentials): Promise<AuthResult> => {
    const result = await authApi.signIn(credentials);
    // user state sẽ tự update qua onAuthStateChange
    return result;
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials): Promise<AuthResult> => {
    return authApi.signUp(credentials);
  }, []);

  const signOut = useCallback(async () => {
    await authApi.signOut();
    // user state sẽ tự set null qua onAuthStateChange
  }, []);

  // ─── Value ────────────────────────────────────────────────────────────────

  const value: AuthContextValue = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
