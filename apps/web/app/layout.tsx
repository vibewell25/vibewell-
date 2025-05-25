import { Inter } from 'next/font/google';
import '../styles/globals.css';
import './custom.css';
import { ClientShell } from './ClientShell';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero video for better LCP */}
        <link 
          rel="preload" 
          href="/videos/wellness-loop.mp4" 
          as="video" 
          type="video/mp4"
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50`}>
        <ClientShell>
          <main className="min-h-screen">
            {children}
          </main>
        </ClientShell>
        
        {/* Performance monitoring script */}
        <Script id="web-vitals">
          {`
            function reportWebVitals(metric) {
              // Analytics or logging
              console.log(metric.name, metric.value);
            }
            
            window.addEventListener('load', () => {
              // Monitor LCP
              const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                  if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime / 1000, 'seconds');
                  }
                });
              });
              
              observer.observe({ type: 'largest-contentful-paint', buffered: true });
            });
          `}
        </Script>
      </body>
    </html>
  );
} 