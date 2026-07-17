import { NotificationChannel, NotificationId, NotificationStatus, UserId } from '@taskpro/types';
import { NotificationDelivered } from '../events/notifications/NotificationDelivered';

export interface NotificationProps {
  id: NotificationId;
  userId: UserId;
  title: string;
  body: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  sentAt?: Date;
}

export class Notification {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: NotificationProps) {}

  static create(props: Omit<NotificationProps, 'status' | 'createdAt'>): Notification {
    return new Notification({
      ...props,
      status: NotificationStatus.Pending,
      createdAt: new Date(),
    });
  }

  static reconstitute(props: NotificationProps): Notification {
    return new Notification(props);
  }

  get id(): NotificationId {
    return this.props.id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get body(): string {
    return this.props.body;
  }

  get channel(): NotificationChannel {
    return this.props.channel;
  }

  get status(): NotificationStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  markDelivered(): void {
    this.props.status = NotificationStatus.Delivered;
    this.props.sentAt = new Date();
    this.record(new NotificationDelivered(this.props.id, this.props.channel));
  }

  markRead(): void {
    this.props.status = NotificationStatus.Read;
  }

  private record(event: unknown): void {
    this.uncommittedEvents.push(event);
  }

  getUncommittedEvents(): readonly unknown[] {
    return this.uncommittedEvents;
  }

  commitEvents(): void {
    this.uncommittedEvents = [];
  }
}
