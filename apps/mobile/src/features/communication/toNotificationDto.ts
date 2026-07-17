import type { Notification } from '@taskpro/domain';
import type { NotificationDto } from '@taskpro/types';

export function toNotificationDto(notification: Notification): NotificationDto {
  return {
    id: notification.id,
    userId: notification.userId,
    title: notification.title,
    body: notification.body,
    channel: notification.channel,
    status: notification.status,
    createdAt: notification.createdAt.toISOString(),
  };
}
