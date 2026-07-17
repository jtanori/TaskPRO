import type { UserDto, UserRole } from '@taskpro/types';

export interface AuthSession {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export type AuthErrorCode =
  'invalid_credentials' | 'registration_failed' | 'network_error' | 'unknown';

export class AuthError extends Error {
  constructor(
    public readonly code: AuthErrorCode,
    message: string
  ) {
    super(message);
  }
}

export interface AuthCredentials {
  email: string;
  password: string;
  role?: UserRole;
}
