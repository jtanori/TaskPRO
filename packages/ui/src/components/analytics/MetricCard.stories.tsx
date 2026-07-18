import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Analytics/MetricCard',
  component: MetricCard,
};

export default meta;

type Story = StoryObj<typeof MetricCard>;

export const Positive: Story = {
  args: {
    metric: {
      name: 'Reservas completadas',
      value: 128,
      unit: 'este mes',
      change: 12,
      period: 'month',
    },
  },
};

export const Negative: Story = {
  args: {
    metric: {
      name: 'Tasa de abandono',
      value: 4.2,
      unit: '%',
      change: -1.5,
      period: 'month',
    },
  },
};
