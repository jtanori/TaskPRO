import { Verification } from '@taskpro/domain';
import type { UserId, VerificationDocumentType, VerificationDto } from '@taskpro/types';
import type { VerificationService } from './VerificationService';

export class FakeVerificationService implements VerificationService {
  private readonly verifications = new Map<string, VerificationDto>();

  async getVerification(userId: UserId): Promise<VerificationDto> {
    return (
      this.verifications.get(userId) ?? {
        status: 'unverified' as import('@taskpro/types').VerificationStatus,
      }
    );
  }

  async submitVerification(
    userId: UserId,
    documentType: VerificationDocumentType,
    documentUrl: string
  ): Promise<VerificationDto> {
    const verification = Verification.unverified().submit(documentType, documentUrl);
    const dto: VerificationDto = {
      status: verification.status,
      documentType: verification.documentType,
      documentUrl: verification.documentUrl,
      submittedAt: verification.submittedAt?.toISOString(),
    };
    this.verifications.set(userId, dto);
    return dto;
  }
}

export const verificationService = new FakeVerificationService();
