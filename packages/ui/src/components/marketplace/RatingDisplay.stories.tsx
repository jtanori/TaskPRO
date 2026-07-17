import type { Meta, StoryObj } from '@storybook/react';
import { RatingDisplay } from './RatingDisplay';

const meta: Meta<typeof RatingDisplay> = {
  title: 'Marketplace/RatingDisplay',
  component: RatingDisplay,
};

export default meta;

type Story = StoryObj<typeof RatingDisplay>;

export const Default: Story = {};
