import { createMessageId, createUserId, MessageType } from '@taskpro/types';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  title: 'Communication/ChatBubble',
  component: ChatBubble,
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

const sampleMessage = {
  id: createMessageId('msg-1'),
  senderId: createUserId('sender-1'),
  type: MessageType.Text,
  content: 'Hola, ¿en qué puedo ayudarte?',
  sentAt: new Date().toISOString(),
};

export const Incoming: Story = {
  args: {
    message: sampleMessage,
    isCurrentUser: false,
    showSenderInitials: 'T',
  },
};

export const Outgoing: Story = {
  args: {
    message: { ...sampleMessage, senderId: createUserId('me') },
    isCurrentUser: true,
  },
};

export const System: Story = {
  args: {
    message: { ...sampleMessage, type: MessageType.SystemEvent, content: 'Reserva confirmada' },
    isCurrentUser: false,
  },
};
