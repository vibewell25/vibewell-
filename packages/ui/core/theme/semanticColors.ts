import { colors } from './colors';

export const semanticColors = {
  primary: {
    light: '#E07A5F', // coral.500
    dark: '#EB8B77', // coral.400 in dark mode
  },
  secondary: {
    light: '#00A1AF', // teal.500
    dark: '#33B4BF', // teal.400 in dark mode
  },
  accent: {
    light: '#F580AD', // blush.500
    dark: '#F799BD', // blush.400 in dark mode
  },
  background: {
    light: '#F8F6F2', // neutral.50
    dark: '#2D3142', // neutral.900 (inverted in dark mode)
  },
  card: {
    light: '#FFFFFF',
    dark: '#3D4155', // Slightly lighter than background in dark mode
  },
  text: {
    primary: {
      light: '#2D3142', // neutral.900
      dark: '#F8F6F2', // neutral.50 (inverted in dark mode)
    },
    secondary: {
      light: '#6A5D50', // neutral.700
      dark: '#A3ADC7', // neutral.700 (inverted in dark mode)
    },
    muted: {
      light: '#9E9183', // neutral.500
      dark: '#8189A1', // neutral.500 (inverted in dark mode)
    },
  },
  border: {
    light: '#E6DFDA', // neutral.200
    dark: '#4E5368', // neutral.200 (inverted in dark mode)
  },
  status: {
    success: {
      light: '#4BB543',
      dark: '#5BC560',
    },
    error: {
      light: '#FF3B30',
      dark: '#FF6B60',
    },
    warning: {
      light: '#FF9500',
      dark: '#FFB340',
    },
    info: {
      light: '#007AFF',
      dark: '#4098FF',
    },
  },
  button: {
    primary: {
      background: colors.coral[500],
      hover: colors.coral[600],
      active: colors.coral[700],
      text: colors.white
    },
    secondary: {
      background: colors.neutral[200],
      hover: colors.neutral[300],
      active: colors.neutral[400],
      text: colors.neutral[900]
    },
    tertiary: {
      background: 'transparent',
      hover: colors.neutral[100],
      active: colors.neutral[200],
      text: colors.coral[500]
    },
    danger: {
      background: colors.error,
      hover: '#C13C30',
      active: '#A73329',
      text: colors.white
    },
    disabled: { 
      background: colors.neutral[200], 
      text: colors.text.tertiary 
    }
  },
  travel: { 
    primary: colors.teal[500], 
    accent: colors.coral[500] 
  },
  beauty: { 
    primary: colors.blush[500], 
    accent: colors.coral[500] 
  },
  wellness: { 
    primary: colors.coral[500], 
    accent: colors.teal[500] 
  }
}; 