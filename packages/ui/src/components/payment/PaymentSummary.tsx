import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { MoneyDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface PaymentSummaryProps {
  subtotal: MoneyDto;
  platformFee: MoneyDto;
  total: MoneyDto;
}

function formatMoney(money: MoneyDto): string {
  const major = (money.amountMinor / 100).toFixed(2);
  return `$${major} ${money.currency}`;
}

export function PaymentSummary({ subtotal, platformFee, total }: PaymentSummaryProps) {
  return (
    <Card style={styles.container}>
      <View style={styles.row}>
        <Typography variant="bodyM" color="textSecondary">
          Subtotal
        </Typography>
        <Typography variant="bodyM">{formatMoney(subtotal)}</Typography>
      </View>
      <View style={styles.row}>
        <Typography variant="bodyM" color="textSecondary">
          Tarifa de plataforma
        </Typography>
        <Typography variant="bodyM">{formatMoney(platformFee)}</Typography>
      </View>
      <View style={[styles.row, styles.totalRow]}>
        <Typography variant="headingS">Total</Typography>
        <Typography variant="headingS">{formatMoney(total)}</Typography>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalRow: {
    borderTopColor: tokens.color.neutral.gray200,
    borderTopWidth: tokens.borderWidth.hairline,
    paddingTop: tokens.spacing.sm,
  },
});
