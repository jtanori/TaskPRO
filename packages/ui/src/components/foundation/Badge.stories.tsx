import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Foundation/Badge',
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Badge',
  },
};

export const Statuses: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Badge label="Default" />
      <Badge label="Success" status="success" />
      <Badge label="Warning" status="warning" />
      <Badge label="Error" status="error" />
      <Badge label="Info" status="info" />
    </View>
  ),
};
