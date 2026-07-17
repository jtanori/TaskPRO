import { describe, expect, it } from 'vitest';
import { Email } from '../../value-objects/Email';

describe('Email', () => {
  it('normalizes and validates email', () => {
    const email = Email.create('  Test@Example.COM  ');
    expect(email.value).toBe('test@example.com');
  });

  it('rejects invalid email', () => {
    expect(() => Email.create('not-an-email')).toThrow();
  });
});
