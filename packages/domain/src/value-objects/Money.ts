import { Currency, DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export class Money {
  private constructor(
    public readonly amountMinor: number,
    public readonly currency: Currency
  ) {
    if (!Number.isInteger(amountMinor)) {
      throw new DomainError(
        DomainErrorCode.InvalidArgument,
        'Money amount must be an integer number of minor units'
      );
    }
  }

  static create(amountMinor: number, currency: Currency): Money {
    return new Money(amountMinor, currency);
  }

  static zero(currency: Currency): Money {
    return new Money(0, currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor + other.amountMinor, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor - other.amountMinor, this.currency);
  }

  multiply(factor: number): Money {
    const result = Math.round(this.amountMinor * factor);
    return new Money(result, this.currency);
  }

  equals(other: Money): boolean {
    return this.currency === other.currency && this.amountMinor === other.amountMinor;
  }

  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountMinor > other.amountMinor;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new DomainError(
        DomainErrorCode.InvalidArgument,
        `Currency mismatch: ${this.currency} vs ${other.currency}`
      );
    }
  }
}
