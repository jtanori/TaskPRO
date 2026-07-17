import type { ConversationDto, MessageDto, UserId } from '@taskpro/types';

export interface ConversationService {
  listConversations(userId: UserId): Promise<ConversationDto[]>;
  getConversation(id: string, userId: UserId): Promise<ConversationDto | null>;
  sendMessage(
    conversationId: string,
    senderId: UserId,
    content: string
  ): Promise<MessageDto | null>;
  markAsRead(conversationId: string, userId: UserId): Promise<void>;
}
