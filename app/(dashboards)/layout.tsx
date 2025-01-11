import '../globals.css';
import Provider from '@/components/provider';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Sidebar from '@/components/sidebar';

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
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          <Sidebar children={children} />
        </Provider>
      </body>
    </html>
  );
}