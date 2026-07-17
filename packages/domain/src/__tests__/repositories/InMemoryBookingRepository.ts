import type { BookingId } from '@taskpro/types';
import { Booking, type BookingProps } from '../../aggregates/Booking';
import type { BookingRepository } from '../../repositories/BookingRepository';

export class InMemoryBookingRepository implements BookingRepository {
  private bookings = new Map<string, Booking>();

  async findById(id: BookingId): Promise<Booking | null> {
    return this.bookings.get(id) ?? null;
  }

  async save(booking: Booking): Promise<void> {
    this.bookings.set(booking.id, booking);
    booking.commitEvents();
  }

  reconstitute(props: BookingProps): Booking {
    return Booking.reconstitute(props);
  }
}
