import { Currency } from '@taskpro/types';
import type { Meta, StoryObj } from '@storybook/react';
import { InvoiceCard } from './InvoiceCard';

const meta: Meta<typeof InvoiceCard> = {
  title: 'Payment/InvoiceCard',
  component: InvoiceCard,
};

export default meta;

type Story = StoryObj<typeof InvoiceCard>;

export const Default: Story = {
  args: {
    invoice: {
      id: 'inv_1' as import('@taskpro/types').InvoiceDto['id'],
      bookingId: 'booking-1' as import('@taskpro/types').InvoiceDto['bookingId'],
      items: [
        {
          description: 'Limpieza doméstica',
          quantity: 1,
          unitPrice: { amountMinor: 10000, currency: Currency.MXN },
          total: { amountMinor: 10000, currency: Currency.MXN },
        },
      ],
      subtotal: { amountMinor: 10000, currency: Currency.MXN },
      tax: { amountMinor: 0, currency: Currency.MXN },
      total: { amountMinor: 10000, currency: Currency.MXN },
      issuedAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
    },
  },
};
