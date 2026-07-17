import {
  BookingStatus,
  createPaymentId,
  createProfessionalId,
  createServiceId,
  createTaskId,
  createUserId,
  Currency,
} from '@taskpro/types';
import { describe, expect, it } from 'vitest';
import { Address, Money } from '../../value-objects';
import { InMemoryBookingRepository } from '../../repositories/InMemoryBookingRepository';
import {
  AcceptBooking,
  ArriveBooking,
  AssignProfessional,
  CloseBooking,
  CompleteWork,
  MarkBookingPaid,
  MarkPaymentPending,
  RequestBooking,
  StartTravel,
  StartWork,
} from '../../use-cases';

function createRepository(): InMemoryBookingRepository {
  return new InMemoryBookingRepository();
}

function sampleAddress(): Address {
  return Address.create({
    street: 'Av. Reforma 123',
    city: 'Ciudad de México',
    state: 'CDMX',
    postalCode: '06600',
    country: 'MX',
  });
}

async function seedRequestedBooking(repository: InMemoryBookingRepository) {
  const requestBooking = new RequestBooking(repository);
  const booking = await requestBooking.execute({
    customerId: createUserId('customer-1'),
    serviceId: createServiceId('service-1'),
    address: sampleAddress(),
    scheduledAt: new Date('2026-08-01T10:00:00Z'),
    price: Money.create(50000, Currency.MXN),
  });
  return booking;
}

describe('Booking lifecycle', () => {
  it('requests a booking', async () => {
    const repository = createRepository();
    const booking = await seedRequestedBooking(repository);
    expect(booking.status).toBe(BookingStatus.Requested);
    expect(await repository.findById(booking.id)).toBe(booking);
  });

  it('accepts and assigns a professional', async () => {
    const repository = createRepository();
    const booking = await seedRequestedBooking(repository);
    const professionalId = createProfessionalId('pro-1');

    await new AcceptBooking(repository).execute(booking.id, professionalId);
    expect(booking.status).toBe(BookingStatus.Accepted);

    await new AssignProfessional(repository).execute(booking.id, professionalId);
    expect(booking.status).toBe(BookingStatus.ProfessionalAssigned);
  });

  it('tracks technician travel, arrival, work, and completion', async () => {
    const repository = createRepository();
    const booking = await seedRequestedBooking(repository);
    const professionalId = createProfessionalId('pro-1');

    await new AcceptBooking(repository).execute(booking.id, professionalId);
    await new AssignProfessional(repository).execute(booking.id, professionalId);

    await new StartTravel(repository).execute(booking.id);
    expect(booking.status).toBe(BookingStatus.EnRoute);

    await new ArriveBooking(repository).execute(booking.id);
    expect(booking.status).toBe(BookingStatus.Arrived);

    await new StartWork(repository).execute(booking.id, createTaskId('task-1'));
    expect(booking.status).toBe(BookingStatus.InProgress);

    await new CompleteWork(repository).execute(booking.id);
    expect(booking.status).toBe(BookingStatus.Completed);
  });

  it('completes payment and closes the booking', async () => {
    const repository = createRepository();
    const booking = await seedRequestedBooking(repository);
    const professionalId = createProfessionalId('pro-1');

    await new AcceptBooking(repository).execute(booking.id, professionalId);
    await new AssignProfessional(repository).execute(booking.id, professionalId);
    await new StartTravel(repository).execute(booking.id);
    await new ArriveBooking(repository).execute(booking.id);
    await new StartWork(repository).execute(booking.id, createTaskId('task-1'));
    await new CompleteWork(repository).execute(booking.id);

    await new MarkPaymentPending(repository).execute(booking.id);
    expect(booking.status).toBe(BookingStatus.PaymentPending);

    await new MarkBookingPaid(repository).execute(booking.id, createPaymentId('pay-1'));
    expect(booking.status).toBe(BookingStatus.Paid);

    await new CloseBooking(repository).execute(booking.id);
    expect(booking.status).toBe(BookingStatus.Closed);
  });

  it('allows customer cancellation before acceptance', async () => {
    const repository = createRepository();
    const booking = await seedRequestedBooking(repository);
    booking.cancel();
    expect(booking.status).toBe(BookingStatus.Cancelled);
  });
});
