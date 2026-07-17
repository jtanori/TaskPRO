import { DomainErrorCode, type ConversationId, type UserId } from '@taskpro/types';
import { DomainError } from '../errors';
import type { ConversationRepository } from '../repositories/ConversationRepository';

export class GetConversation {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async execute(id: ConversationId, participantId: UserId) {
    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new DomainError(DomainErrorCode.NotFound, 'Conversation not found');
    }

    if (!conversation.participantIds.includes(participantId)) {
      throw new DomainError(
        DomainErrorCode.Unauthorized,
        'User is not a participant of this conversation'
      );
    }

    return conversation;
  }
}
