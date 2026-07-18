import type { ProfessionalId, UserId } from '@taskpro/types';
import { Professional, ProfessionalProps } from '../aggregates/Professional';
import type { ProfessionalRepository } from './ProfessionalRepository';

export class InMemoryProfessionalRepository implements ProfessionalRepository {
  private readonly professionals = new Map<string, ProfessionalProps>();

  async findById(id: ProfessionalId): Promise<Professional | null> {
    const props = this.professionals.get(id);
    return props ? this.reconstitute(props) : null;
  }

  async findByUserId(userId: UserId): Promise<Professional | null> {
    for (const props of this.professionals.values()) {
      if (props.userId === userId) {
        return this.reconstitute(props);
      }
    }
    return null;
  }

  async save(professional: Professional): Promise<void> {
    this.professionals.set(professional.id, {
      id: professional.id,
      userId: professional.userId,
      bio: professional['bio'],
      yearsExperience: professional['yearsExperience'],
      rating: professional.rating,
      reviewCount: professional.reviewCount,
      travelRadius: professional['travelRadius'],
      verification: professional.verification,
      status: professional.status,
      isAvailable: professional.isAvailable,
      createdAt: professional['createdAt'],
      updatedAt: professional['updatedAt'],
    });
  }

  reconstitute(props: ProfessionalProps): Professional {
    return Professional.reconstitute(props);
  }
}
