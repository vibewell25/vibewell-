'use client';

import React from 'react';

// Button Component
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700 dark:bg-coral-600 dark:hover:bg-coral-500',
    secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600',
    tertiary: 'bg-transparent text-coral-500 hover:bg-neutral-100 active:bg-neutral-200 dark:text-coral-400 dark:hover:bg-neutral-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  };
  
  // Disabled styles
  const disabledStyles = 'bg-neutral-200 text-neutral-400 cursor-not-allowed dark:bg-neutral-700 dark:text-neutral-500';
  
  // Combine styles based on props and trim whitespace
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : variantStyles[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

// Export components
export * from './components/Card';

// Import and re-export AiSkinAnalysisCard
import { AiSkinAnalysisCard } from './components/AiSkinAnalysisCard';
export { AiSkinAnalysisCard };

// Import and re-export the enhanced BookingCard
import { BookingCard as EnhancedBookingCard } from './components/BookingCard';
export { EnhancedBookingCard as BookingCard };

// Import and re-export NavigationBar
import { NavigationBar } from './components/NavigationBar';
export { NavigationBar };

// Import and re-export Header
import { Header } from './components/Header';
export { Header };

// Import and re-export ProductCard
import { ProductCard } from './components/ProductCard';
export { ProductCard };

// Import and re-export Toast
import { Toast } from './components/Toast';
export { Toast };

// Import and re-export OfflineBanner
import { OfflineBanner } from './components/OfflineBanner';
export { OfflineBanner };

// Default export
export default {
  Button,
}; 