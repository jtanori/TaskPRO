import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { InvoiceDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface InvoiceCardProps {
  invoice: InvoiceDto;
}

function formatMoney(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Card style={styles.container}>
      <Typography variant="headingS">Factura</Typography>
      <Typography variant="caption" color="textSecondary">
        Emitida: {new Date(invoice.issuedAt).toLocaleDateString('es-MX')}
      </Typography>

      {invoice.items.map((item, index) => (
        <View key={index} style={styles.row}>
          <Typography variant="bodyM">
            {item.quantity}x {item.description}
          </Typography>
          <Typography variant="bodyM">
            {formatMoney(item.total.amountMinor, item.total.currency)}
          </Typography>
        </View>
      ))}

      <View style={[styles.row, styles.totalRow]}>
        <Typography variant="headingS">Total</Typography>
        <Typography variant="headingS">
          {formatMoney(invoice.total.amountMinor, invoice.total.currency)}
        </Typography>
      </View>

      {invoice.paidAt ? (
        <Typography variant="bodyS" color="success">
          Pagada el {new Date(invoice.paidAt).toLocaleDateString('es-MX')}
        </Typography>
      ) : (
        <Typography variant="bodyS" color="danger">
          Pendiente de pago
        </Typography>
      )}
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
