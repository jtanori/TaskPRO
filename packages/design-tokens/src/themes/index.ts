import type { Theme, ThemeName } from '../types';
import { darkTheme } from './dark';
import { highContrastTheme } from './highContrast';
import { lightTheme } from './light';

export * from './dark';
export * from './highContrast';
export * from './light';

export const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  highContrast: highContrastTheme,
};

export const themeNames: ThemeName[] = ['light', 'dark', 'highContrast'];

export function getTheme(name: ThemeName): Theme {
  return themes[name];
}
