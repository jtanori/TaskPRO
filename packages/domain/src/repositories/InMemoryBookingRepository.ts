import type { BookingId } from '@taskpro/types';
import { Booking, type BookingProps } from '../aggregates/Booking';
import type { BookingRepository } from './BookingRepository';

export class InMemoryBookingRepository implements BookingRepository {
  private bookings = new Map<string, Booking>();

  async findById(id: BookingId): Promise<Booking | null> {
    return this.bookings.get(id) ?? null;
  }

  async save(booking: Booking): Promise<void> {
    this.bookings.set(booking.id, booking);
    booking.commitEvents();
  }

  async findByCustomerId(customerId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter((b) => b.customerId === customerId);
  }

  async findByProfessionalId(professionalId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (b) => b.professionalId === professionalId || !b.professionalId
    );
  }

  reconstitute(props: BookingProps): Booking {
    return Booking.reconstitute(props);
  }

  clear(): void {
    this.bookings.clear();
  }
}
