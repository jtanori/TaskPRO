import { DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export interface PasswordPolicyResult {
  valid: boolean;
  violations: string[];
}

const MIN_LENGTH = 8;
const HAS_UPPERCASE = /[A-Z]/;
const HAS_LOWERCASE = /[a-z]/;
const HAS_DIGIT = /\d/;
const SPECIALS = '!@#$%^&*()_+-=[]{};\':"\\|,.<>/?';

function hasSpecialCharacter(value: string): boolean {
  return [...value].some((char) => SPECIALS.includes(char));
}

export class Password {
  private constructor(private readonly rawValue: string) {}

  static validate(value: string): PasswordPolicyResult {
    const violations: string[] = [];

    if (value.length < MIN_LENGTH) {
      violations.push(`Password must be at least ${MIN_LENGTH} characters.`);
    }
    if (!HAS_UPPERCASE.test(value)) {
      violations.push('Password must contain an uppercase letter.');
    }
    if (!HAS_LOWERCASE.test(value)) {
      violations.push('Password must contain a lowercase letter.');
    }
    if (!HAS_DIGIT.test(value)) {
      violations.push('Password must contain a number.');
    }
    if (!hasSpecialCharacter(value)) {
      violations.push('Password must contain a special character.');
    }

    return { valid: violations.length === 0, violations };
  }

  static create(value: string): Password {
    const result = Password.validate(value);
    if (!result.valid) {
      throw new DomainError(DomainErrorCode.InvalidArgument, result.violations.join(' '));
    }
    return new Password(value);
  }

  get value(): string {
    return this.rawValue;
  }

  equals(other: Password): boolean {
    return this.rawValue === other.rawValue;
  }
}
