import { BookingStatus } from '@taskpro/types';
import type { Booking } from '../aggregates/Booking';

export class BookingCancellationPolicy {
  static canCancel(booking: Booking): boolean {
    return [
      BookingStatus.Draft,
      BookingStatus.Requested,
      BookingStatus.Accepted,
      BookingStatus.ProfessionalAssigned,
    ].includes(booking.status);
  }
}
