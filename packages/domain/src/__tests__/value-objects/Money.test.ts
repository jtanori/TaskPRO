import { Currency } from '@taskpro/types';
import { describe, expect, it } from 'vitest';
import { Money } from '../../value-objects/Money';

describe('Money', () => {
  it('stores amount in minor units', () => {
    const money = Money.create(1050, Currency.USD);
    expect(money.amountMinor).toBe(1050);
    expect(money.currency).toBe(Currency.USD);
  });

  it('rejects fractional minor units', () => {
    expect(() => Money.create(10.5, Currency.USD)).toThrow();
  });

  it('adds same-currency amounts', () => {
    const total = Money.create(100, Currency.MXN).add(Money.create(200, Currency.MXN));
    expect(total.amountMinor).toBe(300);
  });

  it('rejects currency mismatch', () => {
    const usd = Money.create(100, Currency.USD);
    const mxn = Money.create(100, Currency.MXN);
    expect(() => usd.add(mxn)).toThrow();
  });
});
