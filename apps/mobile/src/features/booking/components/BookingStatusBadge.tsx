import React from 'react';
import { BookingStatus } from '@taskpro/types';
import { Badge } from '@taskpro/ui';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const statusLabels: Record<BookingStatus, string> = {
  [BookingStatus.Draft]: 'Borrador',
  [BookingStatus.Requested]: 'Solicitado',
  [BookingStatus.Accepted]: 'Aceptado',
  [BookingStatus.ProfessionalAssigned]: 'Técnico asignado',
  [BookingStatus.EnRoute]: 'En camino',
  [BookingStatus.Arrived]: 'Llegó',
  [BookingStatus.InProgress]: 'En progreso',
  [BookingStatus.Completed]: 'Completado',
  [BookingStatus.PaymentPending]: 'Pago pendiente',
  [BookingStatus.Paid]: 'Pagado',
  [BookingStatus.Closed]: 'Cerrado',
  [BookingStatus.Cancelled]: 'Cancelado',
  [BookingStatus.Expired]: 'Expirado',
  [BookingStatus.Rejected]: 'Rechazado',
  [BookingStatus.Failed]: 'Fallido',
};

const statusVariants: Record<BookingStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> =
  {
    [BookingStatus.Draft]: 'default',
    [BookingStatus.Requested]: 'info',
    [BookingStatus.Accepted]: 'info',
    [BookingStatus.ProfessionalAssigned]: 'info',
    [BookingStatus.EnRoute]: 'warning',
    [BookingStatus.Arrived]: 'warning',
    [BookingStatus.InProgress]: 'warning',
    [BookingStatus.Completed]: 'success',
    [BookingStatus.PaymentPending]: 'warning',
    [BookingStatus.Paid]: 'success',
    [BookingStatus.Closed]: 'default',
    [BookingStatus.Cancelled]: 'error',
    [BookingStatus.Expired]: 'error',
    [BookingStatus.Rejected]: 'error',
    [BookingStatus.Failed]: 'error',
  };

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  return <Badge label={statusLabels[status]} status={statusVariants[status]} />;
}
