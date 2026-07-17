import type { BookingId, ProfessionalId } from '@taskpro/types';

export class ProfessionalDeparted {
  readonly eventType = 'booking.professional.departed' as const;

  constructor(
    public readonly bookingId: BookingId,
    public readonly professionalId: ProfessionalId
  ) {}
}
