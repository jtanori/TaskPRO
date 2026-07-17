import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

export interface ButtonProps extends Pick<PressableProps, 'onPress' | 'disabled'> {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  accessibilityLabel?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  accessibilityLabel,
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const backgroundColor = {
    primary: theme.colors.primary,
    secondary: theme.colors.surfaceSecondary,
    ghost: 'transparent',
    destructive: tokens.color.accent.danger,
  }[variant];

  const textColor = {
    primary: theme.colors.textInverse,
    secondary: theme.colors.text,
    ghost: theme.colors.primary,
    destructive: theme.colors.textInverse,
  }[variant];

  const pressedBackground = {
    primary: theme.colors.primaryPressed,
    secondary: theme.colors.surface,
    ghost: tokens.color.primary.light,
    destructive: tokens.color.accent.danger,
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? pressedBackground : backgroundColor,
          borderColor: variant === 'ghost' ? theme.colors.border : 'transparent',
          opacity: isDisabled ? tokens.opacity.disabled : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontSize: tokens.typography.fontSize.bodyM,
              fontWeight: tokens.typography.fontWeight.semibold,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: tokens.radius.md,
    borderWidth: tokens.borderWidth.hairline,
    height: tokens.size.component.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.lg,
  },
  text: {
    textAlign: 'center',
  },
});
