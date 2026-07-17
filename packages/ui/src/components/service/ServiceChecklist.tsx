import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';

export type ServiceChecklistProps = object;

export function ServiceChecklist(_props: ServiceChecklistProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
      ]}
      accessibilityRole="button"
      accessibilityLabel="ServiceChecklist"
    >
      <Text style={[styles.label, { color: theme.colors.text }]}>ServiceChecklist</Text>
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
