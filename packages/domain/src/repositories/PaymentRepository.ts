import type { Payment, PaymentProps } from '../aggregates/Payment';
import type { BookingId, PaymentId } from '@taskpro/types';

export interface PaymentRepository {
  findById(id: PaymentId): Promise<Payment | null>;
  findByBookingId(bookingId: BookingId): Promise<Payment | null>;
  save(payment: Payment): Promise<void>;
  reconstitute(props: PaymentProps): Payment;
}
