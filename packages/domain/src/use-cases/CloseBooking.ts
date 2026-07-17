import type { BookingId } from '@taskpro/types';
import { DomainErrorCode } from '@taskpro/types';
import { Booking } from '../aggregates/Booking';
import { DomainError } from '../errors';
import type { BookingRepository } from '../repositories/BookingRepository';

export class CloseBooking {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(bookingId: BookingId): Promise<Booking> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new DomainError(DomainErrorCode.NotFound, `Booking ${bookingId} not found`);
    }
    booking.close();
    await this.bookingRepository.save(booking);
    return booking;
  }
}
