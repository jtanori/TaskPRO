import type { Meta, StoryObj } from '@storybook/react';
import { EarningsSummary } from './EarningsSummary';

const meta: Meta<typeof EarningsSummary> = {
  title: 'Professional/EarningsSummary',
  component: EarningsSummary,
};

export default meta;

type Story = StoryObj<typeof EarningsSummary>;

export const Default: Story = {};
