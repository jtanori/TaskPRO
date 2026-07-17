import {
  BookingStatus,
  createBookingId,
  createProfessionalId,
  createServiceId,
  createUserId,
  Currency,
} from '@taskpro/types';
import { describe, expect, it } from 'vitest';
import { Booking } from '../../aggregates/Booking';
import { Address, Money } from '../../value-objects';

describe('Booking', () => {
  const baseProps = {
    id: createBookingId('booking_1'),
    customerId: createUserId('user_1'),
    serviceId: createServiceId('service_1'),
    scheduledAt: new Date('2026-08-01T10:00:00Z'),
    address: Address.create({
      street: '123 Main St',
      city: 'City',
      state: 'State',
      postalCode: '12345',
      country: 'US',
    }),
    price: Money.create(5000, Currency.USD),
  };

  it('starts in Draft', () => {
    const booking = Booking.create(baseProps);
    expect(booking.status).toBe(BookingStatus.Draft);
  });

  it('transitions through happy path and emits events', () => {
    const booking = Booking.create(baseProps);
    booking.request();
    expect(booking.status).toBe(BookingStatus.Requested);

    booking.accept(createProfessionalId('prof_1'));
    expect(booking.status).toBe(BookingStatus.Accepted);

    booking.assign(createProfessionalId('prof_1'));
    expect(booking.status).toBe(BookingStatus.ProfessionalAssigned);

    booking.markEnRoute();
    expect(booking.status).toBe(BookingStatus.EnRoute);

    booking.markArrived();
    expect(booking.status).toBe(BookingStatus.Arrived);

    booking.startWork('task_1');
    expect(booking.status).toBe(BookingStatus.InProgress);

    booking.completeWork();
    expect(booking.status).toBe(BookingStatus.Completed);

    booking.markPaymentPending();
    expect(booking.status).toBe(BookingStatus.PaymentPending);

    booking.markPaid('payment_1');
    expect(booking.status).toBe(BookingStatus.Paid);

    booking.close();
    expect(booking.status).toBe(BookingStatus.Closed);

    expect(booking.getUncommittedEvents().length).toBeGreaterThan(0);
  });

  it('rejects invalid transition', () => {
    const booking = Booking.create(baseProps);
    expect(() => booking.close()).toThrow();
  });
});
