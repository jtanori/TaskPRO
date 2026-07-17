import type { Meta, StoryObj } from '@storybook/react';
import { JobCard } from './JobCard';

const meta: Meta<typeof JobCard> = {
  title: 'Professional/JobCard',
  component: JobCard,
};

export default meta;

type Story = StoryObj<typeof JobCard>;

export const Default: Story = {};
