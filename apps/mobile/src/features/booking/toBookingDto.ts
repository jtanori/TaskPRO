import { createAddressId } from '@taskpro/types';
import type { AddressDto, BookingDto } from '@taskpro/types';
import { Booking } from '@taskpro/domain';

export function toBookingDto(booking: Booking): BookingDto {
  const address: AddressDto = {
    id: createAddressId('addr-' + booking.address.label.toLowerCase().replace(/\s+/g, '-')),
    userId: booking.customerId,
    label: booking.address.label,
    street: booking.address.street,
    city: booking.address.city,
    state: booking.address.state,
    postalCode: booking.address.postalCode,
    country: booking.address.country,
    latitude: booking.address.latitude,
    longitude: booking.address.longitude,
    isDefault: true,
  };

  return {
    id: booking.id,
    customerId: booking.customerId,
    professionalId: booking.professionalId,
    serviceId: booking.serviceId,
    status: booking.status,
    scheduledAt: booking.scheduledAt.toISOString(),
    address,
    price: {
      amountMinor: booking.price.amountMinor,
      currency: booking.price.currency,
    },
    notes: booking.notes,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
}
