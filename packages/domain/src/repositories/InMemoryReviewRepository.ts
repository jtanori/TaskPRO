import type { BookingId, ProfessionalId, ReviewId, UserId } from '@taskpro/types';
import { Review, ReviewProps } from '../aggregates/Review';
import type { ReviewRepository } from './ReviewRepository';

export class InMemoryReviewRepository implements ReviewRepository {
  private readonly reviews = new Map<string, ReviewProps>();

  async findById(id: ReviewId): Promise<Review | null> {
    const props = this.reviews.get(id);
    return props ? this.reconstitute(props) : null;
  }

  async findByBookingId(bookingId: BookingId): Promise<Review | null> {
    for (const props of this.reviews.values()) {
      if (props.bookingId === bookingId) {
        return this.reconstitute(props);
      }
    }
    return null;
  }

  async findByProfessionalId(professionalId: ProfessionalId): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter((props) => props.revieweeId === professionalId)
      .map((props) => this.reconstitute(props));
  }

  async findByReviewerId(reviewerId: UserId): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter((props) => props.reviewerId === reviewerId)
      .map((props) => this.reconstitute(props));
  }

  async save(review: Review): Promise<void> {
    this.reviews.set(review.id, {
      id: review.id,
      bookingId: review.bookingId,
      reviewerId: review.reviewerId,
      revieweeId: review.revieweeId,
      dimensions: review.dimensions,
      comment: review.comment,
      createdAt: review.createdAt,
    });
  }

  reconstitute(props: ReviewProps): Review {
    return Review.reconstitute(props);
  }
}
