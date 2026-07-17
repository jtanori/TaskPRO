import type { BookingId, ProfessionalId } from '@taskpro/types';

export class ProfessionalArrived {
  readonly eventType = 'booking.professional.arrived' as const;

  constructor(
    public readonly bookingId: BookingId,
    public readonly professionalId: ProfessionalId
  ) {}
}
