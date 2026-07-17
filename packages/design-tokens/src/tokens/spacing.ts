import type { SpacingTokens } from '../types';

/**
 * Spacing tokens.
 *
 * Source: TASKPRO-DS-001 §13
 *
 * Local decision:
 * - Named aliases (xs, sm, md, lg, xl, xxl, xxxl) are mapped to the numeric
 *   scale because DS-001 does not assign names.
 */

const baseUnit = 4;

const scale: SpacingTokens['scale'] = [
  0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80, 96, 120,
];

export const spacing: SpacingTokens = {
  baseUnit,
  scale,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};
