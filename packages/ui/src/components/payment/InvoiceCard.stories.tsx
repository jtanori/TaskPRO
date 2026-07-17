import type { Meta, StoryObj } from '@storybook/react';
import { InvoiceCard } from './InvoiceCard';

const meta: Meta<typeof InvoiceCard> = {
  title: 'Payment/InvoiceCard',
  component: InvoiceCard,
};

export default meta;

type Story = StoryObj<typeof InvoiceCard>;

export const Default: Story = {};
