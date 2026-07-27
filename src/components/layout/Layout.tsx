'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-teal-dark px-5 py-3 font-medium text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-dark"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow overflow-x-hidden pt-24 focus:outline-none"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
