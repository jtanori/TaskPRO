import React from 'react';
import { Stack } from 'expo-router';

export default function TechnicianLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: 'Technician' }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="jobs/index" options={{ title: 'My Jobs' }} />
      <Stack.Screen name="jobs/[id]" options={{ title: 'Job Detail' }} />
      <Stack.Screen name="messages/index" options={{ title: 'Messages' }} />
      <Stack.Screen name="messages/[id]" options={{ title: 'Conversation' }} />
      <Stack.Screen name="services/index" options={{ title: 'My Services' }} />
      <Stack.Screen name="services/add" options={{ title: 'Add Service' }} />
      <Stack.Screen name="earnings" options={{ title: 'Earnings' }} />
    </Stack>
  );
}
