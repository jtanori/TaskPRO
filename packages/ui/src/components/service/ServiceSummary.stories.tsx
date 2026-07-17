import type { Meta, StoryObj } from '@storybook/react';
import { ServiceSummary } from './ServiceSummary';

const meta: Meta<typeof ServiceSummary> = {
  title: 'Service/ServiceSummary',
  component: ServiceSummary,
};

export default meta;

type Story = StoryObj<typeof ServiceSummary>;

export const Default: Story = {};
