import type { BreakpointTokens } from '../types';

/**
 * Breakpoint tokens.
 *
 * Source: TASKPRO-DS-001 §24
 */

export const breakpoints: BreakpointTokens = {
  phoneSmall: { min: 0, max: 359 },
  phone: { min: 360, max: 430 },
  largePhone: { min: 431, max: 599 },
  tablet: { min: 600, max: 839 },
  largeTablet: { min: 840, max: Infinity },
};
