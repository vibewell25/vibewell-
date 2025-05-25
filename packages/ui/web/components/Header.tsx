'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeaderProps {
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const headerClass = scrolled || !transparent
    ? 'bg-white/95 backdrop-blur-lg dark:bg-neutral-900/95 border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-sm'
    : 'bg-transparent';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-neutral-900 dark:text-white">
          VibeWell
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link 
            href="/services" 
            className="text-neutral-800 dark:text-neutral-200 hover:text-[#E07A5F] dark:hover:text-[#F0A999] text-sm font-medium transition-colors"
          >
            Services
          </Link>
          <Link 
            href="/products" 
            className="text-neutral-800 dark:text-neutral-200 hover:text-[#E07A5F] dark:hover:text-[#F0A999] text-sm font-medium transition-colors"
          >
            Products
          </Link>
          <Link 
            href="/analyze" 
            className="text-neutral-800 dark:text-neutral-200 hover:text-[#E07A5F] dark:hover:text-[#F0A999] text-sm font-medium transition-colors"
          >
            Skin Analysis
          </Link>
          <Link 
            href="/profile" 
            className="text-neutral-800 dark:text-neutral-200 hover:text-[#E07A5F] dark:hover:text-[#F0A999] text-sm font-medium transition-colors"
          >
            Profile
          </Link>
        </div>
      </div>

      {/* Mobile menu dropdown - will only show when mobile menu button is clicked */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-4 py-2">
          <Link 
            href="/services" 
            className="py-3 border-b border-neutral-100 dark:border-neutral-700 text-neutral-700 hover:text-[#E07A5F] dark:text-neutral-300 dark:hover:text-[#F0A999] font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="/products" 
            className="py-3 border-b border-neutral-100 dark:border-neutral-700 text-neutral-700 hover:text-[#E07A5F] dark:text-neutral-300 dark:hover:text-[#F0A999] font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            href="/analyze" 
            className="py-3 border-b border-neutral-100 dark:border-neutral-700 text-neutral-700 hover:text-[#E07A5F] dark:text-neutral-300 dark:hover:text-[#F0A999] font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Skin Analysis
          </Link>
          <Link 
            href="/profile" 
            className="py-3 text-neutral-700 hover:text-[#E07A5F] dark:text-neutral-300 dark:hover:text-[#F0A999] font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}; 