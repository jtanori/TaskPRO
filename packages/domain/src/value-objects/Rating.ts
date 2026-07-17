import { DomainErrorCode } from '@taskpro/types';
import { DomainError } from '../errors';

export class Rating {
  static readonly MAX = 5;
  static readonly PRECISION = 0.5;

  private constructor(public readonly value: number) {}

  static create(value: number): Rating {
    if (value < 0 || value > Rating.MAX) {
      throw new DomainError(
        DomainErrorCode.InvalidArgument,
        `Rating must be between 0 and ${Rating.MAX}`
      );
    }
    if (value % Rating.PRECISION !== 0) {
      throw new DomainError(
        DomainErrorCode.InvalidArgument,
        `Rating must be a multiple of ${Rating.PRECISION}`
      );
    }
    return new Rating(value);
  }

  static average(ratings: Rating[]): Rating {
    if (ratings.length === 0) {
      return new Rating(0);
    }
    const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return new Rating(Math.round((sum / ratings.length) * 2) / 2);
  }
}
