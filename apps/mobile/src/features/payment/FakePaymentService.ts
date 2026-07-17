import {
  AuthorizePayment,
  CapturePayment,
  CreatePayout,
  InMemoryPaymentRepository,
  InMemoryPayoutRepository,
  Money,
} from '@taskpro/domain';
import {
  BookingStatus,
  Currency,
  type BookingDto,
  type InvoiceDto,
  type PayoutDto,
  type PaymentDto,
  type PaymentMethodDto,
  type UserId,
} from '@taskpro/types';
import { bookingService } from '../booking/FakeBookingService';
import { FakePaymentProvider } from './FakePaymentProvider';
import type { PaymentService } from './PaymentService';
import { toInvoiceDto } from './toInvoiceDto';
import { toPaymentDto } from './toPaymentDto';
import { toPayoutDto } from './toPayoutDto';

const PLATFORM_FEE_PERCENT = 0.15;

export class FakePaymentService implements PaymentService {
  private paymentRepository = new InMemoryPaymentRepository();
  private payoutRepository = new InMemoryPayoutRepository();
  private paymentProvider = new FakePaymentProvider();
  private authorizePayment = new AuthorizePayment(this.paymentRepository, this.paymentProvider);
  private capturePayment = new CapturePayment(this.paymentRepository, this.paymentProvider);
  private createPayout = new CreatePayout(this.payoutRepository);

  async getPaymentMethods(_userId: UserId): Promise<PaymentMethodDto[]> {
    return [
      {
        id: 'pm_fake_visa',
        brand: 'Visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2028,
      },
    ];
  }

  async getCheckout(
    bookingId: string
  ): Promise<{ payment: PaymentDto | null; invoice: InvoiceDto | null }> {
    const booking = await bookingService.getBooking(bookingId as BookingDto['id']);
    if (!booking) return { payment: null, invoice: null };

    const existing = await this.paymentRepository.findByBookingId(booking.id);
    const payment = existing ? toPaymentDto(existing) : null;
    const invoice = await toInvoiceDto(booking);
    return { payment, invoice };
  }

  async payBooking(bookingId: string, _userId: UserId): Promise<PaymentDto | null> {
    const booking = await bookingService.getBooking(bookingId as BookingDto['id']);
    if (!booking) return null;
    if (booking.status !== BookingStatus.PaymentPending) return null;

    const payment = await this.authorizePayment.execute({
      bookingId: booking.id,
      amount: Money.create(booking.price.amountMinor, booking.price.currency as Currency),
      currency: booking.price.currency as Currency,
    });

    const captured = await this.capturePayment.execute(payment.id);

    if (booking.professionalId) {
      await this.createPayout.execute({
        professionalId: booking.professionalId,
        grossAmount: Money.create(captured.amount.amountMinor, captured.amount.currency),
        platformFeePercent: PLATFORM_FEE_PERCENT,
      });
    }

    await bookingService.confirmPayment(booking.id);
    return toPaymentDto(captured);
  }

  async getEarnings(professionalId: string): Promise<PayoutDto[]> {
    const payouts = await this.payoutRepository.findByProfessionalId(
      professionalId as PayoutDto['professionalId']
    );
    return payouts.map(toPayoutDto);
  }
}

export const paymentService = new FakePaymentService();
