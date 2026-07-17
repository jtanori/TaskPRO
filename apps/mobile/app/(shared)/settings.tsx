import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../src/hooks/useAuth';

export default function SettingsScreen() {
  const { signOut, session } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL" style={styles.title}>
          Settings
        </Typography>
        <Typography variant="bodyM" color="textSecondary">
          Signed in as {session?.userId}
        </Typography>
        <Typography variant="bodyM" color="textSecondary">
          Role: {session?.role}
        </Typography>
      </Card>

      <Button title="Sign Out" onPress={() => void signOut()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
  },
  card: {
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
  },
  title: {
    marginBottom: tokens.spacing.sm,
  },
});
