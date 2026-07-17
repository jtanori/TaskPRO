import type { Payment } from '@taskpro/domain';
import type { PaymentDto } from '@taskpro/types';

export function toPaymentDto(payment: Payment): PaymentDto {
  return {
    id: payment.id,
    bookingId: payment.bookingId,
    amount: {
      amountMinor: payment.amount.amountMinor,
      currency: payment.amount.currency,
    },
    platformFee: {
      amountMinor: Math.round(payment.amount.amountMinor * 0.15),
      currency: payment.amount.currency,
    },
    provider: payment.provider,
    providerPaymentId: payment.providerPaymentId,
    status: payment.status,
    capturedAt: payment.capturedAt?.toISOString(),
    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.createdAt.toISOString(),
  };
}
