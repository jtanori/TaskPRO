import { createNotificationId, type NotificationChannel, type UserId } from '@taskpro/types';
import { Notification } from '../aggregates/Notification';
import type { NotificationRepository } from '../repositories/NotificationRepository';

export interface CreateNotificationInput {
  userId: UserId;
  title: string;
  body: string;
  channel: NotificationChannel;
  metadata?: Record<string, unknown>;
}

export class CreateNotification {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(input: CreateNotificationInput) {
    const notification = Notification.create({
      id: createNotificationId(`notif_${Date.now()}`),
      userId: input.userId,
      title: input.title,
      body: input.body,
      channel: input.channel,
      metadata: input.metadata,
    });

    await this.notificationRepository.save(notification);
    return notification;
  }
}
