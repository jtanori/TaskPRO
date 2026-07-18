import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BookingStatus, UserRole } from '@taskpro/types';
import type { BookingDto, ProfessionalId } from '@taskpro/types';
import { Button, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useBookingActions } from '../useBookingActions';

interface BookingActionBarProps {
  booking: BookingDto;
  role: UserRole;
  actorId: ProfessionalId;
  onUpdated: (booking: BookingDto) => void;
  onPay?: () => void;
  onReview?: () => void;
}

export function BookingActionBar({
  booking,
  role,
  actorId,
  onUpdated,
  onPay,
  onReview,
}: BookingActionBarProps) {
  const { t } = useTranslation('booking');
  const {
    status,
    error,
    cancel,
    accept,
    startTravel,
    arrive,
    startWork,
    completeWork,
    confirmPayment,
  } = useBookingActions();

  const handle = async (promise: Promise<BookingDto | undefined>) => {
    const updated = await promise;
    if (updated) onUpdated(updated);
  };

  const isCustomer = role === UserRole.Customer;
  const isTechnician = role === UserRole.Provider;

  return (
    <View style={styles.container}>
      {error ? (
        <Typography variant="bodyS" color="danger">
          {error.message}
        </Typography>
      ) : null}

      {isCustomer && booking.status === BookingStatus.Requested ? (
        <Button
          title={t('cancelBooking')}
          variant="destructive"
          loading={status === 'loading'}
          onPress={() => void handle(cancel(booking.id))}
        />
      ) : null}

      {isCustomer && booking.status === BookingStatus.PaymentPending ? (
        <Button
          title={t('payNow')}
          loading={status === 'loading'}
          onPress={() => (onPay ? onPay() : void handle(confirmPayment(booking.id)))}
        />
      ) : null}

      {isCustomer && booking.status === BookingStatus.Closed ? (
        <Button
          title={t('leaveReview')}
          loading={status === 'loading'}
          onPress={() => onReview?.()}
        />
      ) : null}

      {isTechnician && booking.status === BookingStatus.Requested ? (
        <Button
          title={t('acceptJob')}
          loading={status === 'loading'}
          onPress={() => void handle(accept(booking.id, actorId))}
        />
      ) : null}

      {isTechnician && booking.status === BookingStatus.ProfessionalAssigned ? (
        <Button
          title={t('startTravel')}
          loading={status === 'loading'}
          onPress={() => void handle(startTravel(booking.id))}
        />
      ) : null}

      {isTechnician && booking.status === BookingStatus.EnRoute ? (
        <Button
          title={t('arrive')}
          loading={status === 'loading'}
          onPress={() => void handle(arrive(booking.id))}
        />
      ) : null}

      {isTechnician && booking.status === BookingStatus.Arrived ? (
        <Button
          title={t('startWork')}
          loading={status === 'loading'}
          onPress={() => void handle(startWork(booking.id))}
        />
      ) : null}

      {isTechnician && booking.status === BookingStatus.InProgress ? (
        <Button
          title={t('completeWork')}
          loading={status === 'loading'}
          onPress={() => void handle(completeWork(booking.id))}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.md,
  },
});
