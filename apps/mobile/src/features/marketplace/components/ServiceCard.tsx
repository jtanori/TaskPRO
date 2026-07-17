import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import type { ServiceDto } from '@taskpro/types';

export interface ServiceCardProps {
  service: ServiceDto;
  onPress: (service: ServiceDto) => void;
}

function formatMinor(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <Pressable onPress={() => onPress(service)} accessibilityRole="button">
      <Card style={styles.card}>
        <Typography variant="headingS">{service.name}</Typography>
        <Typography variant="bodyS" color="textSecondary" numberOfLines={2}>
          {service.description}
        </Typography>
        <View style={styles.footer}>
          <Typography variant="bodyM" color="primary">
            {formatMinor(service.basePrice.amountMinor, service.basePrice.currency)}
          </Typography>
          <Typography variant="bodyS" color="textSecondary">
            {service.estimatedDurationMinutes} min
          </Typography>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: tokens.spacing.xs,
    marginBottom: tokens.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: tokens.spacing.sm,
  },
});
