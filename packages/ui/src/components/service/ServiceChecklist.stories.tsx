import type { Meta, StoryObj } from '@storybook/react';
import { ServiceChecklist } from './ServiceChecklist';

const meta: Meta<typeof ServiceChecklist> = {
  title: 'Service/ServiceChecklist',
  component: ServiceChecklist,
};

export default meta;

type Story = StoryObj<typeof ServiceChecklist>;

export const Default: Story = {};
