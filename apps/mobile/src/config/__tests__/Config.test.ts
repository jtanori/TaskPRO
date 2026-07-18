import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
});

describe('Environment', () => {
  const originalEnv = process.env.EXPO_PUBLIC_APP_ENV;

  beforeEach(() => {
    delete process.env.EXPO_PUBLIC_APP_ENV;
  });

  afterEach(() => {
    process.env.EXPO_PUBLIC_APP_ENV = originalEnv;
  });

  it('defaults to development when no environment is set', async () => {
    const { getCurrentEnvironment } = await import('../Environment');
    expect(getCurrentEnvironment()).toBe('development');
  });

  it('recognizes staging environment', async () => {
    process.env.EXPO_PUBLIC_APP_ENV = 'staging';
    const { getCurrentEnvironment, isStaging } = await import('../Environment');
    expect(getCurrentEnvironment()).toBe('staging');
    expect(isStaging()).toBe(true);
  });

  it('falls back to development for invalid values', async () => {
    process.env.EXPO_PUBLIC_APP_ENV = 'invalid';
    const { getCurrentEnvironment } = await import('../Environment');
    expect(getCurrentEnvironment()).toBe('development');
  });
});

describe('validateConfig', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('does not throw in development when variables are missing', async () => {
    process.env.EXPO_PUBLIC_APP_ENV = 'development';
    delete process.env.EXPO_PUBLIC_SUPABASE_URL;
    delete process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
    const { validateConfig } = await import('../Config');
    expect(() => validateConfig()).not.toThrow();
  });

  it('throws in production when required variables are missing', async () => {
    process.env.EXPO_PUBLIC_APP_ENV = 'production';
    delete process.env.EXPO_PUBLIC_SUPABASE_URL;
    delete process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.EXPO_PUBLIC_SENTRY_DSN;
    delete process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
    delete process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const { validateConfig } = await import('../Config');
    expect(() => validateConfig()).toThrow(/Missing required environment variables for production/);
  });

  it('does not throw in production when required variables are present', async () => {
    process.env.EXPO_PUBLIC_APP_ENV = 'production';
    process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://project.supabase.co';
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';
    process.env.EXPO_PUBLIC_SENTRY_DSN = 'https://sentry.example';
    process.env.EXPO_PUBLIC_POSTHOG_API_KEY = 'posthog-key';
    process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_key';
    const { validateConfig } = await import('../Config');
    expect(() => validateConfig()).not.toThrow();
  });
});

describe('FeatureFlags', () => {
  const originalEnv = process.env.EXPO_PUBLIC_APP_ENV;

  afterEach(() => {
    process.env.EXPO_PUBLIC_APP_ENV = originalEnv;
  });

  it('disables real backends in development', async () => {
    process.env.EXPO_PUBLIC_APP_ENV = 'development';
    const { FeatureFlags } = await import('../FeatureFlags');
    expect(FeatureFlags.enableRealAuth).toBe(false);
    expect(FeatureFlags.enableRealPayments).toBe(false);
    expect(FeatureFlags.enableAnalytics).toBe(false);
    expect(FeatureFlags.enableCrashReporting).toBe(false);
  });

  it('enables real backends in staging', async () => {
    process.env.EXPO_PUBLIC_APP_ENV = 'staging';
    const { FeatureFlags } = await import('../FeatureFlags');
    expect(FeatureFlags.enableRealAuth).toBe(true);
    expect(FeatureFlags.enableRealPayments).toBe(true);
    expect(FeatureFlags.enableAnalytics).toBe(true);
    expect(FeatureFlags.enableCrashReporting).toBe(true);
  });
});
