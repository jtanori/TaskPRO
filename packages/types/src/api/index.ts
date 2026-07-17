import type { BookingId, ProfessionalId, ServiceId, UserId } from '../ids';
import type { MoneyDto } from '../dto';

export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  userId: UserId;
  status: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  userId: UserId;
  accessToken: string;
  refreshToken: string;
}

export interface RequestBookingRequest {
  customerId: UserId;
  serviceId: ServiceId;
  addressId: string;
  scheduledAt: string;
  notes?: string;
}

export interface RequestBookingResponse {
  bookingId: BookingId;
  status: string;
}

export interface AcceptBookingRequest {
  bookingId: BookingId;
  professionalId: ProfessionalId;
}

export interface AcceptBookingResponse {
  bookingId: BookingId;
  status: string;
}

export interface CompleteWorkRequest {
  bookingId: BookingId;
  finalPrice?: MoneyDto;
}

export interface CompleteWorkResponse {
  bookingId: BookingId;
  status: string;
}

export interface SubmitReviewRequest {
  bookingId: BookingId;
  reviewerId: UserId;
  revieweeId: UserId;
  ratings: Record<string, number>;
  comment?: string;
}

export interface SubmitReviewResponse {
  reviewId: string;
}
