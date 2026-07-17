import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../src/hooks/useAuth';

export default function TechnicianHomeScreen() {
  const { signOut, session } = useAuth();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL" style={styles.title}>
          Technician Home
        </Typography>
        <Typography variant="bodyM" color="textSecondary">
          Role: {session?.role}
        </Typography>
      </Card>

      <View style={styles.actions}>
        <Button title="Settings" variant="secondary" onPress={() => router.push('/settings')} />
        <Button title="Sign Out" variant="ghost" onPress={() => void signOut()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
  },
  card: {
    marginBottom: tokens.spacing.lg,
  },
  title: {
    marginBottom: tokens.spacing.sm,
  },
  actions: {
    gap: tokens.spacing.md,
  },
});
