import type { AnimationTokens, MotionCurveTokens } from '../types';

/**
 * Animation and motion tokens.
 *
 * Source: TASKPRO-DS-001 §26–§27
 */

export const animation: AnimationTokens = {
  fast: 100,
  normal: 200,
  medium: 300,
  slow: 500,
  extraSlow: 800,
};

export const motion: MotionCurveTokens = {
  standard: 'ease-in-out',
  enter: 'ease-out',
  exit: 'ease-in',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};
