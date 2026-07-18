import { DomainErrorCode, VerificationDocumentType, VerificationStatus } from '@taskpro/types';
import { DomainError } from '../errors';

export interface VerificationProps {
  status: VerificationStatus;
  documentType?: VerificationDocumentType;
  documentUrl?: string;
  submittedAt?: Date;
  verifiedAt?: Date;
}

export class Verification {
  private constructor(private readonly props: VerificationProps) {}

  static unverified(): Verification {
    return new Verification({ status: VerificationStatus.Unverified });
  }

  static create(props: VerificationProps): Verification {
    return new Verification(props);
  }

  get status(): VerificationStatus {
    return this.props.status;
  }

  get documentType(): VerificationDocumentType | undefined {
    return this.props.documentType;
  }

  get documentUrl(): string | undefined {
    return this.props.documentUrl;
  }

  get submittedAt(): Date | undefined {
    return this.props.submittedAt;
  }

  get verifiedAt(): Date | undefined {
    return this.props.verifiedAt;
  }

  submit(documentType: VerificationDocumentType, documentUrl: string): Verification {
    return new Verification({
      status: VerificationStatus.Pending,
      documentType,
      documentUrl,
      submittedAt: new Date(),
    });
  }

  approve(): Verification {
    if (this.props.status !== VerificationStatus.Pending) {
      throw new DomainError(
        DomainErrorCode.InvariantViolation,
        'Only a pending verification can be approved'
      );
    }
    return new Verification({
      ...this.props,
      status: VerificationStatus.Verified,
      verifiedAt: new Date(),
    });
  }

  reject(): Verification {
    if (this.props.status !== VerificationStatus.Pending) {
      throw new DomainError(
        DomainErrorCode.InvariantViolation,
        'Only a pending verification can be rejected'
      );
    }
    return new Verification({
      ...this.props,
      status: VerificationStatus.Rejected,
    });
  }

  toProps(): VerificationProps {
    return { ...this.props };
  }
}
