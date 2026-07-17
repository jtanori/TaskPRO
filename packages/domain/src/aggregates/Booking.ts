import {
  BookingId,
  BookingStatus,
  DomainErrorCode,
  PaymentId,
  ProfessionalId,
  ServiceId,
  UserId,
} from '@taskpro/types';
import { Address, Money } from '../value-objects';
import { BookingStateMachine } from '../state-machines';
import { BookingRequested } from '../events/booking/BookingRequested';
import { BookingAssigned } from '../events/booking/BookingAssigned';
import { BookingAccepted } from '../events/booking/BookingAccepted';
import { ProfessionalDeparted } from '../events/booking/ProfessionalDeparted';
import { ProfessionalArrived } from '../events/booking/ProfessionalArrived';
import { WorkStarted } from '../events/execution/WorkStarted';
import { WorkCompleted } from '../events/execution/WorkCompleted';
import { PaymentCaptured } from '../events/payments/PaymentCaptured';
import { DomainError } from '../errors';

export interface BookingProps {
  id: BookingId;
  customerId: UserId;
  professionalId?: ProfessionalId;
  serviceId: ServiceId;
  status: BookingStatus;
  scheduledAt: Date;
  address: Address;
  price: Money;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Booking {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: BookingProps) {}

  static create(
    props: Omit<BookingProps, 'status' | 'professionalId' | 'createdAt' | 'updatedAt'>
  ): Booking {
    const now = new Date();
    const booking = new Booking({
      ...props,
      status: BookingStatus.Draft,
      createdAt: now,
      updatedAt: now,
    });
    return booking;
  }

  static reconstitute(props: BookingProps): Booking {
    return new Booking(props);
  }

  get id(): BookingId {
    return this.props.id;
  }

  get status(): BookingStatus {
    return this.props.status;
  }

  get customerId(): UserId {
    return this.props.customerId;
  }

  get professionalId(): ProfessionalId | undefined {
    return this.props.professionalId;
  }

  get price(): Money {
    return this.props.price;
  }

  request(): void {
    this.transitionTo(BookingStatus.Requested);
    this.record(new BookingRequested(this.props.id, this.props.customerId, this.props.serviceId));
  }

  accept(professionalId: ProfessionalId): void {
    this.transitionTo(BookingStatus.Accepted);
    this.props.professionalId = professionalId;
    this.record(new BookingAccepted(this.props.id, professionalId));
  }

  assign(professionalId: ProfessionalId): void {
    this.transitionTo(BookingStatus.ProfessionalAssigned);
    this.props.professionalId = professionalId;
    this.record(new BookingAssigned(this.props.id, professionalId));
  }

  markEnRoute(): void {
    this.assertProfessionalAssigned();
    this.transitionTo(BookingStatus.EnRoute);
    this.record(new ProfessionalDeparted(this.props.id, this.props.professionalId!));
  }

  markArrived(): void {
    this.assertProfessionalAssigned();
    this.transitionTo(BookingStatus.Arrived);
    this.record(new ProfessionalArrived(this.props.id, this.props.professionalId!));
  }

  startWork(taskId: string): void {
    this.assertProfessionalAssigned();
    this.transitionTo(BookingStatus.InProgress);
    this.record(new WorkStarted(this.props.id, taskId));
  }

  completeWork(): void {
    this.transitionTo(BookingStatus.Completed);
    this.record(new WorkCompleted(this.props.id, `task-${this.props.id}`));
  }

  markPaymentPending(): void {
    this.transitionTo(BookingStatus.PaymentPending);
  }

  markPaid(paymentId: string): void {
    this.transitionTo(BookingStatus.Paid);
    this.record(new PaymentCaptured(paymentId as PaymentId, this.props.id, this.props.price));
  }

  close(): void {
    this.transitionTo(BookingStatus.Closed);
  }

  cancel(): void {
    this.transitionTo(BookingStatus.Cancelled);
  }

  private transitionTo(status: BookingStatus): void {
    this.props.status = BookingStateMachine.transition(this.props.status, status);
    this.props.updatedAt = new Date();
  }

  private assertProfessionalAssigned(): void {
    if (!this.props.professionalId) {
      throw new DomainError(
        DomainErrorCode.InvariantViolation,
        'Booking must have an assigned professional'
      );
    }
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
