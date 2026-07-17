import type { SizeTokens } from '../types';

/**
 * Size tokens.
 *
 * Sources:
 * - TASKPRO-DS-001 §20 Icon Sizes
 * - TASKPRO-DS-001 §21 Avatar Sizes
 * - TASKPRO-DS-001 §22 Touch Targets
 * - TASKPRO-DS-001 §23 Component Heights
 */

export const size: SizeTokens = {
  icon: {
    tiny: 12,
    small: 16,
    medium: 20,
    default: 24,
    large: 32,
    xl: 40,
    illustration: 64,
    hero: 96,
  },
  avatar: {
    xs: 24,
    small: 32,
    medium: 40,
    large: 56,
    xl: 72,
    profile: 96,
  },
  touchTarget: {
    minimum: { width: 44, height: 44 },
    preferred: { width: 48, height: 48 },
    primaryButtonHeight: 56,
    floatingButton: 64,
  },
  component: {
    textInputHeight: 56,
    buttonHeight: 56,
    smallButtonHeight: 40,
    navigationBarHeight: 64,
    bottomTabHeight: 80,
    searchBarHeight: 56,
    listItemHeight: 72,
    cardMinHeight: 96,
  },
};
