import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeSelector } from './DateTimeSelector';

const meta: Meta<typeof DateTimeSelector> = {
  title: 'Form/DateTimeSelector',
  component: DateTimeSelector,
};

export default meta;

type Story = StoryObj<typeof DateTimeSelector>;

export const Default: Story = {};
