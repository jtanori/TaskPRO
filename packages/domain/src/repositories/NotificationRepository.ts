import type { Notification, NotificationProps } from '../aggregates/Notification';
import type { NotificationId, UserId } from '@taskpro/types';

export interface NotificationRepository {
  findById(id: NotificationId): Promise<Notification | null>;
  findByUserId(userId: UserId): Promise<Notification[]>;
  save(notification: Notification): Promise<void>;
  reconstitute(props: NotificationProps): Notification;
}
