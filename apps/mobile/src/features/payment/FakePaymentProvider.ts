import type { PaymentProvider } from '@taskpro/domain';
import type { Currency } from '@taskpro/types';
import type { Money } from '@taskpro/domain';

export class FakePaymentProvider implements PaymentProvider {
  async authorize(_amount: Money, _currency: Currency, metadata?: Record<string, unknown>) {
    return {
      providerPaymentId: `pi_fake_${Date.now()}_${metadata?.bookingId ?? 'unknown'}`,
    };
  }

  async capture(_providerPaymentId: string): Promise<void> {
    // Simulates a successful capture; real implementation would call Stripe.
  }

  async refund(_providerPaymentId: string, _amount: Money): Promise<void> {
    // Simulates a successful refund; real implementation would call Stripe.
  }
}
