import { describe, expect, it } from 'vitest';
import { createBookingId, createProfessionalId, Currency, PaymentStatus } from '@taskpro/types';
import { InMemoryPaymentRepository } from '../../repositories/InMemoryPaymentRepository';
import { InMemoryPayoutRepository } from '../../repositories/InMemoryPayoutRepository';
import { AuthorizePayment, CapturePayment, CreatePayout } from '../../use-cases';
import { Money } from '../../value-objects';

function createFakeProvider() {
  return {
    authorize: async () => ({ providerPaymentId: 'pi_test_123' }),
    capture: async () => {},
    refund: async () => {},
  };
}

describe('Payment processing', () => {
  it('authorizes a payment', async () => {
    const repository = new InMemoryPaymentRepository();
    const provider = createFakeProvider();
    const useCase = new AuthorizePayment(repository, provider);

    const payment = await useCase.execute({
      bookingId: createBookingId('booking-1'),
      amount: Money.create(10000, Currency.MXN),
      currency: Currency.MXN,
    });

    expect(payment.status).toBe(PaymentStatus.Authorized);
    expect(payment.providerPaymentId).toBe('pi_test_123');
  });

  it('captures an authorized payment', async () => {
    const repository = new InMemoryPaymentRepository();
    const provider = createFakeProvider();
    const authorize = new AuthorizePayment(repository, provider);
    const capture = new CapturePayment(repository, provider);

    const payment = await authorize.execute({
      bookingId: createBookingId('booking-1'),
      amount: Money.create(10000, Currency.MXN),
      currency: Currency.MXN,
    });

    const captured = await capture.execute(payment.id);
    expect(captured.status).toBe(PaymentStatus.Captured);
    expect(captured.capturedAt).toBeDefined();
  });

  it('creates a payout with platform fee deducted', async () => {
    const payoutRepository = new InMemoryPayoutRepository();
    const useCase = new CreatePayout(payoutRepository);

    const payout = await useCase.execute({
      professionalId: createProfessionalId('pro-1'),
      grossAmount: Money.create(10000, Currency.MXN),
      platformFeePercent: 0.15,
    });

    expect(payout.amount.amountMinor).toBe(8500);
    expect(payout.status).toBe('paid');
  });
});
