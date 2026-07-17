import { createPayoutId, type ProfessionalId } from '@taskpro/types';
import { Payout } from '../aggregates/Payout';
import type { PayoutRepository } from '../repositories/PayoutRepository';
import type { Money } from '../value-objects';

export interface CreatePayoutInput {
  professionalId: ProfessionalId;
  grossAmount: Money;
  platformFeePercent: number;
}

export class CreatePayout {
  constructor(private readonly payoutRepository: PayoutRepository) {}

  async execute(input: CreatePayoutInput) {
    const feeMultiplier = Math.max(0, Math.min(1, input.platformFeePercent));
    const feeAmount = input.grossAmount.multiply(feeMultiplier);
    const netAmount = input.grossAmount.subtract(feeAmount);

    const payout = Payout.create({
      id: createPayoutId(`payout_${Date.now()}`),
      professionalId: input.professionalId,
      amount: netAmount,
    });

    payout.markPaid();
    await this.payoutRepository.save(payout);
    return payout;
  }
}
