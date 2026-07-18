import {
  Distance,
  GetReviewsForProfessional,
  InMemoryProfessionalRepository,
  InMemoryReviewRepository,
  Professional,
  Rating,
  SubmitReview,
} from '@taskpro/domain';
import { createProfessionalId, createUserId, VerificationDocumentType } from '@taskpro/types';
import { bookingRepository } from '../booking/FakeBookingService';
import { PROFESSIONALS } from '../marketplace/FakeServiceCatalogService';
import type { ReviewService, SubmitReviewInput } from './ReviewService';
import { toReviewDto } from './toReviewDto';

export class FakeReviewService implements ReviewService {
  private readonly reviewRepository = new InMemoryReviewRepository();
  private readonly professionalRepository = new InMemoryProfessionalRepository();
  private readonly submitReviewUseCase: SubmitReview;
  private readonly getReviews: GetReviewsForProfessional;

  constructor() {
    this.submitReviewUseCase = new SubmitReview(
      bookingRepository,
      this.reviewRepository,
      this.professionalRepository
    );
    this.getReviews = new GetReviewsForProfessional(this.reviewRepository);
    this.seedProfessionals();
  }

  private seedProfessionals(): void {
    for (const dto of PROFESSIONALS) {
      const professional = Professional.create({
        id: createProfessionalId(dto.id),
        userId: createUserId(dto.userId),
        bio: dto.bio,
        yearsExperience: dto.yearsExperience,
        travelRadius: Distance.create(dto.travelRadiusMeters),
      });
      professional.submitVerification(
        VerificationDocumentType.GovernmentId,
        'https://docs.test/placeholder.pdf'
      );
      professional.approveVerification();
      professional.updateRating(Rating.create(dto.rating.value), dto.reviewCount);
      void this.professionalRepository.save(professional);
    }
  }

  async getReviewsForProfessional(professionalId: string) {
    const reviews = await this.getReviews.execute(createProfessionalId(professionalId));
    return reviews.map(toReviewDto);
  }

  async submitReview(input: SubmitReviewInput) {
    await this.submitReviewUseCase.execute({
      bookingId: input.bookingId as import('@taskpro/types').BookingId,
      reviewerId: input.reviewerId,
      revieweeId: createProfessionalId(input.revieweeId),
      dimensions: input.dimensions.map((dimension) => ({
        dimension: dimension.dimension,
        rating: dimension.rating,
      })),
      comment: input.comment,
    });
    const review = await this.reviewRepository.findByBookingId(
      input.bookingId as import('@taskpro/types').BookingId
    );
    if (!review) {
      throw new Error('Review was not saved');
    }
    return toReviewDto(review);
  }
}

export const reviewService = new FakeReviewService();
