import React from 'react';
import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: 'Customer' }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
