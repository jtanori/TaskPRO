import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Card, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { bookingService } from '../FakeBookingService';

export default function RequestBookingScreen() {
  const { t } = useTranslation('booking');
  const router = useRouter();
  const { session } = useAuth();
  const { serviceId, serviceName, priceAmountMinor, currency } = useLocalSearchParams<{
    serviceId: string;
    serviceName: string;
    priceAmountMinor: string;
    currency: string;
  }>();

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('México');
  const [scheduledAt, setScheduledAt] = useState('2026-08-01T10:00');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!session) return;
    setIsSubmitting(true);
    try {
      const booking = await bookingService.requestBooking({
        customerId: session.user.id,
        serviceId,
        serviceName,
        scheduledAt: new Date(scheduledAt),
        address: { street, city, state, postalCode, country },
        priceAmountMinor: Number(priceAmountMinor),
        priceCurrency: currency,
        notes,
      });
      router.replace({ pathname: '/bookings/[id]', params: { id: booking.id } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('requestTitle')}</Typography>
      <Typography variant="bodyM" color="textSecondary">
        {serviceName}
      </Typography>

      <Card style={styles.card}>
        <TextInput label={t('street')} value={street} onChangeText={setStreet} />
        <TextInput label={t('city')} value={city} onChangeText={setCity} />
        <TextInput label={t('state')} value={state} onChangeText={setState} />
        <TextInput label={t('postalCode')} value={postalCode} onChangeText={setPostalCode} />
        <TextInput label={t('country')} value={country} onChangeText={setCountry} />
        <TextInput label={t('scheduledDate')} value={scheduledAt} onChangeText={setScheduledAt} />
        <TextInput
          label={t('notes')}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />

        <Button
          title={t('confirmRequest')}
          loading={isSubmitting}
          disabled={
            isSubmitting || !street || !city || !state || !postalCode || !country || !scheduledAt
          }
          onPress={() => void handleSubmit()}
        />
      </Card>
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
    gap: tokens.spacing.md,
  },
});
