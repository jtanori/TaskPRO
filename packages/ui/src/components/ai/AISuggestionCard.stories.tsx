import type { Meta, StoryObj } from '@storybook/react';
import { AISuggestionCard } from './AISuggestionCard';

const meta: Meta<typeof AISuggestionCard> = {
  title: 'Ai/AISuggestionCard',
  component: AISuggestionCard,
};

export default meta;

type Story = StoryObj<typeof AISuggestionCard>;

export const Default: Story = {};
