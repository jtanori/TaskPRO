import type { ColorTokens } from '../types';

/**
 * Primitive and semantic color tokens.
 *
 * Sources:
 * - TASKPRO-DS-001 §4 Color System
 * - TASKPRO-DS-001 §5 Neutral Palette
 * - TASKPRO-DS-001 §6 Semantic Colors
 * - TASKPRO-DS-001 §7 Status Colors
 *
 * Local decisions:
 * - Status colors (success, warning, error, info) use the defined accent
 *   primitives because DS-001 references undefined aliases such as
 *   Green100/Green300/Green700, Yellow, Red, and Blue.
 * - AI palette placeholders are intentionally omitted pending defined
 *   primitives in DS-001.
 */

export const primary: ColorTokens['primary'] = {
  blue: '#2563EB',
  hover: '#1D4ED8',
  pressed: '#1E40AF',
  light: '#DBEAFE',
};

export const secondary: ColorTokens['secondary'] = {
  teal: '#14B8A6',
  light: '#CCFBF1',
  dark: '#0F766E',
};

export const accent: ColorTokens['accent'] = {
  orange: '#F97316',
  warning: '#F59E0B',
  success: '#22C55E',
  danger: '#EF4444',
  purpleAi: '#8B5CF6',
};

export const neutral: ColorTokens['neutral'] = {
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
};

export const semantic: ColorTokens['semantic'] = {
  surface: {
    primary: neutral.white,
    secondary: neutral.gray50,
    tertiary: neutral.gray100,
    modal: neutral.white,
    inverse: neutral.gray900,
  },
  text: {
    primary: neutral.gray900,
    secondary: neutral.gray700,
    tertiary: neutral.gray500,
    disabled: neutral.gray400,
    inverse: neutral.white,
    placeholder: neutral.gray400,
    link: primary.blue,
  },
  border: {
    default: neutral.gray200,
    focused: primary.blue,
    error: accent.danger,
    disabled: neutral.gray200,
  },
  icon: {
    primary: neutral.gray800,
    secondary: neutral.gray500,
    disabled: neutral.gray300,
    brand: primary.blue,
    success: accent.success,
    warning: accent.orange,
    danger: accent.danger,
    ai: accent.purpleAi,
  },
  status: {
    success: {
      background: accent.success,
      text: accent.success,
      border: accent.success,
    },
    warning: {
      background: accent.warning,
      text: accent.warning,
      border: accent.warning,
    },
    error: {
      background: accent.danger,
      text: accent.danger,
      border: accent.danger,
    },
    info: {
      background: primary.blue,
      text: primary.blue,
      border: primary.blue,
    },
    pending: accent.orange,
    offline: neutral.gray500,
  },
};

export const color: ColorTokens = {
  primary,
  secondary,
  accent,
  neutral,
  semantic,
};
