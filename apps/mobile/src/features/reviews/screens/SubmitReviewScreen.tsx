import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Card, RatingInput, TextInput, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useAuth } from '../../auth';
import { useBookingDetail } from '../../booking/useBookings';
import { useSubmitReview } from '../useReviews';

export default function SubmitReviewScreen() {
  const { t } = useTranslation('reviews');
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();
  const { booking, isLoading } = useBookingDetail(id as import('@taskpro/types').BookingId);
  const { submit, isSubmitting } = useSubmitReview();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (isLoading || !booking) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  const handleSubmit = async () => {
    if (!session?.user.id || !booking.professionalId) return;
    await submit({
      bookingId: booking.id,
      reviewerId: session.user.id,
      revieweeId: booking.professionalId,
      overallRating: rating,
      comment,
    });
    router.replace(`/bookings/${booking.id}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="headingL">{t('leaveReview')}</Typography>
      <Card style={styles.card}>
        <Typography variant="bodyM" color="textSecondary">
          {t('bookingLabel')}: {booking.serviceId}
        </Typography>
        <RatingInput value={rating} onChange={setRating} label={t('ratingLabel')} />
        <TextInput
          label={t('commentLabel')}
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
        />
        <Button
          title={t('submit')}
          loading={isSubmitting}
          disabled={rating === 0}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
