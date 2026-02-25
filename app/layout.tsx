import Script from 'next/script';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '@/index.css';
import AppProviders from '@/App';
import Layout from '@/components/layout/Layout';
import { siteMetadata } from '@/lib/siteMetadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const baseUrl = new URL(siteMetadata.baseUrl);
const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
const enableGptEngineer = process.env.NEXT_PUBLIC_ENABLE_GPTENGINEER === 'true';

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: siteMetadata.name,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.defaultDescription,
  icons: {
    icon: [
      {
        url: '/lovable-uploads/efa84d07-ffcc-4c92-b759-20f83eaa0ef5.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: siteMetadata.name,
    title: siteMetadata.name,
    description: siteMetadata.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
  },
};

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light',
  };
}

const AnalyticsScripts = () => {
  if (!enableAnalytics) {
    return null;
  }

  return (
    <>
      {gaId && (
        <>
          <Script
            id="google-tag"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      {hotjarId && (
        <>
          <Script id="hotjar-setup" strategy="afterInteractive">
            {`
              window.hj = window.hj || function(){(window.hj.q = window.hj.q || []).push(arguments);};
              window._hjSettings = { hjid: ${Number(hotjarId)}, hjsv: 6 };
            `}
          </Script>
          <Script
            id="hotjar-script"
            src={`https://static.hotjar.com/c/hotjar-${encodeURIComponent(hotjarId)}.js?sv=6`}
            strategy="afterInteractive"
          />
        </>
      )}
      {enableGptEngineer && (
        <Script
          src="https://cdn.gpteng.co/gptengineer.js"
          type="module"
          strategy="afterInteractive"
        />
      )}
    </>
  );
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsScripts />
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
