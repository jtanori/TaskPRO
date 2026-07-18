import type { Meta, StoryObj } from '@storybook/react';
import { AnalyticsChart } from './AnalyticsChart';

const meta: Meta<typeof AnalyticsChart> = {
  title: 'Analytics/AnalyticsChart',
  component: AnalyticsChart,
};

export default meta;

type Story = StoryObj<typeof AnalyticsChart>;

export const Default: Story = {
  args: {
    title: 'Actividad semanal',
  },
};
