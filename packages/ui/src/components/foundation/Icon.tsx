import React from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';
import { Typography } from './Typography';

export type IconSize = 'tiny' | 'small' | 'medium' | 'default' | 'large' | 'xl';

export interface IconProps {
  name: string;
  size?: IconSize;
  color?: string;
}

const iconSizeMap: Record<IconSize, number> = {
  tiny: tokens.size.icon.tiny,
  small: tokens.size.icon.small,
  medium: tokens.size.icon.medium,
  default: tokens.size.icon.default,
  large: tokens.size.icon.large,
  xl: tokens.size.icon.xl,
};

/**
 * Placeholder Icon component.
 *
 * DS-001/DS-002 specify an icon system but do not choose a concrete icon
 * library. This component exposes the contract (name, size, color) so
 * downstream code can consume it; the rendering strategy will be swapped when
 * an icon provider is selected in a later expedition.
 */
export function Icon({ name, size = 'default', color }: IconProps) {
  const theme = useTheme();
  const dimension = iconSizeMap[size];

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: color ?? theme.colors.icon,
          height: dimension,
          width: dimension,
        },
      ]}
      accessibilityRole="image"
      accessibilityLabel={name}
    >
      <Typography
        variant="caption"
        style={{ color: color ?? theme.colors.icon, fontSize: dimension * 0.6 }}
      >
        {name.slice(0, 1).toUpperCase()}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: tokens.radius.circle,
    borderWidth: tokens.borderWidth.hairline,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
