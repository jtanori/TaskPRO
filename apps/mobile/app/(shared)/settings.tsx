import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../src/features/auth';

export default function SettingsScreen() {
  const { t } = useTranslation('common');
  const { signOut, session } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{t('settings')}</Typography>
        <Typography variant="bodyM" color="textSecondary">
          {session?.user.email}
        </Typography>
        <Typography variant="bodyM" color="textSecondary">
          {session?.user.role}
        </Typography>
      </Card>

      <Button title={t('signOut')} onPress={() => void signOut()} />
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
});
