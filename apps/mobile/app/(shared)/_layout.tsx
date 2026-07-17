import React from 'react';
import { Stack } from 'expo-router';

export default function SharedLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
