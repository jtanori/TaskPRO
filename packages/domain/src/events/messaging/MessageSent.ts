import type { MessageId, UserId } from '@taskpro/types';

export class MessageSent {
  readonly eventType = 'messaging.message.sent' as const;

  constructor(
    public readonly messageId: MessageId,
    public readonly conversationId: string,
    public readonly senderId: UserId
  ) {}
}
