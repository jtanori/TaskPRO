import type { ElevationTokens } from '../types';
import { shadow } from './shadow';

/**
 * Elevation tokens.
 *
 * Source: TASKPRO-DS-001 §17
 *
 * Local decision:
 * - Elevation levels are mapped to the shadow tokens defined in §18 and the
 *   z-index scale defined in §25 so components can consume a single elevation
 *   token rather than raw shadows or z-index values.
 */

export const elevation: ElevationTokens = {
  level0: { label: 'flat', shadow: 'none', zIndex: 0 },
  level1: { label: 'cards', shadow: shadow.sm, zIndex: 10 },
  level2: { label: 'dropdown', shadow: shadow.md, zIndex: 30 },
  level3: { label: 'bottomSheet', shadow: shadow.lg, zIndex: 50 },
  level4: { label: 'modal', shadow: shadow.xl, zIndex: 70 },
  level5: { label: 'toast', shadow: shadow.lg, zIndex: 60 },
};
