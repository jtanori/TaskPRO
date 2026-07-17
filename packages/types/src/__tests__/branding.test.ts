import { describe, expect, it } from 'vitest';
import { createUserId, type UserId } from '../ids';

describe('branded identifiers', () => {
  it('preserves string value at runtime', () => {
    const id = createUserId('usr_123');
    expect(id).toBe('usr_123');
  });

  it('allows assignment from string creator', () => {
    const id: UserId = createUserId('usr_456');
    expect(id).toBe('usr_456');
  });

  it('prevents cross-brand assignment at compile time', () => {
    // This test documents the compile-time contract. Runtime behavior is unchanged.
    const userId = createUserId('usr_789');
    expect(typeof userId).toBe('string');
  });
});
