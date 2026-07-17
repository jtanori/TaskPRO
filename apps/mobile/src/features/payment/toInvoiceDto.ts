import type { BookingDto, InvoiceDto } from '@taskpro/types';
import { createInvoiceId } from '@taskpro/types';
import { serviceCatalog } from '../marketplace/FakeServiceCatalogService';

export async function toInvoiceDto(booking: BookingDto): Promise<InvoiceDto> {
  const service = await serviceCatalog.getServiceById(booking.serviceId);
  const subtotal = booking.price;
  const tax = { amountMinor: 0, currency: booking.price.currency };
  const total = {
    amountMinor: subtotal.amountMinor + tax.amountMinor,
    currency: subtotal.currency,
  };

  return {
    id: createInvoiceId(`inv_${booking.id}`),
    bookingId: booking.id,
    items: [
      {
        description: service?.name ?? 'Servicio',
        quantity: 1,
        unitPrice: subtotal,
        total: subtotal,
      },
    ],
    subtotal,
    tax,
    total,
    issuedAt: booking.createdAt,
  };
}
