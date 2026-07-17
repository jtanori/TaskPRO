import type { UserId } from '@taskpro/types';

export class UserRegistered {
  readonly eventType = 'identity.user.registered' as const;

  constructor(
    public readonly userId: UserId,
    public readonly email: string
  ) {}
}
