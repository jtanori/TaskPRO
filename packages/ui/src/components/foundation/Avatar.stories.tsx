import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Foundation/Avatar',
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    initials: 'JD',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="small" />
      <Avatar initials="MD" size="medium" />
      <Avatar initials="LG" size="large" />
      <Avatar initials="XL" size="xl" />
    </View>
  ),
};
