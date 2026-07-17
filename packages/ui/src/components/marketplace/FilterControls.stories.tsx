import type { Meta, StoryObj } from '@storybook/react';
import { FilterControls } from './FilterControls';

const meta: Meta<typeof FilterControls> = {
  title: 'Marketplace/FilterControls',
  component: FilterControls,
};

export default meta;

type Story = StoryObj<typeof FilterControls>;

export const Default: Story = {};
