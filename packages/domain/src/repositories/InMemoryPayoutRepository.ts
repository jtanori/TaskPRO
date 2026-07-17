import type { PayoutId, ProfessionalId } from '@taskpro/types';
import { Payout, type PayoutProps } from '../aggregates/Payout';
import type { PayoutRepository } from './PayoutRepository';

export class InMemoryPayoutRepository implements PayoutRepository {
  private payouts = new Map<string, Payout>();

  async findById(id: PayoutId): Promise<Payout | null> {
    return this.payouts.get(id) ?? null;
  }

  async findByProfessionalId(professionalId: ProfessionalId): Promise<Payout[]> {
    return Array.from(this.payouts.values())
      .filter((payout) => payout.professionalId === professionalId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async save(payout: Payout): Promise<void> {
    this.payouts.set(payout.id, payout);
  }

  reconstitute(props: PayoutProps): Payout {
    return Payout.reconstitute(props);
  }

  clear(): void {
    this.payouts.clear();
  }
}
