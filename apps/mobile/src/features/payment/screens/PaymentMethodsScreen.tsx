import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';

export default function PaymentMethodsScreen() {
  const { t } = useTranslation('payment');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('paymentMethodsTitle')}</Typography>
      <Card>
        <Typography variant="bodyM" color="textSecondary">
          {t('paymentMethodsPlaceholder')}
        </Typography>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
});
