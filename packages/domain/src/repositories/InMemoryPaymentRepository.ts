import type { BookingId, PaymentId } from '@taskpro/types';
import { Payment, type PaymentProps } from '../aggregates/Payment';
import type { PaymentRepository } from './PaymentRepository';

export class InMemoryPaymentRepository implements PaymentRepository {
  private payments = new Map<string, Payment>();

  async findById(id: PaymentId): Promise<Payment | null> {
    return this.payments.get(id) ?? null;
  }

  async findByBookingId(bookingId: BookingId): Promise<Payment | null> {
    return (
      Array.from(this.payments.values()).find((payment) => payment.bookingId === bookingId) ?? null
    );
  }

  async save(payment: Payment): Promise<void> {
    this.payments.set(payment.id, payment);
    payment.commitEvents();
  }

  reconstitute(props: PaymentProps): Payment {
    return Payment.reconstitute(props);
  }

  clear(): void {
    this.payments.clear();
  }
}
