import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';
import { tokens, type Theme } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';

export type TypographyVariant =
  | 'displayXl'
  | 'displayL'
  | 'displayM'
  | 'headingXl'
  | 'headingL'
  | 'headingM'
  | 'headingS'
  | 'bodyXl'
  | 'bodyL'
  | 'bodyM'
  | 'bodyS'
  | 'caption'
  | 'micro';

export type TypographyColor = keyof Theme['colors'];

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  children: React.ReactNode;
}

function parsePercentage(value: string): number {
  return parseFloat(value.replace('%', '')) / 100;
}

const lineHeightTokenForVariant: Record<TypographyVariant, string> = {
  displayXl: tokens.typography.lineHeight.display,
  displayL: tokens.typography.lineHeight.display,
  displayM: tokens.typography.lineHeight.display,
  headingXl: tokens.typography.lineHeight.headings,
  headingL: tokens.typography.lineHeight.headings,
  headingM: tokens.typography.lineHeight.headings,
  headingS: tokens.typography.lineHeight.headings,
  bodyXl: tokens.typography.lineHeight.body,
  bodyL: tokens.typography.lineHeight.body,
  bodyM: tokens.typography.lineHeight.body,
  bodyS: tokens.typography.lineHeight.body,
  caption: tokens.typography.lineHeight.caption,
  micro: tokens.typography.lineHeight.caption,
};

const letterSpacingTokenForVariant: Record<TypographyVariant, string> = {
  displayXl: tokens.typography.letterSpacing.display,
  displayL: tokens.typography.letterSpacing.display,
  displayM: tokens.typography.letterSpacing.display,
  headingXl: tokens.typography.letterSpacing.heading,
  headingL: tokens.typography.letterSpacing.heading,
  headingM: tokens.typography.letterSpacing.heading,
  headingS: tokens.typography.letterSpacing.heading,
  bodyXl: tokens.typography.letterSpacing.body,
  bodyL: tokens.typography.letterSpacing.body,
  bodyM: tokens.typography.letterSpacing.body,
  bodyS: tokens.typography.letterSpacing.body,
  caption: tokens.typography.letterSpacing.caption,
  micro: tokens.typography.letterSpacing.caption,
};

function computedLineHeight(variant: TypographyVariant): number {
  const fontSize = tokens.typography.fontSize[variant];
  return Math.round(fontSize * parsePercentage(lineHeightTokenForVariant[variant]));
}

function computedLetterSpacing(variant: TypographyVariant): number {
  const fontSize = tokens.typography.fontSize[variant];
  return Math.round(fontSize * parsePercentage(letterSpacingTokenForVariant[variant]));
}

export function Typography({
  variant = 'bodyM',
  color = 'text',
  children,
  style,
  ...rest
}: TypographyProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        styles.base,
        {
          color: theme.colors[color],
          fontSize: tokens.typography.fontSize[variant],
          lineHeight: computedLineHeight(variant),
          letterSpacing: computedLetterSpacing(variant),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: tokens.typography.fontFamily.primary,
  },
});
