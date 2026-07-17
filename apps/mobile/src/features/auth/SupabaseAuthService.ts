import type { SupabaseClient, User } from '@supabase/supabase-js';
import { createUserId, UserRole, UserStatus, type UserDto } from '@taskpro/types';
import { AuthError, type AuthSession } from './types';
import type { AuthService } from './AuthService';

function mapSupabaseUser(user: User): UserDto {
  const metadata = user.user_metadata as { role?: UserRole } | undefined;
  const role = metadata?.role ?? UserRole.Customer;

  return {
    id: createUserId(user.id),
    email: user.email ?? '',
    role,
    status: UserStatus.Active,
    createdAt: user.created_at ?? '',
    updatedAt: user.updated_at ?? '',
  };
}

function toAuthError(error: unknown): AuthError {
  if (error instanceof AuthError) return error;

  const message = error instanceof Error ? error.message : 'Authentication failed';
  const code: 'invalid_credentials' | 'unknown' = message
    .toLowerCase()
    .includes('invalid login credentials')
    ? 'invalid_credentials'
    : 'unknown';

  return new AuthError(code, message);
}

export class SupabaseAuthService implements AuthService {
  constructor(private readonly client: SupabaseClient) {}

  async signIn(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error || !data.session || !data.user) {
      throw toAuthError(error ?? new Error('Invalid login credentials'));
    }

    return {
      user: mapSupabaseUser(data.user),
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  async signUp(email: string, password: string, role: UserRole): Promise<AuthSession> {
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
      options: { data: { role } },
    });
    if (error || !data.session || !data.user) {
      throw toAuthError(error ?? new Error('Registration failed'));
    }

    return {
      user: mapSupabaseUser(data.user),
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) {
      throw toAuthError(error);
    }
  }

  async restoreSession(): Promise<AuthSession | null> {
    const {
      data: { session },
      error: sessionError,
    } = await this.client.auth.getSession();
    if (sessionError || !session) return null;

    const { data, error: userError } = await this.client.auth.getUser();
    if (userError || !data.user) return null;

    return {
      user: mapSupabaseUser(data.user),
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }
}
