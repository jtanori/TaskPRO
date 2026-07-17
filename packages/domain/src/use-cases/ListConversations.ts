import type { UserId } from '@taskpro/types';
import type { ConversationRepository } from '../repositories/ConversationRepository';

export class ListConversations {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async execute(participantId: UserId) {
    const conversations = await this.conversationRepository.findByParticipantId(participantId);
    return conversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }
}
