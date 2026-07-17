import type { Professional, ProfessionalProps } from '../aggregates/Professional';
import type { ProfessionalId, UserId } from '@taskpro/types';

export interface ProfessionalRepository {
  findById(id: ProfessionalId): Promise<Professional | null>;
  findByUserId(userId: UserId): Promise<Professional | null>;
  save(professional: Professional): Promise<void>;
  reconstitute(props: ProfessionalProps): Professional;
}
