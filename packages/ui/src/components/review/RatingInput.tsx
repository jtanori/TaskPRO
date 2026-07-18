import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { Typography } from '../foundation/Typography';

export interface RatingInputProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
}

export function RatingInput({ value = 0, max = 5, onChange, label }: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value;

  return (
    <View style={styles.container} accessibilityLabel="RatingInput">
      {label && (
        <Typography variant="bodyM" color="textSecondary">
          {label}
        </Typography>
      )}
      <View style={styles.stars}>
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= displayValue;
          return (
            <Pressable
              key={starValue}
              onPressIn={() => setHoverValue(starValue)}
              onPressOut={() => setHoverValue(null)}
              onPress={() => onChange?.(starValue)}
              accessibilityLabel={`${starValue} estrellas`}
              accessibilityRole="button"
            >
              <Typography variant="headingM" color={filled ? 'warning' : 'textSecondary'}>
                ★
              </Typography>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.xs,
  },
  stars: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
});
