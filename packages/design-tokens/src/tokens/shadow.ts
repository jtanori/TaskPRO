import type { ShadowTokens } from '../types';

/**
 * Shadow tokens.
 *
 * Source: TASKPRO-DS-001 §18
 *
 * Local decision:
 * - DS-001 lists shadow values as "x y blur / opacity" without explicit units.
 *   Units are interpreted as pixels and encoded as CSS-style shadow strings
 *   for cross-platform reuse.
 */

export const shadow: ShadowTokens = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.10)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.12)',
  md: '0 6px 12px rgba(0, 0, 0, 0.15)',
  lg: '0 12px 24px rgba(0, 0, 0, 0.18)',
  xl: '0 24px 48px rgba(0, 0, 0, 0.22)',
};
