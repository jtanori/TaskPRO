import type { TypographyTokens } from '../types';

/**
 * Typography tokens.
 *
 * Source: TASKPRO-DS-001 §8–§12
 */

export const typography: TypographyTokens = {
  fontFamily: {
    primary: 'Inter',
    fallback: 'System',
  },
  fontSize: {
    displayXl: 40,
    displayL: 36,
    displayM: 32,
    headingXl: 28,
    headingL: 24,
    headingM: 20,
    headingS: 18,
    bodyXl: 18,
    bodyL: 16,
    bodyM: 15,
    bodyS: 14,
    caption: 12,
    micro: 10,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    display: '120%',
    headings: '130%',
    body: '150%',
    caption: '140%',
  },
  letterSpacing: {
    display: '-2%',
    heading: '-1%',
    body: '0%',
    caption: '2%',
  },
};
