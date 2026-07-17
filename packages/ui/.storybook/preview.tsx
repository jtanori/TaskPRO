import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'TaskPRO visual theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'highContrast', title: 'High Contrast' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeName = context.globals.theme as 'light' | 'dark' | 'highContrast';
      return (
        <ThemeProvider theme={themeName}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
