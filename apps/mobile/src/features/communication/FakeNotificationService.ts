import {
  CreateNotification,
  InMemoryNotificationRepository,
  ListNotifications,
  MarkNotificationRead,
} from '@taskpro/domain';
import { NotificationChannel, type NotificationDto, type UserId } from '@taskpro/types';
import type { NotificationService } from './NotificationService';
import { toNotificationDto } from './toNotificationDto';

export class FakeNotificationService implements NotificationService {
  private repository = new InMemoryNotificationRepository();
  private createNotificationUseCase = new CreateNotification(this.repository);
  private listNotificationsUseCase = new ListNotifications(this.repository);
  private markNotificationReadUseCase = new MarkNotificationRead(this.repository);

  async listNotifications(userId: UserId): Promise<NotificationDto[]> {
    await this.ensureDemoNotification(userId);
    const notifications = await this.listNotificationsUseCase.execute(userId);
    return notifications.map(toNotificationDto);
  }

  async markAsRead(notificationId: string, userId: UserId): Promise<void> {
    await this.markNotificationReadUseCase.execute(notificationId as NotificationDto['id'], userId);
  }

  async notify(userId: UserId, title: string, body: string): Promise<void> {
    await this.createNotificationUseCase.execute({
      userId,
      title,
      body,
      channel: NotificationChannel.Push,
    });
    console.log(`[FakeNotificationService] push to ${userId}: ${title} — ${body}`);
  }

  private async ensureDemoNotification(userId: UserId): Promise<void> {
    const existing = await this.repository.findByUserId(userId);
    if (existing.length > 0) return;

    await this.createNotificationUseCase.execute({
      userId,
      title: 'Bienvenido a TaskPRO',
      body: 'Aquí verás tus notificaciones importantes.',
      channel: NotificationChannel.InApp,
    });
  }
}
export const notificationService = new FakeNotificationService();
