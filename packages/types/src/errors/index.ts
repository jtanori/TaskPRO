export enum DomainErrorCode {
  InvalidTransition = 'INVALID_TRANSITION',
  InvalidArgument = 'INVALID_ARGUMENT',
  InvariantViolation = 'INVARIANT_VIOLATION',
  NotFound = 'NOT_FOUND',
  AlreadyExists = 'ALREADY_EXISTS',
  Unauthorized = 'UNAUTHORIZED',
  Conflict = 'CONFLICT',
}

export interface DomainErrorDto {
  code: DomainErrorCode;
  message: string;
}
