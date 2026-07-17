import type { Theme } from '../types';
import { accent, neutral } from '../tokens/colors';

/**
 * High-contrast accessibility theme.
 *
 * Source: TASKPRO-DS-005 §9
 *
 * Local decision:
 * - DS-005 specifies requirements only (WCAG AA/AAA contrast, stronger borders,
 *   increased separation, reduced transparency). Values are derived from the
 *   neutral palette to maximize contrast.
 */

export const highContrastTheme: Theme = {
  name: 'highContrast',
  colors: {
    background: neutral.white,
    surface: neutral.white,
    surfaceSecondary: neutral.white,
    card: neutral.white,
    navigation: neutral.white,
    text: neutral.black,
    textSecondary: neutral.black,
    textInverse: neutral.white,
    border: neutral.black,
    borderFocused: neutral.black,
    primary: neutral.black,
    primaryHover: neutral.black,
    primaryPressed: neutral.black,
    secondary: neutral.black,
    success: accent.success,
    warning: accent.warning,
    danger: accent.danger,
    info: neutral.black,
    disabled: neutral.gray700,
    placeholder: neutral.gray700,
    link: neutral.black,
    ai: accent.purpleAi,
    icon: neutral.black,
  },
  shadowMode: 'border',
  borderEmphasis: 'prominent',
};
