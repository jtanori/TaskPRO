import type { Theme } from '../types';
import { accent, neutral, primary, secondary } from '../tokens/colors';

/**
 * Dark theme.
 *
 * Source: TASKPRO-DS-005 §8
 *
 * Local decision:
 * - DS-005 references `Blue400` for the dark primaryAccent; `Blue400` is not
 *   defined in DS-001. The theme uses the existing primary blue primitive.
 */

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: neutral.gray900,
    surface: neutral.gray800,
    surfaceSecondary: neutral.gray800,
    card: neutral.gray800,
    navigation: neutral.gray900,
    text: neutral.white,
    textSecondary: neutral.gray300,
    textInverse: neutral.gray900,
    border: neutral.gray700,
    borderFocused: primary.light,
    primary: primary.blue,
    primaryHover: primary.light,
    primaryPressed: primary.pressed,
    secondary: secondary.light,
    success: accent.success,
    warning: accent.warning,
    danger: accent.danger,
    info: primary.light,
    disabled: neutral.gray500,
    placeholder: neutral.gray500,
    link: primary.light,
    ai: accent.purpleAi,
    icon: neutral.gray300,
  },
  shadowMode: 'overlay',
  borderEmphasis: 'stronger',
};
