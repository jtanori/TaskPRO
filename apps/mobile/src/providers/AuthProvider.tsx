import React, { createContext, useCallback, useEffect, useState } from 'react';
import { createUserId, UserRole } from '@taskpro/types';
import { clearSession, loadSession, saveSession } from '../lib/session';
import type { UserSession } from '../types/auth';

export interface AuthContextValue {
  session: UserSession | null;
  isLoading: boolean;
  signIn: (email: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  isLoading: true,
  signIn: async () => undefined,
  signOut: async () => undefined,
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    loadSession().then((restored) => {
      if (mounted) {
        setSession(restored);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, role: UserRole) => {
    const next: UserSession = {
      userId: createUserId(`user-${email.toLowerCase().replace(/[^a-z0-9]/gu, '-')}`),
      role,
      accessToken: `mock-token-${Date.now()}`,
    };
    await saveSession(next);
    setSession(next);
  }, []);

  const signOut = useCallback(async () => {
    await clearSession();
    setSession(null);
  }, []);

  const value: AuthContextValue = {
    session,
    isLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
