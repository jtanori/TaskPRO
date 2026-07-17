import { DomainErrorCode, type ConversationId, type UserId } from '@taskpro/types';
import { DomainError } from '../errors';
import type { ConversationRepository } from '../repositories/ConversationRepository';

export class MarkConversationRead {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async execute(conversationId: ConversationId, participantId: UserId) {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new DomainError(DomainErrorCode.NotFound, 'Conversation not found');
    }

    if (!conversation.participantIds.includes(participantId)) {
      throw new DomainError(
        DomainErrorCode.Unauthorized,
        'User is not a participant of this conversation'
      );
    }

    conversation.markReadAsOf(participantId, new Date());
    await this.conversationRepository.save(conversation);
    return conversation;
  }
}
