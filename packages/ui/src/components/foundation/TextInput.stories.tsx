import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Foundation/TextInput',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const WithLabel: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <TextInput label="Email" placeholder="user@example.com" />
    </View>
  ),
};

export const WithError: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <TextInput label="Email" placeholder="user@example.com" error />
    </View>
  ),
};
