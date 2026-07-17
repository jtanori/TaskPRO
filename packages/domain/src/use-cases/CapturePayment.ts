import { DomainErrorCode, type PaymentId } from '@taskpro/types';
import { DomainError } from '../errors';
import type { PaymentRepository } from '../repositories/PaymentRepository';
import type { PaymentProvider } from '../services/PaymentProvider';

export class CapturePayment {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentProvider: PaymentProvider
  ) {}

  async execute(paymentId: PaymentId) {
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      throw new DomainError(DomainErrorCode.NotFound, 'Payment not found');
    }

    if (!payment.providerPaymentId) {
      throw new DomainError(DomainErrorCode.InvariantViolation, 'Payment has not been authorized');
    }

    await this.paymentProvider.capture(payment.providerPaymentId);
    payment.capture();
    await this.paymentRepository.save(payment);
    return payment;
  }
}
