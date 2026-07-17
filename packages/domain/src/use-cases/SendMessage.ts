import {
  createMessageId,
  DomainErrorCode,
  type ConversationId,
  type MessageType,
  type UserId,
} from '@taskpro/types';
import { DomainError } from '../errors';
import type { ConversationRepository } from '../repositories/ConversationRepository';

export interface SendMessageInput {
  conversationId: ConversationId;
  senderId: UserId;
  type: MessageType;
  content: string;
}

export class SendMessage {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async execute(input: SendMessageInput) {
    const conversation = await this.conversationRepository.findById(input.conversationId);
    if (!conversation) {
      throw new DomainError(DomainErrorCode.NotFound, 'Conversation not found');
    }

    if (!conversation.participantIds.includes(input.senderId)) {
      throw new DomainError(
        DomainErrorCode.Unauthorized,
        'Sender is not a participant of this conversation'
      );
    }

    const message = {
      id: createMessageId(`msg_${Date.now()}`),
      senderId: input.senderId,
      type: input.type,
      content: input.content,
      sentAt: new Date(),
    };

    conversation.sendMessage(message);
    await this.conversationRepository.save(conversation);
    return conversation;
  }
}
