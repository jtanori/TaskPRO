import type { NotificationChannel } from '@taskpro/types';

export class NotificationDelivered {
  readonly eventType = 'notifications.notification.delivered' as const;

  constructor(
    public readonly notificationId: string,
    public readonly channel: NotificationChannel
  ) {}
}
