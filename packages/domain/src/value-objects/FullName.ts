import { DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export class FullName {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {}

  static create(firstName: string, lastName: string): FullName {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    if (trimmedFirst.length === 0 || trimmedLast.length === 0) {
      throw new DomainError(DomainErrorCode.InvalidArgument, 'First and last name are required');
    }
    return new FullName(trimmedFirst, trimmedLast);
  }

  get displayName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
