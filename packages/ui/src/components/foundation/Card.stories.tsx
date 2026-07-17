import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Foundation/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Text>Card content</Text>
    </Card>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Card>
      <Text>This card demonstrates padding, radius, and shadow tokens.</Text>
    </Card>
  ),
};
