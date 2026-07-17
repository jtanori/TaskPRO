import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { tokens } from '@taskpro/design-tokens';
import { useTheme } from '../../theme/ThemeProvider';
import { Typography } from './Typography';

export type AvatarSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'profile';

export interface AvatarProps extends ViewProps {
  initials?: string;
  size?: AvatarSize;
}

const avatarSizeMap: Record<AvatarSize, number> = {
  xs: tokens.size.avatar.xs,
  small: tokens.size.avatar.small,
  medium: tokens.size.avatar.medium,
  large: tokens.size.avatar.large,
  xl: tokens.size.avatar.xl,
  profile: tokens.size.avatar.profile,
};

export function Avatar({ initials = '', size = 'medium', style, ...rest }: AvatarProps) {
  const theme = useTheme();
  const dimension = avatarSizeMap[size];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.border,
          borderRadius: tokens.radius.circle,
          height: dimension,
          width: dimension,
        },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={initials ? `Avatar for ${initials}` : 'Avatar'}
      {...rest}
    >
      <Typography variant="bodyS" color="textSecondary">
        {initials.slice(0, 2).toUpperCase()}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: tokens.borderWidth.hairline,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
