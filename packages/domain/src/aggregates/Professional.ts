import { ProfessionalId, ProfessionalStatus, UserId } from '@taskpro/types';
import { Distance, Rating } from '../value-objects';
import { ProfessionalStateMachine } from '../state-machines';

export interface ProfessionalProps {
  id: ProfessionalId;
  userId: UserId;
  bio?: string;
  yearsExperience: number;
  rating: Rating;
  reviewCount: number;
  travelRadius: Distance;
  verificationStatus: string;
  status: ProfessionalStatus;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Professional {
  private constructor(private props: ProfessionalProps) {}

  static create(
    props: Omit<
      ProfessionalProps,
      'status' | 'rating' | 'reviewCount' | 'isAvailable' | 'createdAt' | 'updatedAt'
    >
  ): Professional {
    const now = new Date();
    return new Professional({
      ...props,
      status: ProfessionalStatus.PendingVerification,
      rating: Rating.create(0),
      reviewCount: 0,
      isAvailable: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ProfessionalProps): Professional {
    return new Professional(props);
  }

  get id(): ProfessionalId {
    return this.props.id;
  }

  get status(): ProfessionalStatus {
    return this.props.status;
  }

  get rating(): Rating {
    return this.props.rating;
  }

  transitionStatus(to: ProfessionalStatus): void {
    this.props.status = ProfessionalStateMachine.transition(this.props.status, to);
    this.props.isAvailable = to === ProfessionalStatus.Available;
    this.props.updatedAt = new Date();
  }

  updateRating(rating: Rating, reviewCount: number): void {
    this.props.rating = rating;
    this.props.reviewCount = reviewCount;
    this.props.updatedAt = new Date();
  }
}
