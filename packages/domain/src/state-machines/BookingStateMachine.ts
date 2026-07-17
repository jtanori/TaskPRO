import { BookingStatus } from '@taskpro/types';
import { DomainError } from '../errors';

const transitions: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.Draft]: [BookingStatus.Requested, BookingStatus.Cancelled],
  [BookingStatus.Requested]: [
    BookingStatus.Accepted,
    BookingStatus.Rejected,
    BookingStatus.Cancelled,
    BookingStatus.Expired,
  ],
  [BookingStatus.Accepted]: [BookingStatus.ProfessionalAssigned, BookingStatus.Cancelled],
  [BookingStatus.ProfessionalAssigned]: [BookingStatus.EnRoute, BookingStatus.Cancelled],
  [BookingStatus.EnRoute]: [BookingStatus.Arrived, BookingStatus.Cancelled],
  [BookingStatus.Arrived]: [BookingStatus.InProgress, BookingStatus.Cancelled],
  [BookingStatus.InProgress]: [
    BookingStatus.Completed,
    BookingStatus.Cancelled,
    BookingStatus.Failed,
  ],
  [BookingStatus.Completed]: [BookingStatus.PaymentPending],
  [BookingStatus.PaymentPending]: [BookingStatus.Paid, BookingStatus.Failed],
  [BookingStatus.Paid]: [BookingStatus.Closed],
  [BookingStatus.Closed]: [],
  [BookingStatus.Cancelled]: [],
  [BookingStatus.Expired]: [],
  [BookingStatus.Rejected]: [],
  [BookingStatus.Failed]: [],
};

export class BookingStateMachine {
  static canTransition(from: BookingStatus, to: BookingStatus): boolean {
    return transitions[from].includes(to);
  }

  static transition(from: BookingStatus, to: BookingStatus): BookingStatus {
    if (!this.canTransition(from, to)) {
      throw DomainError.invalidTransition(from, to);
    }
    return to;
  }
}
