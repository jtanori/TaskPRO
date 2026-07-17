import React from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';
import { Typography } from './Typography';

export type BadgeStatus = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  label: string;
  status?: BadgeStatus;
}

export function Badge({ label, status = 'default' }: BadgeProps) {
  const theme = useTheme();

  const backgroundColor = {
    default: theme.colors.surfaceSecondary,
    success: tokens.color.semantic.status.success.background,
    warning: tokens.color.semantic.status.warning.background,
    error: tokens.color.semantic.status.error.background,
    info: tokens.color.semantic.status.info.background,
  }[status];

  const textColor = {
    default: theme.colors.text,
    success: tokens.color.semantic.status.success.text,
    warning: tokens.color.semantic.status.warning.text,
    error: tokens.color.semantic.status.error.text,
    info: tokens.color.semantic.status.info.text,
  }[status];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor: theme.colors.border,
          borderRadius: tokens.radius.pill,
        },
      ]}
      accessibilityRole="text"
    >
      <Typography variant="caption" style={{ color: textColor }}>
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: tokens.borderWidth.hairline,
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
  },
});
