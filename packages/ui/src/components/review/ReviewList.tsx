import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { ReviewDto } from '@taskpro/types';
import { tokens } from '@taskpro/design-tokens';
import { ReviewCard } from './ReviewCard';
import { Typography } from '../foundation/Typography';

export interface ReviewListProps {
  reviews: ReviewDto[];
  emptyLabel?: string;
}

export function ReviewList({ reviews, emptyLabel = 'Sin reseñas aún' }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <View style={styles.empty} accessibilityLabel="ReviewList">
        <Typography variant="bodyM" color="textSecondary">
          {emptyLabel}
        </Typography>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(review) => review.id}
      renderItem={({ item }) => <ReviewCard review={item} />}
      contentContainerStyle={styles.list}
      accessibilityLabel="ReviewList"
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    padding: tokens.spacing.md,
  },
  list: {
    gap: tokens.spacing.md,
  },
});
