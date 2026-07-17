import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Card, PaymentMethodCard, PaymentSummary, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useCheckout } from '../usePayment';

export default function CheckoutScreen() {
  const { t } = useTranslation('payment');
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { invoice, isLoading, error, pay } = useCheckout(id);

  if (isLoading || !invoice) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  const platformFee = {
    amountMinor: Math.round(invoice.total.amountMinor * 0.15),
    currency: invoice.total.currency,
  };
  const total = {
    amountMinor: invoice.total.amountMinor + platformFee.amountMinor,
    currency: invoice.total.currency,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('checkoutTitle')}</Typography>

      <Card style={styles.card}>
        <Typography variant="headingS">{t('paymentMethod')}</Typography>
        <PaymentMethodCard
          method={{
            id: 'pm_fake_visa',
            brand: 'Visa',
            last4: '4242',
            expiryMonth: 12,
            expiryYear: 2028,
          }}
          selected
        />
      </Card>

      <PaymentSummary subtotal={invoice.subtotal} platformFee={platformFee} total={total} />

      {error ? (
        <Typography variant="bodyS" color="danger">
          {error.message}
        </Typography>
      ) : null}

      <Button
        title={t('payButton')}
        loading={isLoading}
        onPress={async () => {
          await pay();
          router.replace(`/bookings/${id}`);
        }}
      />
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
    gap: tokens.spacing.sm,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
