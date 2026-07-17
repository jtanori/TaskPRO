import { useCallback, useEffect, useState } from 'react';
import type { ConversationDto, UserId } from '@taskpro/types';
import { conversationService } from './FakeConversationService';

interface UseConversationsResult {
  conversations: ConversationDto[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useConversations(userId: UserId | undefined): UseConversationsResult {
  const [conversations, setConversations] = useState<ConversationDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await conversationService.listConversations(userId);
      setConversations(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load conversations'));
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { conversations, isLoading, error, refresh };
}
