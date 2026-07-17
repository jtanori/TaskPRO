import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { UserRole } from '@taskpro/types';
import { supabase } from '../../lib/supabase';
import { AuthContext, type AuthContextValue } from './AuthContext';
import { SupabaseAuthService } from './SupabaseAuthService';
import { AuthError, type AuthSession } from './types';

const authService = new SupabaseAuthService(supabase);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const restoreSession = useCallback(async () => {
    try {
      const restored = await authService.restoreSession();
      setSession(restored);
    } catch (err) {
      setError(err instanceof AuthError ? err : new AuthError('unknown', 'Session restore failed'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void restoreSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        if (event === 'SIGNED_IN' && supabaseSession) {
          const restored = await authService.restoreSession();
          setSession(restored);
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [restoreSession]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      clearError();
      try {
        const next = await authService.signIn(email, password);
        setSession(next);
      } catch (err) {
        setError(err instanceof AuthError ? err : new AuthError('unknown', 'Sign in failed'));
        throw err;
      }
    },
    [clearError]
  );

  const signUp = useCallback(
    async (email: string, password: string, role: UserRole) => {
      clearError();
      try {
        const next = await authService.signUp(email, password, role);
        setSession(next);
      } catch (err) {
        setError(err instanceof AuthError ? err : new AuthError('unknown', 'Sign up failed'));
        throw err;
      }
    },
    [clearError]
  );

  const signOut = useCallback(async () => {
    clearError();
    await authService.signOut();
    setSession(null);
  }, [clearError]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      error,
      signIn,
      signUp,
      signOut,
      clearError,
    }),
    [session, isLoading, error, signIn, signUp, signOut, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
