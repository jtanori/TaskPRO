import type {
  AddressId,
  BookingId,
  ConversationId,
  MessageId,
  PayoutId,
  ProfessionalId,
  ReviewId,
  ServiceId,
  TransactionId,
  UserId,
} from '../ids';
import type {
  AnalyticsEventType,
  BookingStatus,
  Currency,
  Locale,
  UserRole,
  UserStatus,
  VerificationDocumentType,
  VerificationStatus,
} from '../enums';

export interface MoneyDto {
  amountMinor: number;
  currency: Currency;
}

export interface DurationDto {
  minutes: number;
}

export interface DistanceDto {
  meters: number;
}

export interface AddressDto {
  id: AddressId;
  userId: UserId;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

export interface RatingDto {
  value: number;
  max: number;
  precision: number;
}

export interface UserDto {
  id: UserId;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileDto {
  userId: UserId;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  locale: Locale;
  timezone: string;
  currency: Currency;
}

export interface ProfessionalDto {
  id: ProfessionalId;
  userId: UserId;
  bio?: string;
  yearsExperience: number;
  rating: RatingDto;
  reviewCount: number;
  travelRadiusMeters: number;
  verification: VerificationDto;
  isAvailable: boolean;
}

export interface ServiceDto {
  id: ServiceId;
  categoryId: string;
  name: string;
  description: string;
  estimatedDurationMinutes: number;
  basePrice: MoneyDto;
  isActive: boolean;
}

export interface BookingDto {
  id: BookingId;
  customerId: UserId;
  professionalId?: ProfessionalId;
  serviceId: ServiceId;
  status: BookingStatus;
  scheduledAt: string;
  address: AddressDto;
  price: MoneyDto;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewDimensionDto {
  dimension: string;
  rating: RatingDto;
}

export interface ReviewDto {
  id: ReviewId;
  bookingId: BookingId;
  reviewerId: UserId;
  revieweeId: ProfessionalId;
  dimensions: ReviewDimensionDto[];
  comment?: string;
  createdAt: string;
}

export interface VerificationDto {
  status: VerificationStatus;
  documentType?: VerificationDocumentType;
  documentUrl?: string;
  submittedAt?: string;
  verifiedAt?: string;
}

export interface MetricDto {
  name: string;
  value: number;
  unit?: string;
  change?: number;
  period: string;
}

export interface AnalyticsEventDto {
  type: AnalyticsEventType;
  properties: Record<string, unknown>;
  timestamp: string;
  userId?: UserId;
}

export interface MessageDto {
  id: MessageId;
  senderId: UserId;
  type: import('../enums').MessageType;
  content: string;
  sentAt: string;
}

export interface ConversationDto {
  id: ConversationId;
  participantIds: UserId[];
  messages: MessageDto[];
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationDto {
  id: import('../ids').NotificationId;
  userId: UserId;
  title: string;
  body: string;
  channel: import('../enums').NotificationChannel;
  status: import('../enums').NotificationStatus;
  createdAt: string;
  sentAt?: string;
}

export interface PaymentMethodDto {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
}

export interface PaymentDto {
  id: import('../ids').PaymentId;
  bookingId: BookingId;
  amount: MoneyDto;
  platformFee: MoneyDto;
  provider: import('../enums').PaymentProvider;
  providerPaymentId?: string;
  status: import('../enums').PaymentStatus;
  capturedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceDto {
  id: import('../ids').InvoiceId;
  bookingId: BookingId;
  items: { description: string; quantity: number; unitPrice: MoneyDto; total: MoneyDto }[];
  subtotal: MoneyDto;
  tax: MoneyDto;
  total: MoneyDto;
  issuedAt: string;
  paidAt?: string;
}

export interface PayoutDto {
  id: PayoutId;
  professionalId: ProfessionalId;
  amount: MoneyDto;
  status: 'pending' | 'in_transit' | 'paid' | 'failed';
  createdAt: string;
  paidAt?: string;
}

export interface TransactionDto {
  id: TransactionId;
  paymentId: import('../ids').PaymentId;
  type: 'capture' | 'refund' | 'payout' | 'fee';
  amount: MoneyDto;
  createdAt: string;
}
