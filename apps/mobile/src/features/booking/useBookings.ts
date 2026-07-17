import { useCallback, useEffect, useState } from 'react';
import type { BookingDto, BookingId, ProfessionalId, UserId } from '@taskpro/types';
import { bookingService } from './FakeBookingService';

interface UseCustomerBookingsResult {
  bookings: BookingDto[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useCustomerBookings(customerId: UserId | undefined): UseCustomerBookingsResult {
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!customerId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await bookingService.getCustomerBookings(customerId);
      setBookings(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load bookings'));
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { bookings, isLoading, error, refresh };
}

interface UseTechnicianJobsResult {
  jobs: BookingDto[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useTechnicianJobs(
  technicianId: ProfessionalId | undefined
): UseTechnicianJobsResult {
  const [jobs, setJobs] = useState<BookingDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!technicianId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await bookingService.getTechnicianJobs(technicianId);
      setJobs(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load jobs'));
    } finally {
      setIsLoading(false);
    }
  }, [technicianId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { jobs, isLoading, error, refresh };
}

interface UseBookingDetailResult {
  booking: BookingDto | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useBookingDetail(id: BookingId | undefined): UseBookingDetailResult {
  const [booking, setBooking] = useState<BookingDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await bookingService.getBooking(id);
      setBooking(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load booking'));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { booking, isLoading, error, refresh };
}
