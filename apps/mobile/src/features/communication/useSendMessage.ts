import { useCallback, useState } from 'react';
import type { MessageDto, UserId } from '@taskpro/types';
import { conversationService } from './FakeConversationService';

interface UseSendMessageResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  error: Error | null;
  sendMessage: (
    conversationId: string,
    senderId: UserId,
    content: string
  ) => Promise<MessageDto | null>;
}

export function useSendMessage(): UseSendMessageResult {
  const [status, setStatus] = useState<UseSendMessageResult['status']>('idle');
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(
    async (conversationId: string, senderId: UserId, content: string) => {
      setStatus('loading');
      setError(null);
      try {
        const message = await conversationService.sendMessage(conversationId, senderId, content);
        setStatus('success');
        return message;
      } catch (err) {
        const normalized = err instanceof Error ? err : new Error('Failed to send message');
        setError(normalized);
        setStatus('error');
        return null;
      }
    },
    []
  );

  return { status, error, sendMessage };
}
