'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme | 'system') => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Try to get the theme from localStorage
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Store the theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prevTheme => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

  const setTheme = (newTheme: Theme | 'system') => {
    if (newTheme === 'system') {
      // Remove from storage and use system preference
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    } else if (newTheme !== theme) {
      // Only update if different from current theme
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider; 