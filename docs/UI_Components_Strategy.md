# UI Components Strategy

This document defines the principles, core components, and development workflows for building the Vibewell UI across Web (Next.js) and Mobile (Expo React Native).

---

## 1. Design System Principles

1. **Consistency**

   * Unified neutral/coral palette, typography, spacing, shadows, transitions.
   * Single source of truth in `packages/ui/core/theme`.

2. **Accessibility**

   * WCAG 2.1 AA compliance.
   * Semantic HTML and ARIA roles/labels.
   * Keyboard navigation and visible focus states.
   * Automated axe-core tests in CI.

3. **Performance**

   * Lazy-load images and code-split at route-level.
   * Memoize components and hooks (`useMemo`, `useCallback`).
   * HTTP caching strategies (stale-while-revalidate).

4. **Extensibility**

   * Theming via CSS variables (web) and React context (native).
   * Feature flags (LaunchDarkly) to toggle component variants at runtime.

5. **Platform Appropriateness**

   * Web: Framer Motion for hover/tap micro-interactions.
   * Mobile: Reanimated 2 and Gesture Handler for smooth animations.

6. **Quality & Visual Regression**

   * Storybook with Chromatic for UI diffing.
   * Visual regression gating on pull requests.

7. **Dark Mode & Theming**

   * Detect `prefers-color-scheme`; override tokens for dark palette.
   * Manual toggle with preference persisted in local/AsyncStorage.

8. **Motion Reduction**

   * Respect `prefers-reduced-motion`; use simplified, instant transitions.

9. **PWA & Offline Support**

   * Service Worker for caching assets and API responses.
   * Background sync to queue actions (bookings, messages) while offline.
   * Offline UI states indicating cached data.

---

## 2. Core UI Components

### 2.1 BookingCard

```typescript
export interface BookingDestination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating?: number;
}
export interface BookingCardProps {
  destination: BookingDestination;
  onPress?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}
```

* **Web**: `next/image`, Tailwind hover/scale, ARIA on buttons.
* **Native**: `FastImage`, `TouchableOpacity`, safe-area insets.

### 2.2 ProductCard

```typescript
export interface Product { /*...*/ }
export interface ProductCardProps { /*...*/ }
```

* New badge, favorite toggle, add-to-cart button.
* Image scale animation on hover/tap.

### 2.3 ProfileCard

```typescript
export interface ProfileCardProps { /*...*/ }
```

* Gradient header, avatar overlap, edit button.
* Responsive layout for portrait/landscape.

### 2.4 NavigationBar

```typescript
export interface NavigationBarProps { /*...*/ }
```

* Transparent floating nav with backdrop blur.
* Auto-hide on scroll, safe-area padding.
* Dynamic badges for notifications.

### 2.5 TreatmentPlanCard

```typescript
export interface TreatmentPlanCardProps { /*...*/ }
```

* Preview of treatments, action buttons.
* Date formatting via `formatDate()`.

---

## 3. Component Variants & Theming

* **Dark Mode**: Token overrides in CSS variables and theme context.
* **Feature Flags**: Conditional rendering for beta UI.
* **PWA Install Banner**: `<InstallPWA />` component following tokens.

---

## 4. Development Workflow

1. **Storybook**

   ```bash
   pnpm storybook
   ```
2. **Unit & Integration Tests**

   ```bash
   pnpm test
   ```
3. **Visual Regression**

   * Chromatic configured in CI.
4. **Accessibility Audit**

   ```bash
   pnpm axe
   ```

All code must pass ESLint (Airbnb + TS), Prettier, and CI checks before merging.

---

## 5. Best Practices & Patterns

* **Atomic Design**: Atoms → Molecules → Organisms.
* **State Management**: Hooks & React Query; global only when necessary.
* **Error & Loading States**: Skeletons, spinners, toasts.

---

## 6. Diagrams & Visuals

```mermaid
flowchart LR
  A[BookingCard] --> B[ProductCard]
  B --> C[ProfileCard]
  C --> D[NavigationBar]
  D --> E[TreatmentPlanCard]
```

*(Include Storybook component atlas screenshot.)* 