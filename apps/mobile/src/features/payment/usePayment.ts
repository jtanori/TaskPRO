import { useCallback, useEffect, useState } from 'react';
import type { InvoiceDto, PayoutDto, PaymentDto, PaymentMethodDto, UserId } from '@taskpro/types';
import { paymentService } from './FakePaymentService';

interface UseCheckoutResult {
  payment: PaymentDto | null;
  invoice: InvoiceDto | null;
  isLoading: boolean;
  error: Error | null;
  pay: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useCheckout(bookingId: string | undefined): UseCheckoutResult {
  const [payment, setPayment] = useState<PaymentDto | null>(null);
  const [invoice, setInvoice] = useState<InvoiceDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!bookingId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentService.getCheckout(bookingId);
      setPayment(result.payment);
      setInvoice(result.invoice);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load checkout'));
    } finally {
      setIsLoading(false);
    }
  }, [bookingId]);

  const pay = useCallback(async () => {
    if (!bookingId) return;
    setIsLoading(true);
    setError(null);
    try {
      await paymentService.payBooking(bookingId, '' as unknown as UserId);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Payment failed'));
    } finally {
      setIsLoading(false);
    }
  }, [bookingId, refresh]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { payment, invoice, isLoading, error, pay, refresh };
}

interface UsePaymentMethodsResult {
  methods: PaymentMethodDto[];
  isLoading: boolean;
  error: Error | null;
}

export function usePaymentMethods(): UsePaymentMethodsResult {
  // Placeholder until user-scoped payment methods are needed.
  return { methods: [], isLoading: false, error: null };
}

interface UseEarningsResult {
  payouts: PayoutDto[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useEarnings(professionalId: string | undefined): UseEarningsResult {
  const [payouts, setPayouts] = useState<PayoutDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!professionalId) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentService.getEarnings(professionalId);
      setPayouts(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load earnings'));
    } finally {
      setIsLoading(false);
    }
  }, [professionalId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { payouts, isLoading, error, refresh };
}
