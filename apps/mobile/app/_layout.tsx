import '../src/lib/i18n';
import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserRole } from '@taskpro/types';
import { useAuth } from '../src/features/auth';
import { useProfile } from '../src/features/profile';
import { RootProviders } from '../src/providers/RootProviders';
import { Config } from '../src/config';
import * as Sentry from '@sentry/react-native';

function isValidSentryDsn(dsn: string): boolean {
  // A Sentry DSN must be an HTTPS URL containing a public key and project id.
  try {
    const url = new URL(dsn);
    return url.protocol === 'https:' && url.username.length > 0 && url.pathname.length > 1;
  } catch {
    return false;
  }
}

if (Config.sentry.dsn && isValidSentryDsn(Config.sentry.dsn)) {
  Sentry.init({
    dsn: Config.sentry.dsn,

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Enable Logs
    enableLogs: true,

    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
  });
}

function NavigationGuard() {
  const { session, isLoading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile(session?.user.id);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (authLoading || profileLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const currentRoute = segments[segments.length - 1];

    if (!session && !inAuthGroup) {
      router.replace('/login');
      return;
    }

    if (session && inAuthGroup) {
      if (!profile && currentRoute !== 'complete-profile') {
        router.replace('/complete-profile');
        return;
      }

      if (profile) {
        const target = session.user.role === UserRole.Provider ? '/(technician)' : '/(customer)';
        router.replace(target);
      }
    }
  }, [authLoading, profileLoading, router, segments, session, profile]);

  return null;
}

function RootLayout() {
  return (
    <RootProviders>
      <NavigationGuard />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(customer)" options={{ headerShown: false }} />
        <Stack.Screen name="(technician)" options={{ headerShown: false }} />
        <Stack.Screen name="(shared)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
      </Stack>
      <StatusBar style="auto" />
    </RootProviders>
  );
}

export default Config.sentry.dsn && isValidSentryDsn(Config.sentry.dsn)
  ? Sentry.wrap(RootLayout)
  : RootLayout;
