import type { Meta, StoryObj } from '@storybook/react';
import { ServiceStatusTimeline } from './ServiceStatusTimeline';

const meta: Meta<typeof ServiceStatusTimeline> = {
  title: 'Service/ServiceStatusTimeline',
  component: ServiceStatusTimeline,
};

export default meta;

type Story = StoryObj<typeof ServiceStatusTimeline>;

export const Default: Story = {};
