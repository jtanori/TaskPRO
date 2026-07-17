import React, { createContext, useContext } from 'react';
import { getTheme, type Theme, type ThemeName } from '@taskpro/design-tokens';

const ThemeContext = createContext<Theme>(getTheme('light'));

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeName | Theme;
}

export function ThemeProvider({ children, theme = 'light' }: ThemeProviderProps) {
  const value = typeof theme === 'string' ? getTheme(theme) : theme;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
