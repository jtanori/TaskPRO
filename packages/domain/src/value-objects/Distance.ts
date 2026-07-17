import { DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export class Distance {
  private constructor(public readonly meters: number) {
    if (meters < 0) {
      throw new DomainError(
        DomainErrorCode.InvalidArgument,
        'Distance must be a non-negative number of meters'
      );
    }
  }

  static create(meters: number): Distance {
    return new Distance(meters);
  }

  static fromKilometers(km: number): Distance {
    return new Distance(km * 1000);
  }

  static fromMiles(miles: number): Distance {
    return new Distance(miles * 1609.344);
  }

  toKilometers(): number {
    return this.meters / 1000;
  }

  toMiles(): number {
    return this.meters / 1609.344;
  }
}
