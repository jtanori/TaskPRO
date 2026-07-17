import type { Payout, PayoutProps } from '../aggregates/Payout';
import type { PayoutId, ProfessionalId } from '@taskpro/types';

export interface PayoutRepository {
  findById(id: PayoutId): Promise<Payout | null>;
  findByProfessionalId(professionalId: ProfessionalId): Promise<Payout[]>;
  save(payout: Payout): Promise<void>;
  reconstitute(props: PayoutProps): Payout;
}
