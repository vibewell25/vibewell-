import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useTheme, ThemeProvider } from '../useTheme';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock matchMedia for dark mode detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Wrapper component for renderHook
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('useTheme hook', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('should initialize with system preference (light)', () => {
    // Mock system preference to light
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBe('light'); // The ThemeProvider initializes with the system preference
  });

  test('should initialize with system preference (dark)', () => {
    // Mock system preference to dark
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  test('should initialize with stored preference from localStorage', () => {
    // Set localStorage theme
    localStorageMock.getItem.mockReturnValue('dark');

    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  test('should toggle theme from light to dark', () => {
    // Set initial theme to light via localStorage
    localStorageMock.getItem.mockReturnValue('light');
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Initially light
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
    
    // Toggle to dark
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  test('should toggle theme from dark to light', () => {
    // Set initial theme to dark via localStorage
    localStorageMock.getItem.mockReturnValue('dark');
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Initially dark
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    
    // Toggle to light
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  test('should set theme to explicit value', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Set to dark explicitly
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    
    // Set to light explicitly
    act(() => {
      result.current.setTheme('light');
    });
    
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  test('should not change when setting same theme value', () => {
    // Initialize with dark theme
    localStorageMock.getItem.mockReturnValue('dark');
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Clear mock to check if setItem is called again
    localStorageMock.setItem.mockClear();
    
    // Set to dark again
    act(() => {
      result.current.setTheme('dark');
    });
    
    // Should remain dark but not call localStorage again
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  test('should remove theme from localStorage when set to system', () => {
    // Initialize with explicit theme
    localStorageMock.getItem.mockReturnValue('dark');
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Set to system preference
    act(() => {
      result.current.setTheme('system');
    });
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('theme');
  });

  test('should update theme when system preference changes', () => {
    // Start with light system preference and no stored theme
    localStorageMock.getItem.mockReturnValue(null);
    
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result, rerender } = renderHook(() => useTheme(), { wrapper });
    
    // Initially based on system preference (light)
    expect(result.current.theme).toBe('light'); // With no stored theme, it should use system preference
    
    // Change system preference to dark
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    // Force theme to system to respect system preference
    act(() => {
      result.current.setTheme('system');
    });
    
    // Trigger re-render to simulate preference change
    rerender();
    
    // Should now be dark
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });
}); 