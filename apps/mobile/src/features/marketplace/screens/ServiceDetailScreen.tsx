import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { Button, Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useServiceDetail } from '../useServiceCatalog';

function formatMinor(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export default function ServiceDetailScreen() {
  const { t } = useTranslation(['marketplace', 'common']);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { detail, isLoading, error } = useServiceDetail(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  if (error || !detail) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="danger">
          {t('common:error')}
        </Typography>
      </View>
    );
  }

  const { service } = detail;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Typography variant="headingL">{service.name}</Typography>
        <Typography variant="bodyM" color="textSecondary">
          {service.description}
        </Typography>
        <View style={styles.row}>
          <Typography variant="bodyM" color="primary">
            {formatMinor(service.basePrice.amountMinor, service.basePrice.currency)}
          </Typography>
          <Typography variant="bodyS" color="textSecondary">
            {service.estimatedDurationMinutes} min
          </Typography>
        </View>
      </Card>

      <Button title={t('marketplace:requestService')} onPress={() => undefined} disabled />
      <Typography variant="micro" color="textSecondary">
        {t('marketplace:requestService')} — {t('common:continue')} en reservas
      </Typography>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: tokens.spacing.sm,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
