import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';

export default function RegisterScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL" style={styles.title}>
          Create Account
        </Typography>
        <Typography variant="bodyM" color="textSecondary" style={styles.subtitle}>
          Registration flow will be implemented in a later expedition.
        </Typography>
        <Link href="/login" asChild>
          <Button title="Back to Sign In" variant="secondary" />
        </Link>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: tokens.spacing.lg,
  },
  card: {
    gap: tokens.spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: tokens.spacing.md,
  },
});
