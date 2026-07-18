import { useCallback, useEffect, useState } from 'react';
import type { ReviewDto, UserId } from '@taskpro/types';
import { reviewService } from './FakeReviewService';

interface UseReviewsResult {
  reviews: ReviewDto[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useReviews(professionalId: string | undefined): UseReviewsResult {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!professionalId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewService.getReviewsForProfessional(professionalId);
      setReviews(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load reviews'));
    } finally {
      setIsLoading(false);
    }
  }, [professionalId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { reviews, isLoading, error, refresh };
}

interface UseSubmitReviewResult {
  submit: (input: {
    bookingId: string;
    reviewerId: UserId;
    revieweeId: string;
    overallRating: number;
    comment?: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
}

export function useSubmitReview(): UseSubmitReviewResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = useCallback(
    async (input: {
      bookingId: string;
      reviewerId: UserId;
      revieweeId: string;
      overallRating: number;
      comment?: string;
    }) => {
      setIsSubmitting(true);
      setError(null);
      try {
        await reviewService.submitReview({
          bookingId: input.bookingId,
          reviewerId: input.reviewerId,
          revieweeId: input.revieweeId,
          dimensions: [
            {
              dimension: 'overall' as import('@taskpro/types').ReviewDimension,
              rating: input.overallRating,
            },
          ],
          comment: input.comment,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to submit review'));
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return { submit, isSubmitting, error };
}
