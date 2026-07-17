import { Currency, Locale, createUserId } from '@taskpro/types';
import { describe, expect, it } from 'vitest';
import { FakeProfileService } from '../FakeProfileService';

describe('FakeProfileService', () => {
  const service = new FakeProfileService();
  const userId = createUserId('user-test-1');

  it('creates a profile', async () => {
    const profile = await service.createProfile({
      userId,
      firstName: 'Ana',
      lastName: 'López',
      phone: '+521234567890',
      locale: Locale.Es,
      currency: Currency.MXN,
      timezone: 'America/Mexico_City',
    });

    expect(profile.displayName).toBe('Ana López');
    expect(profile.locale).toBe(Locale.Es);
  });

  it('retrieves an existing profile', async () => {
    const profile = await service.getProfile(userId);
    expect(profile).not.toBeNull();
    expect(profile?.firstName).toBe('Ana');
  });

  it('updates a profile', async () => {
    const updated = await service.updateProfile({
      userId,
      firstName: 'Ana María',
      bio: 'Cliente frecuente',
    });

    expect(updated.firstName).toBe('Ana María');
    expect(updated.displayName).toBe('Ana María López');
    expect(updated.bio).toBe('Cliente frecuente');
  });
});
