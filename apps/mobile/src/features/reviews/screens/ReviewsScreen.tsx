import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { ReviewList, Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import { useReviews } from '../useReviews';

export default function ReviewsScreen() {
  const { t } = useTranslation('reviews');
  const { professionalId } = useLocalSearchParams<{ professionalId: string }>();
  const { reviews, isLoading } = useReviews(professionalId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyM" color="textSecondary">
          {t('common:loading')}
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Typography variant="headingL">{t('reviewsTitle')}</Typography>
      <ReviewList reviews={reviews} emptyLabel={t('noReviews')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
