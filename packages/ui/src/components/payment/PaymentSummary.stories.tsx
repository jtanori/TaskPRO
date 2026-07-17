import { Currency } from '@taskpro/types';
import type { Meta, StoryObj } from '@storybook/react';
import { PaymentSummary } from './PaymentSummary';

const meta: Meta<typeof PaymentSummary> = {
  title: 'Payment/PaymentSummary',
  component: PaymentSummary,
};

export default meta;

type Story = StoryObj<typeof PaymentSummary>;

export const Default: Story = {
  args: {
    subtotal: { amountMinor: 10000, currency: Currency.MXN },
    platformFee: { amountMinor: 1500, currency: Currency.MXN },
    total: { amountMinor: 11500, currency: Currency.MXN },
  },
};
