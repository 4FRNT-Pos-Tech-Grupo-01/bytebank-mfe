import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

import Header from '@/layouts/structure/header';
import Footer from '@/layouts/structure/footer';
import ReduxProvider from './redux-provider';
import LazyLayoutClient from './lazy-layout-client';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge('font-inter', inter.className)}>
        <ReduxProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <LazyLayoutClient />
        </ReduxProvider>
      </body>
    </html>
  );
}
