import type { ProfessionalId } from '@taskpro/types';

export class ProfessionalVerified {
  readonly eventType = 'professional.verified' as const;

  constructor(public readonly professionalId: ProfessionalId) {}
}
