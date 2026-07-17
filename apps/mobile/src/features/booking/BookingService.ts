import type { BookingDto, BookingId, ProfessionalId, UserId } from '@taskpro/types';

export interface RequestBookingInput {
  customerId: UserId;
  serviceId: string;
  serviceName: string;
  scheduledAt: Date;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    label?: string;
  };
  priceAmountMinor: number;
  priceCurrency: string;
  notes?: string;
}

export interface BookingService {
  requestBooking(input: RequestBookingInput): Promise<BookingDto>;
  getCustomerBookings(customerId: UserId): Promise<BookingDto[]>;
  getTechnicianJobs(technicianId: ProfessionalId): Promise<BookingDto[]>;
  getBooking(id: BookingId): Promise<BookingDto | null>;
  cancelBooking(id: BookingId): Promise<BookingDto>;
  acceptBooking(id: BookingId, professionalId: ProfessionalId): Promise<BookingDto>;
  startTravel(id: BookingId): Promise<BookingDto>;
  arrive(id: BookingId): Promise<BookingDto>;
  startWork(id: BookingId): Promise<BookingDto>;
  completeWork(id: BookingId): Promise<BookingDto>;
  confirmPayment(id: BookingId): Promise<BookingDto>;
}
