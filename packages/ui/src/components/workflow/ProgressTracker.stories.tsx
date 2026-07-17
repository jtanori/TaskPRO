import type { Meta, StoryObj } from '@storybook/react';
import { ProgressTracker } from './ProgressTracker';

const meta: Meta<typeof ProgressTracker> = {
  title: 'Workflow/ProgressTracker',
  component: ProgressTracker,
};

export default meta;

type Story = StoryObj<typeof ProgressTracker>;

export const Default: Story = {};
