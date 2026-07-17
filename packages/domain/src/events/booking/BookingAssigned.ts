import type { BookingId, ProfessionalId } from '@taskpro/types';

export class BookingAssigned {
  readonly eventType = 'booking.booking.assigned' as const;

  constructor(
    public readonly bookingId: BookingId,
    public readonly professionalId: ProfessionalId
  ) {}
}
