import React from 'react';
import { Platform, StyleSheet, View, type ViewProps } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style, ...rest }: CardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: tokens.radius.lg,
          ...Platform.select({
            web: {
              boxShadow:
                theme.shadowMode === 'physical' ? `0px 2px 4px ${theme.colors.text}1f` : undefined,
            },
            default: {
              shadowColor: theme.colors.text,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: theme.shadowMode === 'physical' ? 0.12 : 0,
              shadowRadius: 4,
              elevation: theme.shadowMode === 'physical' ? tokens.elevation.level1.zIndex : 0,
            },
          }),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: tokens.borderWidth.hairline,
    padding: tokens.spacing.md,
  },
});
