import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Typography } from '@taskpro/ui';
import { tokens } from '@taskpro/design-tokens';
import type { ServiceCategory } from '../ServiceCatalogService';

export interface CategoryChipProps {
  category: ServiceCategory;
  isSelected?: boolean;
  onPress: (category: ServiceCategory) => void;
}

export function CategoryChip({ category, isSelected = false, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={() => onPress(category)}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      style={[styles.container, isSelected && styles.selected]}
    >
      <Typography variant="bodyS">{category.name}</Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: tokens.radius.pill,
    borderWidth: tokens.borderWidth.hairline,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  selected: {
    backgroundColor: tokens.color.primary.light,
  },
});
