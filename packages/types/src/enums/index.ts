export enum UserRole {
  Customer = 'customer',
  Provider = 'provider',
  OrganizationAdmin = 'organization_admin',
  Administrator = 'administrator',
}

export enum UserStatus {
  Pending = 'pending',
  Active = 'active',
  Suspended = 'suspended',
  Deleted = 'deleted',
}

export enum ProfessionalStatus {
  PendingVerification = 'pending_verification',
  Verified = 'verified',
  Available = 'available',
  Busy = 'busy',
  Offline = 'offline',
  Suspended = 'suspended',
}

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
  Skipped = 'skipped',
}

export enum BookingStatus {
  Draft = 'draft',
  Requested = 'requested',
  Accepted = 'accepted',
  ProfessionalAssigned = 'professional_assigned',
  EnRoute = 'en_route',
  Arrived = 'arrived',
  InProgress = 'in_progress',
  Completed = 'completed',
  PaymentPending = 'payment_pending',
  Paid = 'paid',
  Closed = 'closed',
  Cancelled = 'cancelled',
  Expired = 'expired',
  Rejected = 'rejected',
  Failed = 'failed',
}

export enum PaymentStatus {
  Pending = 'pending',
  Authorized = 'authorized',
  Captured = 'captured',
  Failed = 'failed',
  Refunded = 'refunded',
  PartiallyRefunded = 'partially_refunded',
}

export enum PaymentProvider {
  Stripe = 'stripe',
  MercadoPago = 'mercado_pago',
}

export enum MessageType {
  Text = 'text',
  Photo = 'photo',
  Video = 'video',
  Location = 'location',
  File = 'file',
  SystemEvent = 'system_event',
}

export enum NotificationChannel {
  Push = 'push',
  Email = 'email',
  Sms = 'sms',
  InApp = 'in_app',
}

export enum NotificationStatus {
  Pending = 'pending',
  Delivered = 'delivered',
  Read = 'read',
  Failed = 'failed',
}

export enum EvidenceType {
  Photo = 'photo',
  Video = 'video',
  Document = 'document',
  Audio = 'audio',
  Signature = 'signature',
  Gps = 'gps',
  Timestamp = 'timestamp',
}

export enum ReviewDimension {
  Quality = 'quality',
  Professionalism = 'professionalism',
  Communication = 'communication',
  Punctuality = 'punctuality',
  Overall = 'overall',
}

export enum Currency {
  USD = 'USD',
  MXN = 'MXN',
}

export enum Locale {
  En = 'en',
  Es = 'es',
}
