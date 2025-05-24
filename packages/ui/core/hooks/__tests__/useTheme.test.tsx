import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useTheme } from '../useTheme';

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

    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
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

    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });

  test('should initialize with stored preference from localStorage', () => {
    // Set localStorage theme
    localStorageMock.getItem.mockReturnValue('dark');

    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });

  test('should toggle theme from light to dark', () => {
    // Mock system preference to light
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useTheme());
    
    // Initially light
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
    
    // Toggle to dark
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('should toggle theme from dark to light', () => {
    // Mock system preference to dark
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useTheme());
    
    // Initially dark
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    
    // Toggle to light
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  test('should set theme to explicit value', () => {
    const { result } = renderHook(() => useTheme());
    
    // Set to dark explicitly
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
    // Set to light explicitly
    act(() => {
      result.current.setTheme('light');
    });
    
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  test('should not change when setting same theme value', () => {
    // Initialize with dark theme
    localStorageMock.getItem.mockReturnValue('dark');
    
    const { result } = renderHook(() => useTheme());
    
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
    
    const { result } = renderHook(() => useTheme());
    
    // Set to system preference
    act(() => {
      result.current.setTheme('system');
    });
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('theme');
  });

  test('should update theme when system preference changes', () => {
    // Start with light system preference
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result, rerender } = renderHook(() => useTheme());
    
    // Initially light
    expect(result.current.theme).toBe('light');
    
    // Change system preference to dark
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    // Trigger re-render to simulate preference change
    rerender();
    
    // Should now be dark
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });
}); 