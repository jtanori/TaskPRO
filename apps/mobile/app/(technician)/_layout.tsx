import React from 'react';
import { Stack } from 'expo-router';

export default function TechnicianLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: 'Technician' }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
