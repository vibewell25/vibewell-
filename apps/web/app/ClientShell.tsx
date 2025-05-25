'use client';

import ThemeProvider from '../components/ThemeProvider';
import { OfflineBanner } from '@vibewell/ui-web/components/OfflineBanner';
import { NavigationBar } from '@vibewell/ui-web/components/NavigationBar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Workbox } from 'workbox-window';
import ThemeToggle from '../components/ThemeToggle';
import { Header } from '@vibewell/ui-web/components/Header';
import navItems from '../components/navItems';
import { CartProvider } from '../context/CartContext';

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeKey = navItems.find(item => pathname === item.route || pathname.startsWith(item.route + '/'))?.key || 'home';
  const isLandingPage = pathname === '/';

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/service-worker.js');
      wb.register();
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <CartProvider>
        <OfflineBanner />
        
        {/* Header for all devices */}
        <div className="relative">
          <Header transparent={isLandingPage} />
          <div className="absolute right-8 top-4 z-50">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Main content */}
        <div className="container-fluid">
          {children}
        </div>
        
        {/* Bottom navigation for mobile */}
        <div className="md:hidden">
          <NavigationBar
            items={navItems}
            activeKey={activeKey}
            onNavigate={(key) => {
              const item = navItems.find(i => i.key === key);
              if (item) router.push(item.route);
            }}
          />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
} 