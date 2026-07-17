import { BookingId, PaymentId, PaymentProvider, PaymentStatus } from '@taskpro/types';
import { Money } from '../value-objects';
import { PaymentCaptured } from '../events/payments/PaymentCaptured';

export interface PaymentProps {
  id: PaymentId;
  bookingId: BookingId;
  amount: Money;
  provider: PaymentProvider;
  providerPaymentId?: string;
  status: PaymentStatus;
  capturedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Payment {
  private uncommittedEvents: unknown[] = [];

  private constructor(private props: PaymentProps) {}

  static create(props: Omit<PaymentProps, 'status' | 'createdAt' | 'updatedAt'>): Payment {
    const now = new Date();
    return new Payment({
      ...props,
      status: PaymentStatus.Pending,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: PaymentProps): Payment {
    return new Payment(props);
  }

  get id(): PaymentId {
    return this.props.id;
  }

  get amount(): Money {
    return this.props.amount;
  }

  authorize(providerPaymentId: string): void {
    this.props.providerPaymentId = providerPaymentId;
    this.props.status = PaymentStatus.Authorized;
    this.props.updatedAt = new Date();
  }

  capture(): void {
    this.props.status = PaymentStatus.Captured;
    this.props.capturedAt = new Date();
    this.props.updatedAt = new Date();
    this.record(new PaymentCaptured(this.props.id, this.props.bookingId, this.props.amount));
  }

  fail(): void {
    this.props.status = PaymentStatus.Failed;
    this.props.updatedAt = new Date();
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
