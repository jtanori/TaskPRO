import {
  BookingStatus,
  createBookingId,
  createPaymentId,
  createProfessionalId,
  createServiceId,
  createTaskId,
  createUserId,
  Currency,
  ReviewDimension,
  VerificationDocumentType,
  VerificationStatus,
} from '@taskpro/types';
import { describe, expect, it } from 'vitest';
import { Address, Distance, Money } from '../../value-objects';
import { Professional } from '../../aggregates/Professional';
import {
  InMemoryBookingRepository,
  InMemoryProfessionalRepository,
  InMemoryReviewRepository,
} from '../../repositories';
import {
  AcceptBooking,
  ApproveProfessionalVerification,
  ArriveBooking,
  AssignProfessional,
  CloseBooking,
  CompleteWork,
  GetReviewsForProfessional,
  MarkBookingPaid,
  MarkPaymentPending,
  RequestBooking,
  StartTravel,
  StartWork,
  SubmitReview,
} from '../../use-cases';

function sampleAddress(): Address {
  return Address.create({
    street: 'Av. Reforma 123',
    city: 'Ciudad de México',
    state: 'CDMX',
    postalCode: '06600',
    country: 'MX',
  });
}

async function seedPaidBooking(bookingRepository: InMemoryBookingRepository): Promise<{
  bookingId: ReturnType<typeof createBookingId>;
  professionalId: ReturnType<typeof createProfessionalId>;
}> {
  const requestBooking = new RequestBooking(bookingRepository);
  const booking = await requestBooking.execute({
    customerId: createUserId('customer-1'),
    serviceId: createServiceId('service-1'),
    address: sampleAddress(),
    scheduledAt: new Date('2026-08-01T10:00:00Z'),
    price: Money.create(50000, Currency.MXN),
  });

  const professionalId = createProfessionalId('pro-1');
  await new AcceptBooking(bookingRepository).execute(booking.id, professionalId);
  await new AssignProfessional(bookingRepository).execute(booking.id, professionalId);
  await new StartTravel(bookingRepository).execute(booking.id);
  await new ArriveBooking(bookingRepository).execute(booking.id);
  await new StartWork(bookingRepository).execute(booking.id, createTaskId('task-1'));
  await new CompleteWork(bookingRepository).execute(booking.id);
  await new MarkPaymentPending(bookingRepository).execute(booking.id);
  await new MarkBookingPaid(bookingRepository).execute(booking.id, createPaymentId('pay-1'));
  await new CloseBooking(bookingRepository).execute(booking.id);

  expect(booking.status).toBe(BookingStatus.Closed);
  return { bookingId: booking.id, professionalId };
}

describe('Reviews', () => {
  it('submits a review for a completed booking and updates professional rating', async () => {
    const bookings = new InMemoryBookingRepository();
    const reviews = new InMemoryReviewRepository();
    const professionals = new InMemoryProfessionalRepository();

    const { bookingId, professionalId } = await seedPaidBooking(bookings);
    await professionals.save(
      Professional.create({
        id: professionalId,
        userId: createUserId('user-pro-1'),
        bio: 'Experienced technician',
        yearsExperience: 5,
        travelRadius: Distance.create(10000),
      })
    );

    await new SubmitReview(bookings, reviews, professionals).execute({
      bookingId,
      reviewerId: createUserId('customer-1'),
      revieweeId: professionalId,
      dimensions: [
        { dimension: ReviewDimension.Quality, rating: 5 },
        { dimension: ReviewDimension.Overall, rating: 4.5 },
      ],
      comment: 'Great service',
    });

    const professional = await professionals.findById(professionalId);
    expect(professional?.rating.value).toBe(4.5);
    expect(professional?.reviewCount).toBe(1);

    const review = await reviews.findByBookingId(bookingId);
    expect(review?.overallRating.value).toBe(4.5);
  });

  it('lists reviews for a professional', async () => {
    const bookings = new InMemoryBookingRepository();
    const reviews = new InMemoryReviewRepository();
    const professionals = new InMemoryProfessionalRepository();

    const { bookingId, professionalId } = await seedPaidBooking(bookings);
    await professionals.save(
      Professional.create({
        id: professionalId,
        userId: createUserId('user-pro-1'),
        yearsExperience: 3,
        travelRadius: Distance.create(5000),
      })
    );

    await new SubmitReview(bookings, reviews, professionals).execute({
      bookingId,
      reviewerId: createUserId('customer-1'),
      revieweeId: professionalId,
      dimensions: [{ dimension: ReviewDimension.Overall, rating: 5 }],
    });

    const found = await new GetReviewsForProfessional(reviews).execute(professionalId);
    expect(found).toHaveLength(1);
    expect(found[0]?.overallRating.value).toBe(5);
  });
});

describe('Professional verification', () => {
  it('approves a submitted verification', async () => {
    const professionals = new InMemoryProfessionalRepository();
    const professional = Professional.create({
      id: createProfessionalId('pro-1'),
      userId: createUserId('user-pro-1'),
      yearsExperience: 2,
      travelRadius: Distance.create(8000),
    });
    professional.submitVerification(
      VerificationDocumentType.GovernmentId,
      'https://docs.test/id.pdf'
    );
    await professionals.save(professional);

    await new ApproveProfessionalVerification(professionals).execute(professional.id);

    const updated = await professionals.findById(professional.id);
    expect(updated?.verification.status).toBe(VerificationStatus.Verified);
    expect(updated?.status).toBe('verified');
  });
});
