import type { UserId, VerificationDocumentType, VerificationDto } from '@taskpro/types';

export interface VerificationService {
  getVerification(userId: UserId): Promise<VerificationDto>;
  submitVerification(
    userId: UserId,
    documentType: VerificationDocumentType,
    documentUrl: string
  ): Promise<VerificationDto>;
}
