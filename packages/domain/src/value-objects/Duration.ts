import { DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export class Duration {
  private constructor(public readonly minutes: number) {
    if (!Number.isInteger(minutes) || minutes < 0) {
      throw new DomainError(
        DomainErrorCode.InvalidArgument,
        'Duration must be a non-negative integer number of minutes'
      );
    }
  }

  static create(minutes: number): Duration {
    return new Duration(minutes);
  }

  static fromHours(hours: number): Duration {
    return new Duration(Math.round(hours * 60));
  }

  add(other: Duration): Duration {
    return new Duration(this.minutes + other.minutes);
  }

  equals(other: Duration): boolean {
    return this.minutes === other.minutes;
  }

  toHours(): number {
    return this.minutes / 60;
  }
}
