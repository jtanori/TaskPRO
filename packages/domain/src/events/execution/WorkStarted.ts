import type { BookingId } from '@taskpro/types';

export class WorkStarted {
  readonly eventType = 'execution.work.started' as const;

  constructor(
    public readonly bookingId: BookingId,
    public readonly taskId: string
  ) {}
}
