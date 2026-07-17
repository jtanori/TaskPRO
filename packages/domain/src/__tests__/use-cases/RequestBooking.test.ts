import { createServiceId, createUserId, Currency } from '@taskpro/types';
import { describe, expect, it } from 'vitest';
import { Booking } from '../../aggregates/Booking';
import { Address, Money } from '../../value-objects';
import { RequestBooking } from '../../use-cases/RequestBooking';
import { InMemoryBookingRepository } from '../repositories/InMemoryBookingRepository';

describe('RequestBooking use case', () => {
  it('creates and persists a requested booking', async () => {
    const repository = new InMemoryBookingRepository();
    const useCase = new RequestBooking(repository);

    const booking = await useCase.execute({
      customerId: createUserId('user_1'),
      serviceId: createServiceId('service_1'),
      address: Address.create({
        street: '123 Main St',
        city: 'City',
        state: 'State',
        postalCode: '12345',
        country: 'US',
      }),
      scheduledAt: new Date('2026-08-01T10:00:00Z'),
      price: Money.create(5000, Currency.USD),
    });

    expect(booking).toBeInstanceOf(Booking);
    expect(await repository.findById(booking.id)).toBe(booking);
  });
});
