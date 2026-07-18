import type { ReviewDimension, ReviewDto, UserId } from '@taskpro/types';

export interface SubmitReviewInput {
  bookingId: string;
  reviewerId: UserId;
  revieweeId: string;
  dimensions: { dimension: ReviewDimension; rating: number }[];
  comment?: string;
}

export interface ReviewService {
  getReviewsForProfessional(professionalId: string): Promise<ReviewDto[]>;
  submitReview(input: SubmitReviewInput): Promise<ReviewDto>;
}
