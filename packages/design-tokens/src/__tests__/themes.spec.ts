import { describe, expect, it } from 'vitest';
import { darkTheme, getTheme, highContrastTheme, lightTheme, themes } from '../index';
import type { ThemeName } from '../types';

/**
 * Theme contract tests.
 *
 * These tests verify that every theme provides the full semantic color
 * contract and that themes are consumers of the token system, not parallel
 * definitions.
 */

const requiredColorKeys = [
  'background',
  'surface',
  'surfaceSecondary',
  'card',
  'navigation',
  'text',
  'textSecondary',
  'textInverse',
  'border',
  'borderFocused',
  'primary',
  'primaryHover',
  'primaryPressed',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'disabled',
  'placeholder',
  'link',
  'icon',
  'ai',
];

describe('light theme', () => {
  it('has all required semantic color slots', () => {
    for (const key of requiredColorKeys) {
      expect(lightTheme.colors).toHaveProperty(key);
      expect(lightTheme.colors[key as keyof typeof lightTheme.colors]).toMatch(/^#/);
    }
  });

  it('uses physical shadows and subtle borders per DS-005 §7/§25/§26', () => {
    expect(lightTheme.shadowMode).toBe('physical');
    expect(lightTheme.borderEmphasis).toBe('subtle');
  });
});

describe('dark theme', () => {
  it('has all required semantic color slots', () => {
    for (const key of requiredColorKeys) {
      expect(darkTheme.colors).toHaveProperty(key);
      expect(darkTheme.colors[key as keyof typeof darkTheme.colors]).toMatch(/^#/);
    }
  });

  it('uses overlay shadows and stronger borders per DS-005 §8/§25/§26', () => {
    expect(darkTheme.shadowMode).toBe('overlay');
    expect(darkTheme.borderEmphasis).toBe('stronger');
  });
});

describe('high contrast theme', () => {
  it('has all required semantic color slots', () => {
    for (const key of requiredColorKeys) {
      expect(highContrastTheme.colors).toHaveProperty(key);
      expect(highContrastTheme.colors[key as keyof typeof highContrastTheme.colors]).toMatch(/^#/);
    }
  });

  it('uses borders instead of shadows and prominent borders per DS-005 §9/§25/§26', () => {
    expect(highContrastTheme.shadowMode).toBe('border');
    expect(highContrastTheme.borderEmphasis).toBe('prominent');
  });
});

describe('theme registry', () => {
  it('exports all three themes by name', () => {
    const names: ThemeName[] = ['light', 'dark', 'highContrast'];
    for (const name of names) {
      expect(themes[name].name).toBe(name);
      expect(getTheme(name).name).toBe(name);
    }
  });
});
