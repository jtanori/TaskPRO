import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';

export type SearchBarProps = object;

export function SearchBar(_props: SearchBarProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
      ]}
      accessibilityRole="button"
      accessibilityLabel="SearchBar"
    >
      <Text style={[styles.label, { color: theme.colors.text }]}>SearchBar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: tokens.radius.md,
    borderWidth: tokens.borderWidth.hairline,
    padding: tokens.spacing.md,
  },
  label: {
    fontSize: tokens.typography.fontSize.bodyM,
  },
});
