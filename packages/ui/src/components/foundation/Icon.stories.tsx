import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Foundation/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'search',
    size: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Icon name="A" size="tiny" />
      <Icon name="A" size="small" />
      <Icon name="A" size="medium" />
      <Icon name="A" size="default" />
      <Icon name="A" size="large" />
      <Icon name="A" size="xl" />
    </View>
  ),
};
