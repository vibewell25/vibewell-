'use client';

import React from 'react';
import Link from 'next/link';

interface NavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  route: string;
}

interface NavigationBarProps {
  items: NavItem[];
  activeKey: string;
  onNavigate?: (key: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  items,
  activeKey,
  onNavigate
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.route}
              className={`flex flex-col items-center justify-center w-full h-full ${
                activeKey === item.key
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
              onClick={() => onNavigate && onNavigate(item.key)}
            >
              {item.icon && <div className="mb-1">{item.icon}</div>}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}; 