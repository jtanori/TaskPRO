import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import type { BookingDto, ProfessionalId } from '@taskpro/types';
import { useAuth } from '../../auth';
import { BookingActionBar } from '../components/BookingActionBar';
import { BookingStatusBadge } from '../components/BookingStatusBadge';
import { BookingTimeline } from '../components/BookingTimeline';
import { useBookingDetail } from '../useBookings';

function formatMinor(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export default function TechnicianJobDetailScreen() {
  const { t } = useTranslation('booking');
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();
  const { booking, isLoading, refresh } = useBookingDetail(id as BookingDto['id']);

  if (isLoading || !booking) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('jobDetail')}</Typography>

      <Card style={styles.card}>
        <Typography variant="headingS">{booking.serviceId}</Typography>
        <BookingStatusBadge status={booking.status} />
        <Typography variant="bodyM" color="textSecondary">
          {formatMinor(booking.price.amountMinor, booking.price.currency)}
        </Typography>
        <Typography variant="bodyS" color="textSecondary">
          {new Date(booking.scheduledAt).toLocaleString('es-MX')}
        </Typography>
        <Typography variant="bodyS">{booking.address.street}</Typography>
        <Typography variant="bodyS">{`${booking.address.city}, ${booking.address.state}`}</Typography>
      </Card>

      <Card style={styles.card}>
        <Typography variant="headingS">{t('timeline')}</Typography>
        <BookingTimeline currentStatus={booking.status} />
      </Card>

      {session ? (
        <BookingActionBar
          booking={booking}
          role={session.user.role}
          actorId={session.user.id as unknown as ProfessionalId}
          onUpdated={() => {
            void refresh();
            router.replace(`/jobs/${booking.id}`);
          }}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  card: {
    gap: tokens.spacing.sm,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
