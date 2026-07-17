import { DomainErrorCode } from '@taskpro/types';

export class DomainError extends Error {
  constructor(
    public readonly code: DomainErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'DomainError';
  }

  static invalidTransition(from: string, to: string): DomainError {
    return new DomainError(
      DomainErrorCode.InvalidTransition,
      `Invalid transition from ${from} to ${to}`
    );
  }

  static invalidArgument(message: string): DomainError {
    return new DomainError(DomainErrorCode.InvalidArgument, message);
  }

  static invariantViolation(message: string): DomainError {
    return new DomainError(DomainErrorCode.InvariantViolation, message);
  }
}
