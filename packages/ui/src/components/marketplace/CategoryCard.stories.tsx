import type { Meta, StoryObj } from '@storybook/react';
import { CategoryCard } from './CategoryCard';

const meta: Meta<typeof CategoryCard> = {
  title: 'Marketplace/CategoryCard',
  component: CategoryCard,
};

export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {};
