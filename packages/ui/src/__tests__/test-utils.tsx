import { cleanup, render as webRender, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach } from 'vitest';
import { ThemeProvider, type ThemeProviderProps } from '../theme/ThemeProvider';

afterEach(() => {
  cleanup();
});

export function renderWithTheme(
  ui: ReactElement,
  { theme = 'light', ...options }: RenderOptions & Pick<ThemeProviderProps, 'theme'> = {}
): ReturnType<typeof webRender> {
  return webRender(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
}
