import type { ProfessionalId } from '@taskpro/types';
import type { Review } from '../aggregates/Review';
import type { ReviewRepository } from '../repositories/ReviewRepository';

export class GetReviewsForProfessional {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(professionalId: ProfessionalId): Promise<Review[]> {
    return this.reviewRepository.findByProfessionalId(professionalId);
  }
}
