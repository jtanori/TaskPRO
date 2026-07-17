import type { UserId } from '@taskpro/types';
import type { NotificationRepository } from '../repositories/NotificationRepository';

export class ListNotifications {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(userId: UserId) {
    return this.notificationRepository.findByUserId(userId);
  }
}
