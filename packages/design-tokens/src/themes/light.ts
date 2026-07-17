import type { Theme } from '../types';
import { accent, primary, secondary, semantic } from '../tokens/colors';

/**
 * Light theme.
 *
 * Source: TASKPRO-DS-005 §7
 *
 * Local decision:
 * - DS-005 references `Blue500` for primaryAccent; `Blue500` is not defined in
 *   DS-001, so the theme uses the existing primary blue primitive.
 */

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: semantic.surface.secondary,
    surface: semantic.surface.primary,
    surfaceSecondary: semantic.surface.secondary,
    card: semantic.surface.primary,
    navigation: semantic.surface.primary,
    text: semantic.text.primary,
    textSecondary: semantic.text.secondary,
    textInverse: semantic.text.inverse,
    border: semantic.border.default,
    borderFocused: semantic.border.focused,
    primary: primary.blue,
    primaryHover: primary.hover,
    primaryPressed: primary.pressed,
    secondary: secondary.teal,
    success: accent.success,
    warning: accent.warning,
    danger: accent.danger,
    info: primary.blue,
    disabled: semantic.text.disabled,
    placeholder: semantic.text.placeholder,
    link: semantic.text.link,
    ai: accent.purpleAi,
    icon: semantic.icon.primary,
  },
  shadowMode: 'physical',
  borderEmphasis: 'subtle',
};
