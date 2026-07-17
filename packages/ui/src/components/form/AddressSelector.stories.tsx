import type { Meta, StoryObj } from '@storybook/react';
import { AddressSelector } from './AddressSelector';

const meta: Meta<typeof AddressSelector> = {
  title: 'Form/AddressSelector',
  component: AddressSelector,
};

export default meta;

type Story = StoryObj<typeof AddressSelector>;

export const Default: Story = {};
