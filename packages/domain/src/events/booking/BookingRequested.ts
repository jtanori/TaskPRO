import type { BookingId, ServiceId, UserId } from '@taskpro/types';

export class BookingRequested {
  readonly eventType = 'booking.booking.requested' as const;

  constructor(
    public readonly bookingId: BookingId,
    public readonly customerId: UserId,
    public readonly serviceId: ServiceId
  ) {}
}
