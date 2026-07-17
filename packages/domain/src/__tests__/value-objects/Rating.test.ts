import { describe, expect, it } from 'vitest';
import { Rating } from '../../value-objects/Rating';

describe('Rating', () => {
  it('accepts valid ratings', () => {
    expect(Rating.create(4.5).value).toBe(4.5);
  });

  it('rejects out-of-range ratings', () => {
    expect(() => Rating.create(6)).toThrow();
    expect(() => Rating.create(-1)).toThrow();
  });

  it('rejects invalid precision', () => {
    expect(() => Rating.create(4.3)).toThrow();
  });

  it('averages ratings', () => {
    const average = Rating.average([Rating.create(4), Rating.create(5)]);
    expect(average.value).toBe(4.5);
  });
});
