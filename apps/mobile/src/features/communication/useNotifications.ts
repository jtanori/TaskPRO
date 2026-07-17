import { useCallback, useEffect, useState } from 'react';
import type { NotificationDto, UserId } from '@taskpro/types';
import { notificationService } from './FakeNotificationService';

interface UseNotificationsResult {
  notifications: NotificationDto[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
}

export function useNotifications(userId: UserId | undefined): UseNotificationsResult {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await notificationService.listNotifications(userId);
      setNotifications(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load notifications'));
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!userId) return;
      await notificationService.markAsRead(notificationId, userId);
      await refresh();
    },
    [userId, refresh]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const unreadCount = notifications.filter(
    (notification) => notification.status === 'pending' || notification.status === 'delivered'
  ).length;

  return { notifications, unreadCount, isLoading, error, refresh, markAsRead };
}
