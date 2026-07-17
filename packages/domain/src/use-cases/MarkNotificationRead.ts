import { DomainErrorCode, type NotificationId, type UserId } from '@taskpro/types';
import { DomainError } from '../errors';
import type { NotificationRepository } from '../repositories/NotificationRepository';

export class MarkNotificationRead {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(notificationId: NotificationId, userId: UserId) {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new DomainError(DomainErrorCode.NotFound, 'Notification not found');
    }

    if (notification.userId !== userId) {
      throw new DomainError(
        DomainErrorCode.Unauthorized,
        'Notification does not belong to this user'
      );
    }

    notification.markRead();
    await this.notificationRepository.save(notification);
    return notification;
  }
}
