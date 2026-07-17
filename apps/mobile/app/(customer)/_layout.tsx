import React from 'react';
import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: 'Customer' }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="services/index" options={{ title: 'Services' }} />
      <Stack.Screen name="services/[id]" options={{ title: 'Service Detail' }} />
      <Stack.Screen name="services/[id]/request" options={{ title: 'Request Service' }} />
      <Stack.Screen name="bookings/index" options={{ title: 'My Bookings' }} />
      <Stack.Screen name="bookings/[id]" options={{ title: 'Booking Detail' }} />
      <Stack.Screen name="bookings/[id]/pay" options={{ title: 'Pay' }} />
      <Stack.Screen name="messages/index" options={{ title: 'Messages' }} />
      <Stack.Screen name="messages/[id]" options={{ title: 'Conversation' }} />
      <Stack.Screen name="payment-methods" options={{ title: 'Payment Methods' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="profile/edit" options={{ title: 'Edit Profile' }} />
    </Stack>
  );
}
