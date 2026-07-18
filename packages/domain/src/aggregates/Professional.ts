import {
  ProfessionalId,
  ProfessionalStatus,
  UserId,
  VerificationDocumentType,
} from '@taskpro/types';
import { Distance, Rating, Verification } from '../value-objects';
import { ProfessionalStateMachine } from '../state-machines';
import { ProfessionalVerified } from '../events/professional/ProfessionalVerified';

export interface ProfessionalProps {
  id: ProfessionalId;
  userId: UserId;
  bio?: string;
  yearsExperience: number;
  rating: Rating;
  reviewCount: number;
  travelRadius: Distance;
  verification: Verification;
  status: ProfessionalStatus;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Professional {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: ProfessionalProps) {}

  static create(
    props: Omit<
      ProfessionalProps,
      | 'status'
      | 'rating'
      | 'reviewCount'
      | 'verification'
      | 'isAvailable'
      | 'createdAt'
      | 'updatedAt'
    >
  ): Professional {
    const now = new Date();
    return new Professional({
      ...props,
      status: ProfessionalStatus.PendingVerification,
      rating: Rating.create(0),
      reviewCount: 0,
      verification: Verification.unverified(),
      isAvailable: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ProfessionalProps): Professional {
    return new Professional({
      ...props,
      verification: Verification.create(props.verification.toProps()),
    });
  }

  get id(): ProfessionalId {
    return this.props.id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get status(): ProfessionalStatus {
    return this.props.status;
  }

  get rating(): Rating {
    return this.props.rating;
  }

  get reviewCount(): number {
    return this.props.reviewCount;
  }

  get verification(): Verification {
    return this.props.verification;
  }

  get isAvailable(): boolean {
    return this.props.isAvailable;
  }

  get bio(): string | undefined {
    return this.props.bio;
  }

  get yearsExperience(): number {
    return this.props.yearsExperience;
  }

  get travelRadius(): Distance {
    return this.props.travelRadius;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  transitionStatus(to: ProfessionalStatus): void {
    this.props.status = ProfessionalStateMachine.transition(this.props.status, to);
    this.props.isAvailable = to === ProfessionalStatus.Available;
    this.props.updatedAt = new Date();
  }

  submitVerification(documentType: VerificationDocumentType, documentUrl: string): void {
    this.props.verification = this.props.verification.submit(documentType, documentUrl);
    this.props.updatedAt = new Date();
  }

  approveVerification(): void {
    this.props.verification = this.props.verification.approve();
    this.transitionStatus(ProfessionalStatus.Verified);
    this.record(new ProfessionalVerified(this.props.id));
  }

  updateRating(rating: Rating, reviewCount: number): void {
    this.props.rating = rating;
    this.props.reviewCount = reviewCount;
    this.props.updatedAt = new Date();
  }

  getUncommittedEvents(): readonly unknown[] {
    return this.uncommittedEvents;
  }

  commitEvents(): void {
    this.uncommittedEvents = [];
  }

  private record(event: unknown): void {
    this.uncommittedEvents.push(event);
  }
}
