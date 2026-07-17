import { useCallback, useState } from 'react';
import type { BookingDto, BookingId, ProfessionalId } from '@taskpro/types';
import { bookingService } from './FakeBookingService';

type ActionStatus = 'idle' | 'loading' | 'error';

interface UseBookingActionsResult {
  status: ActionStatus;
  error: Error | null;
  cancel: (id: BookingId) => Promise<BookingDto | undefined>;
  accept: (id: BookingId, professionalId: ProfessionalId) => Promise<BookingDto | undefined>;
  startTravel: (id: BookingId) => Promise<BookingDto | undefined>;
  arrive: (id: BookingId) => Promise<BookingDto | undefined>;
  startWork: (id: BookingId) => Promise<BookingDto | undefined>;
  completeWork: (id: BookingId) => Promise<BookingDto | undefined>;
  confirmPayment: (id: BookingId) => Promise<BookingDto | undefined>;
}

export function useBookingActions(): UseBookingActionsResult {
  const [status, setStatus] = useState<ActionStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(async <T>(action: () => Promise<T>): Promise<T | undefined> => {
    setStatus('loading');
    setError(null);
    try {
      const result = await action();
      setStatus('idle');
      return result;
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err : new Error('Action failed'));
      return undefined;
    }
  }, []);

  const cancel = useCallback((id: BookingId) => run(() => bookingService.cancelBooking(id)), [run]);
  const accept = useCallback(
    (id: BookingId, professionalId: ProfessionalId) =>
      run(() => bookingService.acceptBooking(id, professionalId)),
    [run]
  );
  const startTravel = useCallback(
    (id: BookingId) => run(() => bookingService.startTravel(id)),
    [run]
  );
  const arrive = useCallback((id: BookingId) => run(() => bookingService.arrive(id)), [run]);
  const startWork = useCallback((id: BookingId) => run(() => bookingService.startWork(id)), [run]);
  const completeWork = useCallback(
    (id: BookingId) => run(() => bookingService.completeWork(id)),
    [run]
  );
  const confirmPayment = useCallback(
    (id: BookingId) => run(() => bookingService.confirmPayment(id)),
    [run]
  );

  return {
    status,
    error,
    cancel,
    accept,
    startTravel,
    arrive,
    startWork,
    completeWork,
    confirmPayment,
  };
}
