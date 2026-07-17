import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';

export default function NotFoundScreen() {
  const { t } = useTranslation('common');

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{t('error')}</Typography>
        <Typography variant="bodyM" color="textSecondary" style={styles.message}>
          This screen does not exist.
        </Typography>
        <Link href="/login" asChild>
          <Button title={t('signIn')} />
        </Link>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: tokens.spacing.lg,
  },
  card: {
    gap: tokens.spacing.md,
  },
  message: {
    marginBottom: tokens.spacing.md,
  },
});
