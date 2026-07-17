import type { Conversation } from '@taskpro/domain';
import { MessageType, type ConversationDto, type MessageDto, type UserId } from '@taskpro/types';

export function toMessageDto(message: {
  id: string;
  senderId: UserId;
  type: MessageType;
  content: string;
  sentAt: Date;
}): MessageDto {
  return {
    id: message.id as MessageDto['id'],
    senderId: message.senderId,
    type: message.type,
    content: message.content,
    sentAt: message.sentAt.toISOString(),
  };
}

export function toConversationDto(conversation: Conversation, viewerId: UserId): ConversationDto {
  return {
    id: conversation.id,
    participantIds: [...conversation.participantIds],
    messages: conversation.messages.map((message) =>
      toMessageDto({
        id: message.id,
        senderId: message.senderId,
        type: message.type,
        content: message.content,
        sentAt: message.sentAt,
      })
    ),
    unreadCount: conversation.unreadCountFor(viewerId),
    createdAt: conversation.createdAt.toISOString(),
    updatedAt: conversation.updatedAt.toISOString(),
  };
}
