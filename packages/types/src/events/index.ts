import type { BookingId, MessageId, PaymentId, ProfessionalId, ReviewId, UserId } from '../ids';

export interface DomainEventDto {
  eventId: string;
  aggregateId: string;
  eventType: string;
  occurredAt: string;
  payload: unknown;
}

export interface UserRegisteredEvent {
  userId: UserId;
  email: string;
}

export interface BookingRequestedEvent {
  bookingId: BookingId;
  customerId: UserId;
  serviceId: string;
}

export interface BookingAssignedEvent {
  bookingId: BookingId;
  professionalId: ProfessionalId;
}

export interface BookingAcceptedEvent {
  bookingId: BookingId;
  professionalId: ProfessionalId;
}

export interface ProfessionalDepartedEvent {
  bookingId: BookingId;
  professionalId: ProfessionalId;
}

export interface ProfessionalArrivedEvent {
  bookingId: BookingId;
  professionalId: ProfessionalId;
}

export interface WorkStartedEvent {
  bookingId: BookingId;
  taskId: string;
}

export interface WorkCompletedEvent {
  bookingId: BookingId;
  taskId: string;
}

export interface PaymentCapturedEvent {
  paymentId: PaymentId;
  bookingId: BookingId;
  amountMinor: number;
  currency: string;
}

export interface InvoiceGeneratedEvent {
  invoiceId: string;
  bookingId: BookingId;
}

export interface ReviewSubmittedEvent {
  reviewId: ReviewId;
  bookingId: BookingId;
}

export interface MessageSentEvent {
  messageId: MessageId;
  conversationId: string;
  senderId: UserId;
}

export interface NotificationDeliveredEvent {
  notificationId: string;
  channel: string;
}
