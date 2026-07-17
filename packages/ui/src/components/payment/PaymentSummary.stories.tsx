import type { Meta, StoryObj } from '@storybook/react';
import { PaymentSummary } from './PaymentSummary';

const meta: Meta<typeof PaymentSummary> = {
  title: 'Payment/PaymentSummary',
  component: PaymentSummary,
};

export default meta;

type Story = StoryObj<typeof PaymentSummary>;

export const Default: Story = {};
