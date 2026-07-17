import type { Booking, BookingProps } from '../aggregates/Booking';
import type { BookingId } from '@taskpro/types';

export interface BookingRepository {
  findById(id: BookingId): Promise<Booking | null>;
  save(booking: Booking): Promise<void>;
  reconstitute(props: BookingProps): Booking;
}
