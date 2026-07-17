import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Foundation/Typography',
  component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: 'bodyM',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export const Scale: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Typography variant="displayM">Display M</Typography>
      <Typography variant="headingL">Heading L</Typography>
      <Typography variant="headingM">Heading M</Typography>
      <Typography variant="bodyL">Body L</Typography>
      <Typography variant="bodyM">Body M</Typography>
      <Typography variant="caption">Caption</Typography>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Typography color="text">Primary text</Typography>
      <Typography color="textSecondary">Secondary text</Typography>
      <Typography color="primary">Primary color</Typography>
      <Typography color="danger">Danger color</Typography>
    </View>
  ),
};
