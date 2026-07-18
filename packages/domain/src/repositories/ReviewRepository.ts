import type { BookingId, ProfessionalId, ReviewId, UserId } from '@taskpro/types';
import type { Review, ReviewProps } from '../aggregates/Review';

export interface ReviewRepository {
  findById(id: ReviewId): Promise<Review | null>;
  findByBookingId(bookingId: BookingId): Promise<Review | null>;
  findByProfessionalId(professionalId: ProfessionalId): Promise<Review[]>;
  findByReviewerId(reviewerId: UserId): Promise<Review[]>;
  save(review: Review): Promise<void>;
  reconstitute(props: ReviewProps): Review;
}
