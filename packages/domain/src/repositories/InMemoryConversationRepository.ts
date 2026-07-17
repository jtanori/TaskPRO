import type { ConversationId, UserId } from '@taskpro/types';
import { Conversation, type ConversationProps } from '../aggregates/Conversation';
import type { ConversationRepository } from './ConversationRepository';

export class InMemoryConversationRepository implements ConversationRepository {
  private conversations = new Map<string, Conversation>();

  async findById(id: ConversationId): Promise<Conversation | null> {
    return this.conversations.get(id) ?? null;
  }

  async findByParticipantId(participantId: UserId): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).filter((conversation) =>
      conversation.participantIds.includes(participantId)
    );
  }

  async save(conversation: Conversation): Promise<void> {
    this.conversations.set(conversation.id, conversation);
    conversation.commitEvents();
  }

  reconstitute(props: ConversationProps): Conversation {
    return Conversation.reconstitute(props);
  }

  clear(): void {
    this.conversations.clear();
  }
}
