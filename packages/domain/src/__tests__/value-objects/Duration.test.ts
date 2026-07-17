import { describe, expect, it } from 'vitest';
import { Duration } from '../../value-objects/Duration';

describe('Duration', () => {
  it('stores minutes', () => {
    expect(Duration.create(90).minutes).toBe(90);
  });

  it('converts from hours', () => {
    expect(Duration.fromHours(1.5).minutes).toBe(90);
  });

  it('rejects negative duration', () => {
    expect(() => Duration.create(-1)).toThrow();
  });
});
