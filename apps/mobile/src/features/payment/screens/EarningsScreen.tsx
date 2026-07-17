import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { useEarnings } from '../usePayment';

function formatMinor(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export default function EarningsScreen() {
  const { t } = useTranslation('payment');
  const { session } = useAuth();
  const { payouts, isLoading } = useEarnings(session?.user.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('earningsTitle')}</Typography>

      {isLoading ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : payouts.length === 0 ? (
        <Card>
          <Typography variant="bodyM" color="textSecondary">
            {t('noEarnings')}
          </Typography>
        </Card>
      ) : (
        payouts.map((payout) => (
          <Card key={payout.id} style={styles.card}>
            <View style={styles.row}>
              <Typography variant="headingS">{t('payoutLabel')}</Typography>
              <Typography variant="headingS">
                {formatMinor(payout.amount.amountMinor, payout.amount.currency)}
              </Typography>
            </View>
            <Typography variant="bodyS" color="textSecondary">
              {t('payoutStatus')}: {payout.status}
            </Typography>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  card: {
    gap: tokens.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
