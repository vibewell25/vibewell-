'use client';

import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { NavigationBar } from '@vibewell/ui-web/components/NavigationBar';
import { Header } from '@vibewell/ui-web/components/Header';
import ThemeProvider from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import navItems from '../components/navItems';
import '../globals.css';
import './custom.css';
import { useEffect } from 'react';
import { Workbox } from 'workbox-window';
import { OfflineBanner } from '@vibewell/ui-web/components/OfflineBanner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50`}>
        <ThemeProvider defaultTheme="light">
          <OfflineBanner />
          
          {/* Header for desktop and tablets */}
          <div className="relative">
            <Header transparent={isLandingPage} />
            <div className="absolute right-4 top-4">
              <ThemeToggle />
            </div>
          </div>
          
          {/* Main content */}
          <main className="min-h-screen pt-16 pb-16 md:pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          
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
        </ThemeProvider>
      </body>
    </html>
  );
} 