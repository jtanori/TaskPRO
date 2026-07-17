import { createContext, useContext } from 'react';
import type { UserRole } from '@taskpro/types';
import type { AuthError, AuthSession } from './types';

export interface AuthContextValue {
  session: AuthSession | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  isLoading: true,
  error: null,
  signIn: async () => undefined,
  signUp: async () => undefined,
  signOut: async () => undefined,
  clearError: () => undefined,
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
