import { DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export class Phone {
  private constructor(public readonly value: string) {}

  static create(value: string): Phone {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) {
      throw new DomainError(DomainErrorCode.InvalidArgument, `Invalid phone number: ${value}`);
    }
    return new Phone(digits);
  }

  equals(other: Phone): boolean {
    return this.value === other.value;
  }
}
