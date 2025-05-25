'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import { SunIcon, MoonIcon } from 'lucide-react';

export function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-neutral-900/90 shadow-md backdrop-blur-md py-3' 
          : 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md'
      }`}
    >
      <Link href="/" className="text-xl font-bold text-neutral-900 dark:text-white">
        VibeWell
      </Link>
      <div className="flex space-x-8">
        <Link href="/services" className="text-neutral-800 dark:text-neutral-200 hover:text-coral-500 dark:hover:text-coral-400 transition-colors">
          Services
        </Link>
        <Link href="/products" className="text-neutral-800 dark:text-neutral-200 hover:text-coral-500 dark:hover:text-coral-400 transition-colors">
          Products
        </Link>
        <Link href="/analyze" className="text-neutral-800 dark:text-neutral-200 hover:text-coral-500 dark:hover:text-coral-400 transition-colors">
          Skin Analysis
        </Link>
        <Link href="/profile" className="text-neutral-800 dark:text-neutral-200 hover:text-coral-500 dark:hover:text-coral-400 transition-colors">
          Profile
        </Link>
      </div>
      <button 
        onClick={toggleTheme} 
        aria-label="Toggle dark mode"
        className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
      >
        {theme === 'dark' ? <SunIcon size={20}/> : <MoonIcon size={20}/>}
      </button>
    </nav>
  );
} 