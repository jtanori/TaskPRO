import {
  BookingId,
  BookingStatus,
  DomainErrorCode,
  ProfessionalId,
  ReviewDimension,
  ReviewId,
  UserId,
} from '@taskpro/types';
import type { BookingRepository } from '../repositories/BookingRepository';
import type { ProfessionalRepository } from '../repositories/ProfessionalRepository';
import type { ReviewRepository } from '../repositories/ReviewRepository';
import { Review, ReviewDimensionScore } from '../aggregates/Review';
import { Rating } from '../value-objects';
import { DomainError } from '../errors';

export interface SubmitReviewInput {
  bookingId: BookingId;
  reviewerId: UserId;
  revieweeId: ProfessionalId;
  dimensions: { dimension: ReviewDimension; rating: number }[];
  comment?: string;
}

export class SubmitReview {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly professionalRepository: ProfessionalRepository
  ) {}

  async execute(input: SubmitReviewInput): Promise<void> {
    const booking = await this.bookingRepository.findById(input.bookingId);
    if (!booking) {
      throw new DomainError(DomainErrorCode.NotFound, 'Booking not found');
    }
    if (booking.status !== BookingStatus.Paid && booking.status !== BookingStatus.Closed) {
      throw new DomainError(
        DomainErrorCode.InvariantViolation,
        'Reviews can only be submitted for completed bookings'
      );
    }

    const existing = await this.reviewRepository.findByBookingId(input.bookingId);
    if (existing) {
      throw new DomainError(
        DomainErrorCode.InvariantViolation,
        'Booking has already been reviewed'
      );
    }

    const dimensionScores: ReviewDimensionScore[] = input.dimensions.map((dimension) => ({
      dimension: dimension.dimension,
      rating: Rating.create(dimension.rating),
    }));

    const reviewId = `review-${input.bookingId}` as ReviewId;
    const review = Review.create({
      id: reviewId,
      bookingId: input.bookingId,
      reviewerId: input.reviewerId,
      revieweeId: input.revieweeId,
      dimensions: dimensionScores,
      comment: input.comment,
    });

    await this.reviewRepository.save(review);

    const reviews = await this.reviewRepository.findByProfessionalId(input.revieweeId);
    const overallRatings = reviews.map((reviewItem) => reviewItem.overallRating);
    const professional = await this.professionalRepository.findById(input.revieweeId);
    if (professional) {
      professional.updateRating(Rating.average(overallRatings), reviews.length);
      await this.professionalRepository.save(professional);
    }
  }
}
