import type { BookingId, ReviewId } from '@taskpro/types';

export class ReviewSubmitted {
  readonly eventType = 'reviews.review.submitted' as const;

  constructor(
    public readonly reviewId: ReviewId,
    public readonly bookingId: BookingId
  ) {}
}
