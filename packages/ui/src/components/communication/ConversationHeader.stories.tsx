import type { Meta, StoryObj } from '@storybook/react';
import { ConversationHeader } from './ConversationHeader';

const meta: Meta<typeof ConversationHeader> = {
  title: 'Communication/ConversationHeader',
  component: ConversationHeader,
};

export default meta;

type Story = StoryObj<typeof ConversationHeader>;

export const Default: Story = {
  args: {
    title: 'Técnico TaskPRO',
    subtitle: 'En línea',
    avatarInitials: 'TP',
  },
};
