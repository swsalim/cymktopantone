import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

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
        <link rel="preconnect" href="//analytics.ahrefs.com" />
        <link rel="preconnect" href="//beamanalytics.b-cdn.net" />
        <link rel="preconnect" href="//stats.cmyktopantone.com" />
        <link rel="preconnect" href="//pagead2.googlesyndication.com" />
        <link rel="preconnect" href="//cdn.apitiny.net" />
        <link rel="preconnect" href="//app.tinyadz.com" />
        <link rel="dns-prefetch" href="//analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <link rel="dns-prefetch" href="//beamanalytics.b-cdn.net" />
        <link rel="dns-prefetch" href="//stats.cmyktopantone.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//cdn.apitiny.net" />
        <link rel="dns-prefetch" href="//app.tinyadz.com" />
        <LogoJsonLd logo={absoluteUrl('/icons/logo.png')} url={absoluteUrl()} />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="A4fGgmSmJA2sliYbhrITCA"
          defer></script>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="c2fbac7b-0b09-48f0-b925-7a5a61de2a3b"
          defer></script>
        <script
          src="https://stats.cmyktopantone.com/ennui.js"
          data-api-host="https://stats.cmyktopantone.com"
          data-token="a9e4cfbdd5cd10a"
          defer></script>
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased dark:bg-gray-900 dark:text-gray-100',
          plusJakartaSans.variable,
        )}
        suppressHydrationWarning>
        <NavMobile />
        <Navbar />
        <main className="flex grow flex-col justify-center">{children}</main>
        <Footer />
        <Toaster />

        <script
          defer
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3799479098488751"
          crossOrigin="anonymous"></script>
        <script
          src="https://cdn.apitiny.net/scripts/v2.0/main.js"
          data-site-id="67ee06492dfc280f87938650"
          defer></script>
        <script defer src="https://app.tinyadz.com/libs/widget.js" type="module"></script>
        <script defer src="https://app.tinyadz.com/libs/manager.js" type="module"></script>
      </body>
    </html>
  );
}
