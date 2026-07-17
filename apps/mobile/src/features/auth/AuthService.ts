import type { UserRole } from '@taskpro/types';
import type { AuthSession } from './types';

export interface AuthService {
  signIn(email: string, password: string): Promise<AuthSession>;
  signUp(email: string, password: string, role: UserRole): Promise<AuthSession>;
  signOut(): Promise<void>;
  restoreSession(): Promise<AuthSession | null>;
}
