import type { Conversation, ConversationProps } from '../aggregates/Conversation';
import type { ConversationId, UserId } from '@taskpro/types';

export interface ConversationRepository {
  findById(id: ConversationId): Promise<Conversation | null>;
  findByParticipantId(participantId: UserId): Promise<Conversation[]>;
  save(conversation: Conversation): Promise<void>;
  reconstitute(props: ConversationProps): Conversation;
}
