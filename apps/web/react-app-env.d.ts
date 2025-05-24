/// <reference types="react-scripts" />
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Extend Window interface for PWA detection
interface Window {
  workbox: any;
}

// Make TypeScript ignore certain imports
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.webp'; 