import { useCallback, useEffect, useState } from 'react';
import type { UserId, VerificationDocumentType, VerificationDto } from '@taskpro/types';
import { verificationService } from './FakeVerificationService';

interface UseVerificationResult {
  verification: VerificationDto | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  submit: (documentType: VerificationDocumentType, documentUrl: string) => Promise<void>;
  isSubmitting: boolean;
}

export function useVerification(userId: UserId | undefined): UseVerificationResult {
  const [verification, setVerification] = useState<VerificationDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await verificationService.getVerification(userId);
      setVerification(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load verification'));
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const submit = useCallback(
    async (documentType: VerificationDocumentType, documentUrl: string) => {
      if (!userId) return;
      setIsSubmitting(true);
      setError(null);
      try {
        const result = await verificationService.submitVerification(
          userId,
          documentType,
          documentUrl
        );
        setVerification(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to submit verification'));
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { verification, isLoading, error, refresh, submit, isSubmitting };
}
