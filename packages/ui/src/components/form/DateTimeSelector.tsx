import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';

export type DateTimeSelectorProps = object;

export function DateTimeSelector(_props: DateTimeSelectorProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
      ]}
      accessibilityRole="button"
      accessibilityLabel="DateTimeSelector"
    >
      <Text style={[styles.label, { color: theme.colors.text }]}>DateTimeSelector</Text>
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
