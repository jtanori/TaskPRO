import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityCalendar } from './AvailabilityCalendar';

const meta: Meta<typeof AvailabilityCalendar> = {
  title: 'Professional/AvailabilityCalendar',
  component: AvailabilityCalendar,
};

export default meta;

type Story = StoryObj<typeof AvailabilityCalendar>;

export const Default: Story = {};
