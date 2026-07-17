import { describe, expect, it } from 'vitest';
import { tokens } from '../index';

/**
 * Token contract tests.
 *
 * These tests verify that primitive values match TASKPRO-DS-001 and that the
 * public token API remains complete.
 */

describe('color tokens', () => {
  it('uses the DS-001 primary blue palette', () => {
    expect(tokens.color.primary.blue).toBe('#2563EB');
    expect(tokens.color.primary.hover).toBe('#1D4ED8');
    expect(tokens.color.primary.pressed).toBe('#1E40AF');
    expect(tokens.color.primary.light).toBe('#DBEAFE');
  });

  it('uses the DS-001 neutral palette', () => {
    expect(tokens.color.neutral.white).toBe('#FFFFFF');
    expect(tokens.color.neutral.gray900).toBe('#111827');
    expect(tokens.color.neutral.black).toBe('#000000');
  });

  it('uses the DS-001 accent palette', () => {
    expect(tokens.color.accent.success).toBe('#22C55E');
    expect(tokens.color.accent.danger).toBe('#EF4444');
    expect(tokens.color.accent.purpleAi).toBe('#8B5CF6');
  });

  it('resolves semantic surface colors from neutral primitives', () => {
    expect(tokens.color.semantic.surface.primary).toBe(tokens.color.neutral.white);
    expect(tokens.color.semantic.surface.secondary).toBe(tokens.color.neutral.gray50);
  });

  it('resolves semantic text colors from neutral primitives', () => {
    expect(tokens.color.semantic.text.primary).toBe(tokens.color.neutral.gray900);
    expect(tokens.color.semantic.text.link).toBe(tokens.color.primary.blue);
  });
});

describe('spacing tokens', () => {
  it('uses 4px as the base unit per DS-001 §13', () => {
    expect(tokens.spacing.baseUnit).toBe(4);
  });

  it('maps named aliases to the numeric scale', () => {
    expect(tokens.spacing.xs).toBe(4);
    expect(tokens.spacing.sm).toBe(8);
    expect(tokens.spacing.md).toBe(16);
    expect(tokens.spacing.lg).toBe(24);
    expect(tokens.spacing.xl).toBe(32);
  });
});

describe('radius tokens', () => {
  it('matches DS-001 §15', () => {
    expect(tokens.radius.xs).toBe(4);
    expect(tokens.radius.md).toBe(12);
    expect(tokens.radius.lg).toBe(16);
    expect(tokens.radius.pill).toBe(999);
    expect(tokens.radius.circle).toBe('50%');
  });
});

describe('typography tokens', () => {
  it('uses Inter as the primary font family per DS-001 §8', () => {
    expect(tokens.typography.fontFamily.primary).toBe('Inter');
  });

  it('matches the DS-001 font scale', () => {
    expect(tokens.typography.fontSize.headingL).toBe(24);
    expect(tokens.typography.fontSize.bodyM).toBe(15);
    expect(tokens.typography.fontSize.caption).toBe(12);
  });
});

describe('token contract completeness', () => {
  it('exports all top-level token categories', () => {
    const expectedKeys = [
      'color',
      'typography',
      'spacing',
      'radius',
      'borderWidth',
      'shadow',
      'elevation',
      'opacity',
      'size',
      'layout',
      'breakpoints',
      'zIndex',
      'animation',
      'motion',
    ];

    for (const key of expectedKeys) {
      expect(tokens).toHaveProperty(key);
    }
  });
});
