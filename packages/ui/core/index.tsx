import React from 'react';
import { ThemeProvider as OriginalThemeProvider, useTheme, Theme } from './hooks/useTheme';

// Re-export the useTheme hook and Theme type
export { useTheme, type Theme };

// Create a properly typed ThemeProvider
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: Theme;
}> = ({ children, defaultTheme }) => {
  return <OriginalThemeProvider defaultTheme={defaultTheme}>{children}</OriginalThemeProvider>;
}; 