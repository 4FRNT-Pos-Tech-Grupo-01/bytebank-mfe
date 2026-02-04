import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';

import Header from '@/layouts/structure/header';
import Footer from '@/layouts/structure/footer';
import ReduxProvider from './redux-provider';

const ToastContainerLazy = dynamic(
  () => import('@/components/toast-container-lazy'),
  { ssr: false }
);

const Modal = dynamic(() => import('@/components/modal'), { ssr: false });

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
          <Modal />
          <ToastContainerLazy />
        </ReduxProvider>
      </body>
    </html>
  );
}
