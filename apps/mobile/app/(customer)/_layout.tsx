import React from 'react';
import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: 'Customer' }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="services/index" options={{ title: 'Services' }} />
      <Stack.Screen name="services/[id]" options={{ title: 'Service Detail' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="profile/edit" options={{ title: 'Edit Profile' }} />
    </Stack>
  );
}
