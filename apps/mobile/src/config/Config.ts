import { Environment, getCurrentEnvironment } from './Environment';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export interface SentryConfig {
  dsn: string;
}

export interface PostHogConfig {
  apiKey: string;
}

export interface MapsConfig {
  apiKey?: string;
}

export interface StripeConfig {
  publishableKey: string;
}

export interface AppConfig {
  environment: Environment;
  appName: string;
  apiUrl: string;
  supabase: SupabaseConfig;
  sentry: SentryConfig;
  posthog: PostHogConfig;
  maps: MapsConfig;
  stripe: StripeConfig;
}

function readEnv(key: string): string | undefined {
  return process.env[key];
}

function buildConfig(): AppConfig {
  const environment = getCurrentEnvironment();

  return {
    environment,
    appName: environment === Environment.Staging ? 'TaskPRO Staging' : 'TaskPRO',
    apiUrl: readEnv('EXPO_PUBLIC_API_URL') ?? '',
    supabase: {
      url: readEnv('EXPO_PUBLIC_SUPABASE_URL') ?? '',
      anonKey: readEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY') ?? '',
    },
    sentry: {
      dsn: readEnv('EXPO_PUBLIC_SENTRY_DSN') ?? '',
    },
    posthog: {
      apiKey: readEnv('EXPO_PUBLIC_POSTHOG_API_KEY') ?? '',
    },
    maps: {
      apiKey: readEnv('EXPO_PUBLIC_GOOGLE_MAPS_API_KEY'),
    },
    stripe: {
      publishableKey: readEnv('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY') ?? '',
    },
  };
}

export const Config = buildConfig();

export function validateConfig(): void {
  const { environment, supabase, sentry, posthog, stripe } = Config;

  if (environment === Environment.Production || environment === Environment.Staging) {
    const missing: string[] = [];
    if (!supabase.url) missing.push('EXPO_PUBLIC_SUPABASE_URL');
    if (!supabase.anonKey) missing.push('EXPO_PUBLIC_SUPABASE_ANON_KEY');
    if (!sentry.dsn) missing.push('EXPO_PUBLIC_SENTRY_DSN');
    if (!posthog.apiKey) missing.push('EXPO_PUBLIC_POSTHOG_API_KEY');
    if (!stripe.publishableKey) missing.push('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY');

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables for ${environment}: ${missing.join(', ')}`
      );
    }
  }
}
