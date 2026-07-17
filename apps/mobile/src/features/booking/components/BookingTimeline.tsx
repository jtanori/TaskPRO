import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BookingStatus } from '@taskpro/types';
import { Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';

interface BookingTimelineProps {
  currentStatus: BookingStatus;
}

const orderedStatuses: BookingStatus[] = [
  BookingStatus.Requested,
  BookingStatus.Accepted,
  BookingStatus.ProfessionalAssigned,
  BookingStatus.EnRoute,
  BookingStatus.Arrived,
  BookingStatus.InProgress,
  BookingStatus.Completed,
  BookingStatus.PaymentPending,
  BookingStatus.Paid,
  BookingStatus.Closed,
];

const statusLabels: Record<BookingStatus, string> = {
  [BookingStatus.Draft]: 'Borrador',
  [BookingStatus.Requested]: 'Solicitado',
  [BookingStatus.Accepted]: 'Aceptado',
  [BookingStatus.ProfessionalAssigned]: 'Asignado',
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

export function BookingTimeline({ currentStatus }: BookingTimelineProps) {
  const currentIndex = orderedStatuses.indexOf(currentStatus);
  const isTerminal =
    currentStatus === BookingStatus.Cancelled ||
    currentStatus === BookingStatus.Expired ||
    currentStatus === BookingStatus.Rejected ||
    currentStatus === BookingStatus.Failed;

  return (
    <View style={styles.container}>
      {orderedStatuses.map((status, index) => {
        const isPast = index < currentIndex;
        const isCurrent = status === currentStatus;
        return (
          <View key={status} style={styles.row}>
            <View style={[styles.dot, isCurrent && styles.dotCurrent, isPast && styles.dotPast]} />
            <Typography
              variant="bodyS"
              color={isCurrent ? 'primary' : isPast ? 'textSecondary' : 'text'}
            >
              {statusLabels[status]}
            </Typography>
          </View>
        );
      })}
      {isTerminal ? (
        <View style={styles.row}>
          <View style={[styles.dot, styles.dotTerminal]} />
          <Typography variant="bodyS" color="danger">
            {statusLabels[currentStatus]}
          </Typography>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.sm,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  dot: {
    backgroundColor: tokens.color.neutral.gray300,
    borderRadius: tokens.radius.circle,
    height: 10,
    width: 10,
  },
  dotCurrent: {
    backgroundColor: tokens.color.primary.blue,
  },
  dotPast: {
    backgroundColor: tokens.color.semantic.status.success.background,
  },
  dotTerminal: {
    backgroundColor: tokens.color.semantic.status.error.background,
  },
});
