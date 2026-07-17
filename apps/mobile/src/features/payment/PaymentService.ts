import type { InvoiceDto, PayoutDto, PaymentDto, PaymentMethodDto, UserId } from '@taskpro/types';

export interface PaymentService {
  getPaymentMethods(userId: UserId): Promise<PaymentMethodDto[]>;
  getCheckout(
    bookingId: string
  ): Promise<{ payment: PaymentDto | null; invoice: InvoiceDto | null }>;
  payBooking(bookingId: string, userId: UserId): Promise<PaymentDto | null>;
  getEarnings(professionalId: string): Promise<PayoutDto[]>;
}
