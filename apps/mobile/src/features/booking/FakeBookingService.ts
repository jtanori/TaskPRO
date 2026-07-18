import {
  createPaymentId,
  createServiceId,
  createTaskId,
  Currency,
  type BookingDto,
  type BookingId,
  type ProfessionalId,
  type UserId,
} from '@taskpro/types';
import {
  AcceptBooking,
  Address,
  ArriveBooking,
  AssignProfessional,
  CloseBooking,
  CompleteWork,
  InMemoryBookingRepository,
  MarkBookingPaid,
  MarkPaymentPending,
  Money,
  RequestBooking,
  StartTravel,
  StartWork,
} from '@taskpro/domain';
import type { BookingService, RequestBookingInput } from './BookingService';
import { toBookingDto } from './toBookingDto';

export const bookingRepository = new InMemoryBookingRepository();

export class FakeBookingService implements BookingService {
  private readonly repository = bookingRepository;

  async requestBooking(input: RequestBookingInput): Promise<BookingDto> {
    const requestBooking = new RequestBooking(this.repository);
    const booking = await requestBooking.execute({
      customerId: input.customerId,
      serviceId: createServiceId(input.serviceId),
      address: Address.create({
        street: input.address.street,
        city: input.address.city,
        state: input.address.state,
        postalCode: input.address.postalCode,
        country: input.address.country,
        label: input.address.label ?? 'Service address',
      }),
      scheduledAt: input.scheduledAt,
      price: Money.create(input.priceAmountMinor, input.priceCurrency as Currency),
      notes: input.notes,
    });
    return toBookingDto(booking);
  }

  async getCustomerBookings(customerId: UserId): Promise<BookingDto[]> {
    const bookings = await this.repository.findByCustomerId(customerId);
    return bookings.map(toBookingDto);
  }

  async getTechnicianJobs(technicianId: ProfessionalId): Promise<BookingDto[]> {
    const bookings = await this.repository.findByProfessionalId(technicianId);
    return bookings.map(toBookingDto);
  }

  async getBooking(id: BookingId): Promise<BookingDto | null> {
    const booking = await this.repository.findById(id);
    return booking ? toBookingDto(booking) : null;
  }

  async cancelBooking(id: BookingId): Promise<BookingDto> {
    const booking = await this.repository.findById(id);
    if (!booking) throw new Error('Booking not found');
    booking.cancel();
    await this.repository.save(booking);
    return toBookingDto(booking);
  }

  async acceptBooking(id: BookingId, professionalId: ProfessionalId): Promise<BookingDto> {
    const booking = await new AcceptBooking(this.repository).execute(id, professionalId);
    await new AssignProfessional(this.repository).execute(id, professionalId);
    return toBookingDto(booking);
  }

  async startTravel(id: BookingId): Promise<BookingDto> {
    const booking = await new StartTravel(this.repository).execute(id);
    return toBookingDto(booking);
  }

  async arrive(id: BookingId): Promise<BookingDto> {
    const booking = await new ArriveBooking(this.repository).execute(id);
    return toBookingDto(booking);
  }

  async startWork(id: BookingId): Promise<BookingDto> {
    const booking = await new StartWork(this.repository).execute(id, createTaskId(`task-${id}`));
    return toBookingDto(booking);
  }

  async completeWork(id: BookingId): Promise<BookingDto> {
    const booking = await new CompleteWork(this.repository).execute(id);
    await new MarkPaymentPending(this.repository).execute(id);
    return toBookingDto(booking);
  }

  async confirmPayment(id: BookingId): Promise<BookingDto> {
    const booking = await new MarkBookingPaid(this.repository).execute(
      id,
      createPaymentId(`pay-${id}`)
    );
    await new CloseBooking(this.repository).execute(id);
    return toBookingDto(booking);
  }
}

export const bookingService = new FakeBookingService();
