import {
  Conversation,
  InMemoryConversationRepository,
  ListConversations,
  GetConversation,
  SendMessage,
  MarkConversationRead,
} from '@taskpro/domain';
import {
  createConversationId,
  createMessageId,
  createUserId,
  MessageType,
  type ConversationDto,
  type MessageDto,
  type UserId,
} from '@taskpro/types';
import type { ConversationService } from './ConversationService';
import { toConversationDto } from './toConversationDto';

export class FakeConversationService implements ConversationService {
  private repository = new InMemoryConversationRepository();
  private listConversationsUseCase = new ListConversations(this.repository);
  private getConversationUseCase = new GetConversation(this.repository);
  private sendMessageUseCase = new SendMessage(this.repository);
  private markConversationReadUseCase = new MarkConversationRead(this.repository);

  async listConversations(userId: UserId): Promise<ConversationDto[]> {
    await this.ensureDemoConversation(userId);
    const conversations = await this.listConversationsUseCase.execute(userId);
    return conversations.map((conversation) => toConversationDto(conversation, userId));
  }

  async getConversation(id: string, userId: UserId): Promise<ConversationDto | null> {
    try {
      const conversation = await this.getConversationUseCase.execute(
        id as ConversationDto['id'],
        userId
      );
      return toConversationDto(conversation, userId);
    } catch {
      return null;
    }
  }

  async sendMessage(
    conversationId: string,
    senderId: UserId,
    content: string
  ): Promise<MessageDto | null> {
    const conversation = await this.sendMessageUseCase.execute({
      conversationId: conversationId as ConversationDto['id'],
      senderId,
      type: MessageType.Text,
      content,
    });
    const sent = conversation.messages[conversation.messages.length - 1];
    return {
      id: sent.id,
      senderId: sent.senderId,
      type: sent.type,
      content: sent.content,
      sentAt: sent.sentAt.toISOString(),
    };
  }

  async markAsRead(conversationId: string, userId: UserId): Promise<void> {
    await this.markConversationReadUseCase.execute(conversationId as ConversationDto['id'], userId);
  }

  private async ensureDemoConversation(userId: UserId): Promise<void> {
    const existing = await this.repository.findByParticipantId(userId);
    if (existing.length > 0) return;

    const otherUserId = createUserId('taskpro-demo');
    const conversation = Conversation.create({
      id: createConversationId(`conv_${Date.now()}`),
      participantIds: [userId, otherUserId],
    });

    conversation.sendMessage({
      id: createMessageId(`msg_${Date.now()}`),
      senderId: otherUserId,
      type: MessageType.Text,
      content: 'Hola, ¿en qué puedo ayudarte con tu reserva?',
      sentAt: new Date(),
    });

    await this.repository.save(conversation);
  }
}
export const conversationService = new FakeConversationService();
