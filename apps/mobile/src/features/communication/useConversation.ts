import { useCallback, useEffect, useState } from 'react';
import type { ConversationDto, UserId } from '@taskpro/types';
import { conversationService } from './FakeConversationService';

interface UseConversationResult {
  conversation: ConversationDto | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useConversation(
  id: string | undefined,
  userId: UserId | undefined
): UseConversationResult {
  const [conversation, setConversation] = useState<ConversationDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!id || !userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await conversationService.getConversation(id, userId);
      if (result) {
        await conversationService.markAsRead(id, userId);
      }
      setConversation(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load conversation'));
    } finally {
      setIsLoading(false);
    }
  }, [id, userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { conversation, isLoading, error, refresh };
}
