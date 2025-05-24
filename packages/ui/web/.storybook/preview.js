import '../../../apps/web/app/globals.css';
import React from 'react';
import { ThemeProvider } from '@vibewell/ui-core';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#121212',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview; 