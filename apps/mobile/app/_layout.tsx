import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserRole } from '@taskpro/types';
import { useAuth } from '../src/hooks/useAuth';
import { RootProviders } from '../src/providers/RootProviders';

function NavigationGuard() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/login');
      return;
    }

    if (session && inAuthGroup) {
      const target = session.role === UserRole.Provider ? '/(technician)' : '/(customer)';
      router.replace(target);
    }
  }, [isLoading, router, segments, session]);

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
