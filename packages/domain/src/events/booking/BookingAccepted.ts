import type { BookingId, ProfessionalId } from '@taskpro/types';

export class BookingAccepted {
  readonly eventType = 'booking.booking.accepted' as const;

  constructor(
    public readonly bookingId: BookingId,
    public readonly professionalId: ProfessionalId
  ) {}
}
