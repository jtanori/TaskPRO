import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ServiceDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface ServiceCardProps {
  service: ServiceDto;
}

function formatMinor(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card style={styles.container}>
      <Typography variant="headingS" numberOfLines={1}>
        {service.name}
      </Typography>
      <Typography variant="bodyM" color="textSecondary" numberOfLines={2}>
        {service.description}
      </Typography>
      <View style={styles.row}>
        <Typography variant="bodyS" color="textSecondary">
          {service.estimatedDurationMinutes} min
        </Typography>
        <Typography variant="bodyM">
          {formatMinor(service.basePrice.amountMinor, service.basePrice.currency)}
        </Typography>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: tokens.spacing.xs,
  },
});
