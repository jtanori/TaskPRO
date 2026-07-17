import type { AddressId, BookingId, ProfessionalId, ServiceId, UserId } from '../ids';
import type { BookingStatus, Currency, Locale, UserRole, UserStatus } from '../enums';

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
  verificationStatus: string;
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
  id: string;
  bookingId: BookingId;
  reviewerId: UserId;
  revieweeId: UserId;
  dimensions: ReviewDimensionDto[];
  comment?: string;
  createdAt: string;
}
