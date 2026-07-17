import { Currency } from '@taskpro/types';
import type { Meta, StoryObj } from '@storybook/react';
import { ServiceCard } from './ServiceCard';

const meta: Meta<typeof ServiceCard> = {
  title: 'Service/ServiceCard',
  component: ServiceCard,
};

export default meta;

type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    service: {
      id: 'svc-1' as import('@taskpro/types').ServiceDto['id'],
      categoryId: 'cat-1',
      name: 'Limpieza doméstica',
      description: 'Limpieza general de hogar.',
      estimatedDurationMinutes: 180,
      basePrice: { amountMinor: 45000, currency: Currency.MXN },
      isActive: true,
    },
  },
};
