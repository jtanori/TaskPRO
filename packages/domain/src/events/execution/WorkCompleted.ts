import type { BookingId } from '@taskpro/types';

export class WorkCompleted {
  readonly eventType = 'execution.work.completed' as const;

  constructor(
    public readonly bookingId: BookingId,
    public readonly taskId: string
  ) {}
}
