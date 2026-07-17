import { ProfessionalStatus } from '@taskpro/types';
import { DomainError } from '../errors';

const transitions: Record<ProfessionalStatus, ProfessionalStatus[]> = {
  [ProfessionalStatus.PendingVerification]: [ProfessionalStatus.Verified],
  [ProfessionalStatus.Verified]: [ProfessionalStatus.Available, ProfessionalStatus.Suspended],
  [ProfessionalStatus.Available]: [
    ProfessionalStatus.Busy,
    ProfessionalStatus.Offline,
    ProfessionalStatus.Suspended,
  ],
  [ProfessionalStatus.Busy]: [ProfessionalStatus.Available, ProfessionalStatus.Offline],
  [ProfessionalStatus.Offline]: [ProfessionalStatus.Available, ProfessionalStatus.Suspended],
  [ProfessionalStatus.Suspended]: [ProfessionalStatus.Verified],
};

export class ProfessionalStateMachine {
  static canTransition(from: ProfessionalStatus, to: ProfessionalStatus): boolean {
    return transitions[from].includes(to);
  }

  static transition(from: ProfessionalStatus, to: ProfessionalStatus): ProfessionalStatus {
    if (!this.canTransition(from, to)) {
      throw DomainError.invalidTransition(from, to);
    }
    return to;
  }
}
