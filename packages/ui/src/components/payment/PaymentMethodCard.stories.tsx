import type { Meta, StoryObj } from '@storybook/react';
import { PaymentMethodCard } from './PaymentMethodCard';

const meta: Meta<typeof PaymentMethodCard> = {
  title: 'Payment/PaymentMethodCard',
  component: PaymentMethodCard,
};

export default meta;

type Story = StoryObj<typeof PaymentMethodCard>;

export const Default: Story = {};
