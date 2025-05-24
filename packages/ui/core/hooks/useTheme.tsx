import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

export type { Theme };

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme | 'system') => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ 
  children, 
  defaultTheme = 'light' 
}: { 
  children: ReactNode; 
  defaultTheme?: Theme;
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Try to get the theme from localStorage
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      // Check system preference
      const prefersDark = getSystemPreference();
      setThemeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme class to document
  useEffect(() => {
    // For web only
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
    
    // Store the theme preference
    storeTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  const setTheme = (newTheme: Theme | 'system') => {
    if (newTheme === 'system') {
      // Remove from storage and use system preference
      removeStoredTheme();
      const prefersDark = getSystemPreference();
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

// Helper functions
const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    // For web
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }
  
  return null;
};

const storeTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // For web
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.error('Error storing theme in localStorage:', error);
  }
};

const removeStoredTheme = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('theme');
  } catch (error) {
    console.error('Error removing theme from localStorage:', error);
  }
};

const getSystemPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    return false;
  }
};

// Export a separate version for React Native that uses AsyncStorage
export const createNativeThemeProvider = (AsyncStorage: any) => {
  return ({ 
    children, 
    defaultTheme = 'light' 
  }: { 
    children: ReactNode; 
    defaultTheme?: Theme;
  }) => {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const isDark = theme === 'dark';

    useEffect(() => {
      const loadTheme = async () => {
        try {
          // For React Native, use AsyncStorage
          const storedTheme = await AsyncStorage.getItem('theme') as Theme;
          
          if (storedTheme === 'light' || storedTheme === 'dark') {
            setThemeState(storedTheme);
          } else {
            // For React Native, check Appearance API
            const { Appearance } = require('react-native');
            const colorScheme = Appearance.getColorScheme();
            setThemeState(colorScheme === 'dark' ? 'dark' : 'light');
            
            // Subscribe to theme changes
            const subscription = Appearance.addChangeListener(({ colorScheme }: { colorScheme: string }) => {
              setThemeState(colorScheme === 'dark' ? 'dark' : 'light');
            });
            
            return () => subscription.remove();
          }
        } catch (error) {
          console.error('Error loading theme from AsyncStorage:', error);
        }
      };

      loadTheme();
    }, []);

    // Store theme when it changes
    useEffect(() => {
      const storeTheme = async () => {
        try {
          await AsyncStorage.setItem('theme', theme);
        } catch (error) {
          console.error('Error storing theme in AsyncStorage:', error);
        }
      };

      storeTheme();
    }, [theme]);

    const toggleTheme = () => {
      setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
    
    const setTheme = (newTheme: Theme | 'system') => {
      if (newTheme === 'system') {
        // Remove from storage and use system preference
        try {
          AsyncStorage.removeItem('theme');
          const { Appearance } = require('react-native');
          const colorScheme = Appearance.getColorScheme();
          setThemeState(colorScheme === 'dark' ? 'dark' : 'light');
        } catch (error) {
          console.error('Error with system theme:', error);
        }
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
};