import {
  createPaymentId,
  PaymentProvider as PaymentProviderEnum,
  type BookingId,
  type Currency,
} from '@taskpro/types';
import { Payment } from '../aggregates/Payment';
import { DomainError } from '../errors';
import { DomainErrorCode } from '@taskpro/types';
import type { PaymentRepository } from '../repositories/PaymentRepository';
import type { PaymentProvider } from '../services/PaymentProvider';
import type { Money } from '../value-objects';

export interface AuthorizePaymentInput {
  bookingId: BookingId;
  amount: Money;
  currency: Currency;
}

export class AuthorizePayment {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentProvider: PaymentProvider
  ) {}

  async execute(input: AuthorizePaymentInput) {
    const existing = await this.paymentRepository.findByBookingId(input.bookingId);
    if (existing) {
      throw new DomainError(
        DomainErrorCode.AlreadyExists,
        'Payment already exists for this booking'
      );
    }

    const authorization = await this.paymentProvider.authorize(input.amount, input.currency, {
      bookingId: input.bookingId,
    });

    const payment = Payment.create({
      id: createPaymentId(`pay_${Date.now()}`),
      bookingId: input.bookingId,
      amount: input.amount,
      provider: PaymentProviderEnum.Stripe,
    });

    payment.authorize(authorization.providerPaymentId);
    await this.paymentRepository.save(payment);
    return payment;
  }
}
