import type { NotificationDto, UserId } from '@taskpro/types';

export interface NotificationService {
  listNotifications(userId: UserId): Promise<NotificationDto[]>;
  markAsRead(notificationId: string, userId: UserId): Promise<void>;
  notify(userId: UserId, title: string, body: string): Promise<void>;
}
