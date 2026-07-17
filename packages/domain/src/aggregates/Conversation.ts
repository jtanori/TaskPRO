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
  createdAt: Date;
  updatedAt: Date;
}

export class Conversation {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: ConversationProps) {}

  static create(
    props: Omit<ConversationProps, 'messages' | 'createdAt' | 'updatedAt'>
  ): Conversation {
    const now = new Date();
    return new Conversation({
      ...props,
      messages: [],
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

  sendMessage(message: Message): void {
    this.props.messages.push(message);
    this.props.updatedAt = new Date();
    this.record(new MessageSent(message.id, this.props.id, message.senderId));
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
