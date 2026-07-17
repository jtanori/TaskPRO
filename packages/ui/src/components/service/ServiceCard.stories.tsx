import type { Meta, StoryObj } from '@storybook/react';
import { ServiceCard } from './ServiceCard';

const meta: Meta<typeof ServiceCard> = {
  title: 'Service/ServiceCard',
  component: ServiceCard,
};

export default meta;

type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {};
