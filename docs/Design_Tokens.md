# Design Tokens

All design tokens are centralized in `packages/ui/core/theme`.

---

## 1. Color Palette

```typescript
// colors.ts
export const colors = {
  neutral: {
    50: '#F8F6F2',  // Primary background
    100: '#F1EEE9',
    200: '#E6DFDA', // Secondary backgrounds
    300: '#D2C9C0',
    400: '#B8ADA1',
    500: '#9E9183',
    600: '#847668',
    700: '#6A5D50',
    800: '#504537',
    900: '#2D3142'  // Primary text
  },
  coral: {
    50: '#FDF1EE',
    100: '#FAE3DD',
    200: '#F5C7BB',
    300: '#F0A999',
    400: '#EB8B77',
    500: '#E07A5F', // Main accent
    600: '#D65F40',
    700: '#C44A28',
    800: '#A33A1F',
    900: '#822E18'
  },
  teal: { /* ... similarly defined ... */ },
  blush: { /* ... */ },
  success: '#4BB543',
  warning: '#F0AD4E',
  error: '#DB4437',
  info: '#4285F4',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(45, 49, 66, 0.4)',
  text: {
    primary: '#2D3142',
    secondary: '#8D99AE',
    tertiary: '#B0B8C4',
    inverse: '#FFFFFF'
  }
};
```

**Dark Mode Overrides** (in `darkColors.ts`):

```typescript
export const darkColors = {
  neutral: { 50: '#2D3142', /* ... swapped */ 900: '#F8F6F2' },
  coral: { /* ... */ },
  /* rest mirrored as needed */
};
```

---

## 2. Semantic Colors

```typescript
// semanticColors.ts
import { colors } from './colors';

export const semanticColors = {
  background: {
    primary: colors.neutral[50],
    secondary: colors.neutral[100],
    tertiary: colors.neutral[200],
    inverse: colors.neutral[900]
  },
  button: {
    primary: {
      background: colors.coral[500],
      hover: colors.coral[600],
      active: colors.coral[700],
      text: colors.white
    },
    secondary: { /* ... */ },
    tertiary: { /* ... */ },
    danger: { /* ... */ },
    disabled: { background: colors.neutral[200], text: colors.text.tertiary }
  },
  border: {
    light: colors.neutral[200],
    focus: colors.coral[500],
    error: colors.error
  },
  status: { success: colors.success, warning: colors.warning, error: colors.error, info: colors.info },
  travel: { primary: colors.teal[500], accent: colors.coral[500] },
  beauty: { primary: colors.blush[500], accent: colors.coral[500] },
  wellness: { primary: colors.coral[500], accent: colors.teal[500] }
};
```

---

## 3. Typography

```typescript
// typography.ts
export const typography = {
  fontFamily: {
    primary: "'Outfit', sans-serif",
    secondary: "'DM Serif Display', serif",
    mono: "'JetBrains Mono', monospace"
  },
  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', md: '1.125rem',
    lg: '1.25rem', xl: '1.5rem', '2xl': '1.875rem', '3xl': '2.25rem',
    '4xl': '3rem', '5xl': '3.75rem'
  },
  fontWeight: { light: '300', normal: '400', medium: '500', bold: '700', black: '900' },
  lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.625' },
  letterSpacing: { tight: '-0.025em', normal: '0', wide: '0.025em' }
};
```

---

## 4. Spacing & Radius

```typescript
// spacing.ts
export const spacing = { 0: '0', px: '1px', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', /* up to 96: '24rem' */ };

// radius.ts
export const radius = { none: '0', sm: '0.125rem', md: '0.25rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem', full: '9999px' };
```

---

## 5. Shadows & Transitions

```typescript
// shadows.ts
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)'
};

// transitions.ts
export const transitions = {
  duration: { fastest: '50ms', normal: '200ms', slowest: '500ms' },
  easing: { easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)' }
};
```

---

## 6. Z-Index

```typescript
// zIndex.ts
export const zIndex = { hide: -1, base: 0, dropdown: 1000, modal: 1400, tooltip: 1800 };
```

---

## 7. Usage Examples

**Importing tokens in Web**:

```tsx
import { colors, semanticColors } from 'packages/ui/core/theme/colors';
```

**Importing in Native**:

```tsx
import { colors } from 'packages/ui/core/theme';
```

Apply via styled-components or inline styles.

**Visual Token Gallery** (Storybook token explorer screenshot)

---

*This document is cross-referenced by the UI Components Strategy, Design Mockups, and code implementations.* 