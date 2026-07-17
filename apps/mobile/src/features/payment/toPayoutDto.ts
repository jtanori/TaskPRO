import type { Payout } from '@taskpro/domain';
import type { PayoutDto } from '@taskpro/types';

export function toPayoutDto(payout: Payout): PayoutDto {
  return {
    id: payout.id,
    professionalId: payout.professionalId,
    amount: {
      amountMinor: payout.amount.amountMinor,
      currency: payout.amount.currency,
    },
    status: payout.status,
    createdAt: payout.createdAt.toISOString(),
    paidAt: payout.status === 'paid' ? payout.createdAt.toISOString() : undefined,
  };
}
