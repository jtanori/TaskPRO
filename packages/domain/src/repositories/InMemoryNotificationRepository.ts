import type { NotificationId, UserId } from '@taskpro/types';
import { Notification, type NotificationProps } from '../aggregates/Notification';
import type { NotificationRepository } from './NotificationRepository';

export class InMemoryNotificationRepository implements NotificationRepository {
  private notifications = new Map<string, Notification>();

  async findById(id: NotificationId): Promise<Notification | null> {
    return this.notifications.get(id) ?? null;
  }

  async findByUserId(userId: UserId): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async save(notification: Notification): Promise<void> {
    this.notifications.set(notification.id, notification);
    notification.commitEvents();
  }

  reconstitute(props: NotificationProps): Notification {
    return Notification.reconstitute(props);
  }

  clear(): void {
    this.notifications.clear();
  }
}
