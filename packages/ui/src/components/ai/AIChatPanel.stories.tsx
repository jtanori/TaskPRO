import type { Meta, StoryObj } from '@storybook/react';
import { AIChatPanel } from './AIChatPanel';

const meta: Meta<typeof AIChatPanel> = {
  title: 'Ai/AIChatPanel',
  component: AIChatPanel,
};

export default meta;

type Story = StoryObj<typeof AIChatPanel>;

export const Default: Story = {};
