import { describe, expect, it } from 'vitest';
import { DomainError } from '../../errors';
import { Password } from '../../value-objects/Password';

describe('Password', () => {
  it('accepts a valid password', () => {
    const password = Password.create('Valid1!Pass');
    expect(password.value).toBe('Valid1!Pass');
  });

  it('rejects short passwords', () => {
    const result = Password.validate('Short1!');
    expect(result.valid).toBe(false);
    expect(result.violations.some((v) => v.includes('8'))).toBe(true);
  });

  it('rejects passwords missing required character classes', () => {
    const missingSpecial = Password.validate('Valid1Pass');
    expect(missingSpecial.valid).toBe(false);
    expect(missingSpecial.violations.some((v) => v.includes('special'))).toBe(true);

    const missingUpper = Password.validate('valid1!pass');
    expect(missingUpper.valid).toBe(false);
    expect(missingUpper.violations.some((v) => v.includes('uppercase'))).toBe(true);

    const missingDigit = Password.validate('Valid!Pass');
    expect(missingDigit.valid).toBe(false);
    expect(missingDigit.violations.some((v) => v.includes('number'))).toBe(true);
  });

  it('throws a domain error for invalid passwords', () => {
    expect(() => Password.create('weak')).toThrow(DomainError);
  });

  it('considers identical passwords equal', () => {
    const a = Password.create('Valid1!Pass');
    const b = Password.create('Valid1!Pass');
    expect(a.equals(b)).toBe(true);
  });
});
