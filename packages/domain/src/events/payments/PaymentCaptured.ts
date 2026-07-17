import type { BookingId, PaymentId } from '@taskpro/types';
import type { Money } from '../../value-objects';

export class PaymentCaptured {
  readonly eventType = 'payments.payment.captured' as const;

  constructor(
    public readonly paymentId: PaymentId,
    public readonly bookingId: BookingId,
    public readonly amount: Money
  ) {}
}
