import { BookingId, ProfessionalId, ReviewDimension, ReviewId, UserId } from '@taskpro/types';
import { Rating } from '../value-objects';
import { ReviewSubmitted } from '../events/reviews/ReviewSubmitted';

export interface ReviewDimensionScore {
  dimension: ReviewDimension;
  rating: Rating;
}

export interface ReviewProps {
  id: ReviewId;
  bookingId: BookingId;
  reviewerId: UserId;
  revieweeId: ProfessionalId;
  dimensions: ReviewDimensionScore[];
  comment?: string;
  createdAt: Date;
}

export class Review {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: ReviewProps) {}

  static create(props: Omit<ReviewProps, 'createdAt'>): Review {
    const review = new Review({ ...props, createdAt: new Date() });
    review.record(new ReviewSubmitted(props.id, props.bookingId));
    return review;
  }

  static reconstitute(props: ReviewProps): Review {
    return new Review(props);
  }

  get id(): ReviewId {
    return this.props.id;
  }

  get bookingId(): BookingId {
    return this.props.bookingId;
  }

  get reviewerId(): UserId {
    return this.props.reviewerId;
  }

  get revieweeId(): ProfessionalId {
    return this.props.revieweeId;
  }

  get dimensions(): ReviewDimensionScore[] {
    return this.props.dimensions;
  }

  get comment(): string | undefined {
    return this.props.comment;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get overallRating(): Rating {
    const overall = this.props.dimensions.find(
      (dimension) => dimension.dimension === ReviewDimension.Overall
    );
    return overall?.rating ?? Rating.create(0);
  }

  private record(event: unknown): void {
    this.uncommittedEvents.push(event);
  }

  getUncommittedEvents(): readonly unknown[] {
    return this.uncommittedEvents;
  }

  commitEvents(): void {
    this.uncommittedEvents = [];
  }
}
