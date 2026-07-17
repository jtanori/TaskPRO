import type { Brand } from '../branding';

export type UserId = Brand<string, 'UserId'>;
export type ProfileId = Brand<string, 'ProfileId'>;
export type ProfessionalId = Brand<string, 'ProfessionalId'>;
export type ServiceId = Brand<string, 'ServiceId'>;
export type CategoryId = Brand<string, 'CategoryId'>;
export type BookingId = Brand<string, 'BookingId'>;
export type TaskId = Brand<string, 'TaskId'>;
export type ConversationId = Brand<string, 'ConversationId'>;
export type MessageId = Brand<string, 'MessageId'>;
export type PaymentId = Brand<string, 'PaymentId'>;
export type InvoiceId = Brand<string, 'InvoiceId'>;
export type ReviewId = Brand<string, 'ReviewId'>;
export type NotificationId = Brand<string, 'NotificationId'>;
export type AttachmentId = Brand<string, 'AttachmentId'>;
export type AddressId = Brand<string, 'AddressId'>;
export type OrganizationId = Brand<string, 'OrganizationId'>;

export function createUserId(value: string): UserId {
  return value as UserId;
}

export function createProfileId(value: string): ProfileId {
  return value as ProfileId;
}

export function createProfessionalId(value: string): ProfessionalId {
  return value as ProfessionalId;
}

export function createServiceId(value: string): ServiceId {
  return value as ServiceId;
}

export function createCategoryId(value: string): CategoryId {
  return value as CategoryId;
}

export function createBookingId(value: string): BookingId {
  return value as BookingId;
}

export function createTaskId(value: string): TaskId {
  return value as TaskId;
}

export function createConversationId(value: string): ConversationId {
  return value as ConversationId;
}

export function createMessageId(value: string): MessageId {
  return value as MessageId;
}

export function createPaymentId(value: string): PaymentId {
  return value as PaymentId;
}

export function createInvoiceId(value: string): InvoiceId {
  return value as InvoiceId;
}

export function createReviewId(value: string): ReviewId {
  return value as ReviewId;
}

export function createNotificationId(value: string): NotificationId {
  return value as NotificationId;
}

export function createAttachmentId(value: string): AttachmentId {
  return value as AttachmentId;
}

export function createAddressId(value: string): AddressId {
  return value as AddressId;
}

export function createOrganizationId(value: string): OrganizationId {
  return value as OrganizationId;
}
