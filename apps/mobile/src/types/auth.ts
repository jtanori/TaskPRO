import type { UserId, UserRole } from '@taskpro/types';

export interface UserSession {
  userId: UserId;
  role: UserRole;
  accessToken: string;
}
