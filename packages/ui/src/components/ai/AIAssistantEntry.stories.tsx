import type { Meta, StoryObj } from '@storybook/react';
import { AIAssistantEntry } from './AIAssistantEntry';

const meta: Meta<typeof AIAssistantEntry> = {
  title: 'Ai/AIAssistantEntry',
  component: AIAssistantEntry,
};

export default meta;

type Story = StoryObj<typeof AIAssistantEntry>;

export const Default: Story = {};
