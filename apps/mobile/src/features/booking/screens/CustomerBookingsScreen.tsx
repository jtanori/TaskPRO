import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Card, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { BookingStatusBadge } from '../components/BookingStatusBadge';
import { useCustomerBookings } from '../useBookings';

function formatMinor(amountMinor: number, currency: string): string {
  const major = (amountMinor / 100).toFixed(2);
  return `$${major} ${currency}`;
}

export default function CustomerBookingsScreen() {
  const { t } = useTranslation('booking');
  const router = useRouter();
  const { session } = useAuth();
  const { bookings, isLoading } = useCustomerBookings(session?.user.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('myBookings')}</Typography>

      {isLoading ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      ) : bookings.length === 0 ? (
        <Typography variant="bodyM" color="textSecondary">
          {t('noBookings')}
        </Typography>
      ) : (
        bookings.map((booking) => (
          <Pressable
            key={booking.id}
            onPress={() => router.push({ pathname: '/bookings/[id]', params: { id: booking.id } })}
          >
            <Card style={styles.card}>
              <Typography variant="headingS">{booking.serviceId}</Typography>
              <Typography variant="bodyS" color="textSecondary">
                {formatMinor(booking.price.amountMinor, booking.price.currency)}
              </Typography>
              <Typography variant="bodyS" color="textSecondary">
                {new Date(booking.scheduledAt).toLocaleString('es-MX')}
              </Typography>
              <BookingStatusBadge status={booking.status} />
            </Card>
          </Pressable>
        ))
      )}
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
    gap: tokens.spacing.xs,
  },
});
