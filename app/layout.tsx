import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Script from 'next/script';

import { siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

import RotatingBanner from '@/components/ads/rotating-banner';
import { AnalyticsWrapper } from '@/components/analytics';
import Footer from '@/components/footer';
import { NavMobile } from '@/components/nav-mobile';
import Navbar from '@/components/navbar';
import LogoJsonLd from '@/components/structured-data/logo-json-ld';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  metadataBase: siteConfig.url,
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: 'Yuyu',
      url: 'https://www.yuurrific.com',
    },
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.openGraph.image,
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: siteConfig.openGraph.imageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icons/favicon-32x32.png',
    shortcut: '/icons/apple-touch-icon.png',
    apple: '/icons/apple-touch-icon.png',
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [siteConfig.openGraph.image],
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="//ik.imagekit.io" />
        <link rel="preconnect" href="//scripts.simpleanalyticscdn.com" />
        <link rel="preconnect" href="//queue.simpleanalyticscdn.com" />
        <link rel="preconnect" href="//analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="//analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="//queue.simpleanalyticscdn.com" />
        <link rel="dns-prefetch" href="//scripts.simpleanalyticscdn.com" />
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <LogoJsonLd logo={absoluteUrl('/icons/logo.png')} url={absoluteUrl()} />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="A4fGgmSmJA2sliYbhrITCA"
          defer></script>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="c2fbac7b-0b09-48f0-b925-7a5a61de2a3b"
          async></script>
        <Script
          id="simple-analytics"
          dangerouslySetInnerHTML={{
            __html: `window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};`,
          }}
        />
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased dark:bg-gray-900 dark:text-gray-100',
          plusJakartaSans.variable,
        )}
        suppressHydrationWarning>
        <RotatingBanner />
        <NavMobile />
        <Navbar />
        <main className="flex grow flex-col justify-center">{children}</main>
        <AnalyticsWrapper />
        <Footer />
        <Toaster />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3799479098488751"
          crossOrigin="anonymous"></script>
        <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
        <script
          src="https://app.tinyadz.com/scripts/ads.js?siteId=67ee06492dfc280f87938650"
          type="module"
          async></script>
        {/* <script async src="https://scripts.simpleanalyticscdn.com/auto-events.js"></script> */}
        <noscript>
          <Image
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
            width="1"
            height="1"
            unoptimized
          />
        </noscript>
      </body>
    </html>
  );
}
