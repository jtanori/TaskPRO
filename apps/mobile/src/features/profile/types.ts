import type { Currency, Locale, UserId } from '@taskpro/types';

export interface CreateProfileInput {
  userId: UserId;
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  locale: Locale;
  currency: Currency;
  timezone: string;
}

export interface UpdateProfileInput {
  userId: UserId;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
}
