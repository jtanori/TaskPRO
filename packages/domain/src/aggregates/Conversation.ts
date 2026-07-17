import { ConversationId, MessageId, MessageType, UserId } from '@taskpro/types';
import { MessageSent } from '../events/messaging/MessageSent';

export interface Message {
  id: MessageId;
  senderId: UserId;
  type: MessageType;
  content: string;
  sentAt: Date;
}

export interface ConversationProps {
  id: ConversationId;
  participantIds: UserId[];
  messages: Message[];
  lastReadAt: Map<UserId, Date>;
  createdAt: Date;
  updatedAt: Date;
}

export class Conversation {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: ConversationProps) {}

  static create(
    props: Omit<ConversationProps, 'messages' | 'lastReadAt' | 'createdAt' | 'updatedAt'>
  ): Conversation {
    const now = new Date();
    return new Conversation({
      ...props,
      messages: [],
      lastReadAt: new Map(),
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ConversationProps): Conversation {
    return new Conversation(props);
  }

  get id(): ConversationId {
    return this.props.id;
  }

  get participantIds(): readonly UserId[] {
    return this.props.participantIds;
  }

  get messages(): readonly Message[] {
    return this.props.messages;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  sendMessage(message: Message): void {
    this.props.messages.push(message);
    this.props.updatedAt = new Date();
    this.record(new MessageSent(message.id, this.props.id, message.senderId));
  }

  markReadAsOf(userId: UserId, asOf: Date): void {
    const current = this.props.lastReadAt.get(userId);
    if (!current || asOf.getTime() > current.getTime()) {
      this.props.lastReadAt.set(userId, asOf);
    }
  }

  unreadCountFor(userId: UserId): number {
    const lastRead = this.props.lastReadAt.get(userId);
    return this.props.messages.filter((message) => {
      if (message.senderId === userId) return false;
      return lastRead ? message.sentAt.getTime() > lastRead.getTime() : true;
    }).length;
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
