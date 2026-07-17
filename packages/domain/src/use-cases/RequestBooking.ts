import { BookingStatus, DomainErrorCode, type ServiceId, type UserId } from '@taskpro/types';
import { Address, Money } from '../value-objects';
import { Booking } from '../aggregates/Booking';
import type { BookingRepository } from '../repositories/BookingRepository';
import { DomainError } from '../errors';
import { createBookingId } from '@taskpro/types';

export interface RequestBookingInput {
  customerId: UserId;
  serviceId: ServiceId;
  address: Address;
  scheduledAt: Date;
  price: Money;
  notes?: string;
}

export class RequestBooking {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(input: RequestBookingInput): Promise<Booking> {
    const booking = Booking.create({
      id: createBookingId(`booking_${Date.now()}`),
      customerId: input.customerId,
      serviceId: input.serviceId,
      scheduledAt: input.scheduledAt,
      address: input.address,
      price: input.price,
      notes: input.notes,
    });

    booking.request();

    if (booking.status !== BookingStatus.Requested) {
      throw new DomainError(
        DomainErrorCode.InvariantViolation,
        'Booking was not transitioned to Requested'
      );
    }

    await this.bookingRepository.save(booking);
    return booking;
  }
}
