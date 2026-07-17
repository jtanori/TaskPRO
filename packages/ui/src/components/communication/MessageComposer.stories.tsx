import type { Meta, StoryObj } from '@storybook/react';
import { MessageComposer } from './MessageComposer';

const meta: Meta<typeof MessageComposer> = {
  title: 'Communication/MessageComposer',
  component: MessageComposer,
};

export default meta;

type Story = StoryObj<typeof MessageComposer>;

export const Default: Story = {};
