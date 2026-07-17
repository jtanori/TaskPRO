import type { Meta, StoryObj } from '@storybook/react';
import { PaymentMethodCard } from './PaymentMethodCard';

const meta: Meta<typeof PaymentMethodCard> = {
  title: 'Payment/PaymentMethodCard',
  component: PaymentMethodCard,
};

export default meta;

type Story = StoryObj<typeof PaymentMethodCard>;

const sampleMethod = {
  id: 'pm_1',
  brand: 'Visa',
  last4: '4242',
  expiryMonth: 12,
  expiryYear: 2028,
};

export const Default: Story = {
  args: {
    method: sampleMethod,
  },
};

export const Selected: Story = {
  args: {
    method: sampleMethod,
    selected: true,
  },
};
