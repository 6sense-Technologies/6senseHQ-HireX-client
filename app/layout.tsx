import './globals.css';
import { WebVitals } from './_components/web-vitals';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Provider from '@/components/provider';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        <WebVitals />
        <SessionProvider>
          <Provider>{children}</Provider>
        </SessionProvider>
        {/* Script Optimization Started */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='lazyOnload'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_TRACKING_ID');
          `}
        </Script>
        {/* Script Optimization Ended */}
      </body>
    </html>
  );
}