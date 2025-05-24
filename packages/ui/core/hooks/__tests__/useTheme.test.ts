import { renderHook, act } from '@testing-library/react';
import { useTheme, ThemeProvider } from '../useTheme';
import React from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock system preferences
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
    writable: true,
  });
};

describe('useTheme hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  test('detects system default (light) when no stored preference', () => {
    // Mock system preference as light mode
    mockMatchMedia(false);
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBe('light');
  });

  test('detects system default (dark) when no stored preference', () => {
    // Mock system preference as dark mode
    mockMatchMedia(true);
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBe('dark');
  });

  test('toggles theme via hook', () => {
    // Start with light theme
    mockMatchMedia(false);
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Initially light
    expect(result.current.theme).toBe('light');
    
    // Toggle to dark
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
    
    // Toggle back to light
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
  });

  test('directly sets theme via setTheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    act(() => {
      result.current.setTheme('dark');
    });
    expect(result.current.theme).toBe('dark');
    
    act(() => {
      result.current.setTheme('light');
    });
    expect(result.current.theme).toBe('light');
  });

  test('persists theme in localStorage', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Set theme to dark
    act(() => {
      result.current.setTheme('dark');
    });
    
    // Check if localStorage was updated
    expect(localStorageMock.getItem('vibewell-theme')).toBe('dark');
    
    // Set theme to light
    act(() => {
      result.current.setTheme('light');
    });
    
    // Check if localStorage was updated
    expect(localStorageMock.getItem('vibewell-theme')).toBe('light');
  });

  test('uses stored theme from localStorage', () => {
    // Set stored theme
    localStorageMock.setItem('vibewell-theme', 'dark');
    
    // System preference as light (should be ignored)
    mockMatchMedia(false);
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    );
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Should use dark from localStorage
    expect(result.current.theme).toBe('dark');
  });
}); 