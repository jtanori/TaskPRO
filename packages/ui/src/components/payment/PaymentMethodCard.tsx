import React from 'react';
import { StyleSheet } from 'react-native';
import type { PaymentMethodDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface PaymentMethodCardProps {
  method: PaymentMethodDto;
  selected?: boolean;
}

export function PaymentMethodCard({ method, selected = false }: PaymentMethodCardProps) {
  return (
    <Card
      style={[
        styles.container,
        selected && {
          borderColor: tokens.color.semantic.border.focused,
          borderWidth: tokens.borderWidth.medium,
        },
      ]}
    >
      <Typography variant="headingS">{method.brand}</Typography>
      <Typography variant="bodyM" color="textSecondary">
        **** {method.last4}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Expira {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.xs,
  },
});
