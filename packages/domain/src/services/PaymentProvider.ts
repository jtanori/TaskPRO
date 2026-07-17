import type { Currency } from '@taskpro/types';
import type { Money } from '../value-objects';

export interface AuthorizationResult {
  providerPaymentId: string;
}

export interface PaymentProvider {
  authorize(
    amount: Money,
    currency: Currency,
    metadata?: Record<string, unknown>
  ): Promise<AuthorizationResult>;
  capture(providerPaymentId: string): Promise<void>;
  refund(providerPaymentId: string, amount: Money): Promise<void>;
}
