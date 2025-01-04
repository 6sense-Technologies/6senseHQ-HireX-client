import type { Metadata } from 'next';
import './globals.css';
import { WebVitals } from './_components/web-vitals';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Provider from '@/components/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        <WebVitals />
        <Provider>{children}</Provider>
        {/* Script Optimaization Started*/}
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

        {/* Script Optimaization Ended */}
      </body>
    </html>
  );
}
