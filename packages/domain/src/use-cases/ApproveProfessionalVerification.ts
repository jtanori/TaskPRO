import { DomainErrorCode, ProfessionalId } from '@taskpro/types';
import type { ProfessionalRepository } from '../repositories/ProfessionalRepository';
import { DomainError } from '../errors';

export class ApproveProfessionalVerification {
  constructor(private readonly professionalRepository: ProfessionalRepository) {}

  async execute(professionalId: ProfessionalId): Promise<void> {
    const professional = await this.professionalRepository.findById(professionalId);
    if (!professional) {
      throw new DomainError(DomainErrorCode.NotFound, 'Professional not found');
    }
    professional.approveVerification();
    await this.professionalRepository.save(professional);
  }
}
