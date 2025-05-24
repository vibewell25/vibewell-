'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 ${
        transparent 
          ? 'bg-transparent' 
          : 'bg-white/90 backdrop-blur-sm dark:bg-neutral-900/90 border-b border-neutral-200 dark:border-neutral-800'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">
          VibeWell
        </Link>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/services" 
              className="text-neutral-700 hover:text-coral-500 dark:text-neutral-300 dark:hover:text-coral-400 text-sm font-medium"
            >
              Services
            </Link>
            <Link 
              href="/products" 
              className="text-neutral-700 hover:text-coral-500 dark:text-neutral-300 dark:hover:text-coral-400 text-sm font-medium"
            >
              Products
            </Link>
            <Link 
              href="/analyze" 
              className="text-neutral-700 hover:text-coral-500 dark:text-neutral-300 dark:hover:text-coral-400 text-sm font-medium"
            >
              Skin Analysis
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Link 
              href="/profile" 
              className="p-2 text-neutral-700 hover:text-coral-500 dark:text-neutral-300 dark:hover:text-coral-400"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            
            <button 
              className="p-2 text-neutral-700 hover:text-coral-500 dark:text-neutral-300 dark:hover:text-coral-400 md:hidden"
              aria-label="Menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}; 