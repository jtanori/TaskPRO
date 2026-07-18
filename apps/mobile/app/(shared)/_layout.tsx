import React from 'react';
import { Stack } from 'expo-router';

export default function SharedLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="professional/[id]" options={{ title: 'Professional Profile' }} />
      <Stack.Screen name="reviews/[professionalId]" options={{ title: 'Reviews' }} />
    </Stack>
  );
}
