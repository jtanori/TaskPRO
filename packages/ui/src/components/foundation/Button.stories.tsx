import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Foundation/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button title="Primary" variant="primary" />
      <Button title="Secondary" variant="secondary" />
      <Button title="Ghost" variant="ghost" />
      <Button title="Destructive" variant="destructive" />
    </View>
  ),
};

export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button title="Default" />
      <Button title="Disabled" disabled />
      <Button title="Loading" loading />
    </View>
  ),
};
