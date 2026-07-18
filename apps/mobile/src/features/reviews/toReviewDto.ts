import type { ReviewDto } from '@taskpro/types';
import type { Review } from '@taskpro/domain';

export function toReviewDto(review: Review): ReviewDto {
  return {
    id: review.id,
    bookingId: review.bookingId,
    reviewerId: review.reviewerId,
    revieweeId: review.revieweeId,
    dimensions: review.dimensions.map((dimension) => ({
      dimension: dimension.dimension,
      rating: {
        value: dimension.rating.value,
        max: 5,
        precision: 0.5,
      },
    })),
    comment: review.comment,
    createdAt: review.createdAt.toISOString(),
  };
}
