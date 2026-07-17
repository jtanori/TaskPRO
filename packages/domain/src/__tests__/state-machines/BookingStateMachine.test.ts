import { BookingStatus } from '@taskpro/types';
import { describe, expect, it } from 'vitest';
import { BookingStateMachine } from '../../state-machines/BookingStateMachine';

describe('BookingStateMachine', () => {
  it('allows valid transition from Draft to Requested', () => {
    expect(BookingStateMachine.transition(BookingStatus.Draft, BookingStatus.Requested)).toBe(
      BookingStatus.Requested
    );
  });

  it('allows canonical happy path', () => {
    const path = [
      BookingStatus.Requested,
      BookingStatus.Accepted,
      BookingStatus.ProfessionalAssigned,
      BookingStatus.EnRoute,
      BookingStatus.Arrived,
      BookingStatus.InProgress,
      BookingStatus.Completed,
      BookingStatus.PaymentPending,
      BookingStatus.Paid,
      BookingStatus.Closed,
    ];

    let status = BookingStatus.Draft;

    for (const next of path) {
      status = BookingStateMachine.transition(status, next);
      expect(status).toBe(next);
    }
  });

  it('rejects invalid transition', () => {
    expect(() =>
      BookingStateMachine.transition(BookingStatus.Closed, BookingStatus.Paid)
    ).toThrow();
  });
});
