import { describe, expect, it } from 'vitest';
import {
  createConversationId,
  createMessageId,
  createNotificationId,
  createUserId,
  MessageType,
  NotificationChannel,
  NotificationStatus,
} from '@taskpro/types';
import { Conversation } from '../../aggregates/Conversation';
import { Notification } from '../../aggregates/Notification';
import { InMemoryConversationRepository } from '../../repositories/InMemoryConversationRepository';
import { InMemoryNotificationRepository } from '../../repositories/InMemoryNotificationRepository';
import {
  CreateNotification,
  GetConversation,
  ListConversations,
  ListNotifications,
  MarkConversationRead,
  MarkNotificationRead,
  SendMessage,
} from '../../use-cases';

function createConversationRepository(): InMemoryConversationRepository {
  return new InMemoryConversationRepository();
}

function createNotificationRepository(): InMemoryNotificationRepository {
  return new InMemoryNotificationRepository();
}

describe('Communication layer', () => {
  it('lists conversations for a participant', async () => {
    const repository = createConversationRepository();
    const userA = createUserId('user-a');
    const userB = createUserId('user-b');
    const conversation = Conversation.create({
      id: createConversationId('conv-1'),
      participantIds: [userA, userB],
    });
    await repository.save(conversation);

    const result = await new ListConversations(repository).execute(userA);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(conversation.id);
  });

  it('sends a message and emits a domain event', async () => {
    const repository = createConversationRepository();
    const userA = createUserId('user-a');
    const userB = createUserId('user-b');
    const conversation = Conversation.create({
      id: createConversationId('conv-1'),
      participantIds: [userA, userB],
    });
    await repository.save(conversation);

    await new SendMessage(repository).execute({
      conversationId: conversation.id,
      senderId: userA,
      type: MessageType.Text,
      content: 'Hello',
    });

    const updated = await repository.findById(conversation.id);
    expect(updated?.messages).toHaveLength(1);
    expect(updated?.messages[0].content).toBe('Hello');
  });

  it('rejects messages from non-participants', async () => {
    const repository = createConversationRepository();
    const userA = createUserId('user-a');
    const intruder = createUserId('intruder');
    const conversation = Conversation.create({
      id: createConversationId('conv-1'),
      participantIds: [userA],
    });
    await repository.save(conversation);

    await expect(
      new SendMessage(repository).execute({
        conversationId: conversation.id,
        senderId: intruder,
        type: MessageType.Text,
        content: 'Hello',
      })
    ).rejects.toThrow();
  });

  it('tracks unread counts per participant', async () => {
    const repository = createConversationRepository();
    const userA = createUserId('user-a');
    const userB = createUserId('user-b');
    const conversation = Conversation.create({
      id: createConversationId('conv-1'),
      participantIds: [userA, userB],
    });
    conversation.sendMessage({
      id: createMessageId('msg-1'),
      senderId: userA,
      type: MessageType.Text,
      content: 'Hello',
      sentAt: new Date(),
    });
    await repository.save(conversation);

    expect(conversation.unreadCountFor(userB)).toBe(1);
    expect(conversation.unreadCountFor(userA)).toBe(0);

    await new MarkConversationRead(repository).execute(conversation.id, userB);
    expect(conversation.unreadCountFor(userB)).toBe(0);
  });

  it('creates and lists notifications', async () => {
    const repository = createNotificationRepository();
    const userId = createUserId('user-a');

    await new CreateNotification(repository).execute({
      userId,
      title: 'Welcome',
      body: 'Hello',
      channel: NotificationChannel.Push,
    });

    const notifications = await new ListNotifications(repository).execute(userId);
    expect(notifications).toHaveLength(1);
    expect(notifications[0].status).toBe(NotificationStatus.Pending);
  });

  it('marks a notification as read', async () => {
    const repository = createNotificationRepository();
    const userId = createUserId('user-a');
    const notification = Notification.create({
      id: createNotificationId('notif-1'),
      userId,
      title: 'Welcome',
      body: 'Hello',
      channel: NotificationChannel.Push,
    });
    await repository.save(notification);

    await new MarkNotificationRead(repository).execute(notification.id, userId);
    expect(notification.status).toBe(NotificationStatus.Read);
  });

  it('retrieves a conversation only for participants', async () => {
    const repository = createConversationRepository();
    const userA = createUserId('user-a');
    const userB = createUserId('user-b');
    const conversation = Conversation.create({
      id: createConversationId('conv-1'),
      participantIds: [userA],
    });
    await repository.save(conversation);

    const result = await new GetConversation(repository).execute(conversation.id, userA);
    expect(result.id).toBe(conversation.id);

    await expect(new GetConversation(repository).execute(conversation.id, userB)).rejects.toThrow();
  });
});
