import '../src/lib/i18n';
import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserRole } from '@taskpro/types';
import { useAuth } from '../src/features/auth';
import { useProfile } from '../src/features/profile';
import { RootProviders } from '../src/providers/RootProviders';

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

export default function RootLayout() {
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
