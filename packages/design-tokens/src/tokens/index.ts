import { animation, motion } from './animation';
import { borderWidth } from './borderWidth';
import { breakpoints } from './breakpoints';
import { color } from './colors';
import { elevation } from './elevation';
import { layout } from './layout';
import { opacity } from './opacity';
import { radius } from './radius';
import { shadow } from './shadow';
import { size } from './size';
import { spacing } from './spacing';
import { typography } from './typography';
import { zIndex } from './zIndex';

export * from './animation';
export * from './borderWidth';
export * from './breakpoints';
export * from './colors';
export * from './elevation';
export * from './layout';
export * from './opacity';
export * from './radius';
export * from './shadow';
export * from './size';
export * from './spacing';
export * from './typography';
export * from './zIndex';

/**
 * The complete TaskPRO token contract.
 *
 * Downstream code should import named token groups (e.g., `color`, `spacing`)
 * or the full `tokens` object. No code outside this package should depend on
 * raw values.
 */
export const tokens = {
  color,
  typography,
  spacing,
  radius,
  borderWidth,
  shadow,
  elevation,
  opacity,
  size,
  layout,
  breakpoints,
  zIndex,
  animation,
  motion,
};
