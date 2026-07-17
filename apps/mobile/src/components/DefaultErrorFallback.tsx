import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';

export interface DefaultErrorFallbackProps {
  error?: Error;
  reset: () => void;
}

export function DefaultErrorFallback({ error, reset }: DefaultErrorFallbackProps) {
  const { t } = useTranslation('common');

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{t('error')}</Typography>
        <Typography variant="bodyM" color="textSecondary" style={styles.message}>
          {error?.message ?? t('error')}
        </Typography>
        <Button title={t('retry')} onPress={reset} />
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
    marginVertical: tokens.spacing.sm,
  },
});
