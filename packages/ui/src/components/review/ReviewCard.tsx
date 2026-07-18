import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ReviewDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { Card } from '../foundation/Card';
import { Typography } from '../foundation/Typography';

export interface ReviewCardProps {
  review: ReviewDto;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const overall = review.dimensions.find((dimension) => dimension.dimension === 'overall');
  const rating = overall?.rating ?? review.dimensions[0]?.rating;

  return (
    <Card style={styles.container} accessibilityLabel="ReviewCard">
      <View style={styles.header}>
        <Typography variant="headingS">{'⭐'.repeat(Math.round(rating?.value ?? 0))}</Typography>
        <Typography variant="bodyS" color="textSecondary">
          {new Date(review.createdAt).toLocaleDateString()}
        </Typography>
      </View>
      {review.comment && (
        <Typography variant="bodyM" color="text">
          {review.comment}
        </Typography>
      )}
      <Typography variant="bodyS" color="textSecondary">
        {review.dimensions.length} dimensiones evaluadas
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.sm,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
