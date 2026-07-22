import type { Metadata } from 'next';
import { Figtree, Fraunces } from 'next/font/google';

import { ogImages, siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

import Footer from '@/components/footer';
import { NavMobile } from '@/components/nav-mobile';
import Navbar from '@/components/navbar';
import LogoJsonLd from '@/components/structured-data/logo-json-ld';
import { ThirdPartyScripts } from '@/components/third-party-scripts';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

const fullMetadata: Metadata = {
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
    images: ogImages(),
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
    images: ogImages(),
  },
  robots: {
    index: true,
  },
  verification: {
    yandex: 'efa73e877348afc0',
  },
};

export const metadata: Metadata = fullMetadata;

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
        <link rel="preconnect" href="//stats.colormapper.xyz" />
        <link rel="preconnect" href="//pagead2.googlesyndication.com" />
        <link rel="preconnect" href="//cdn.apitiny.net" />
        <link rel="preconnect" href="//app.tinyadz.com" />
        <link rel="dns-prefetch" href="//analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <link rel="dns-prefetch" href="//stats.colormapper.xyz" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//cdn.apitiny.net" />
        <link rel="dns-prefetch" href="//app.tinyadz.com" />
        <LogoJsonLd logo={absoluteUrl('/icons/logo.png')} url={absoluteUrl()} />
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased dark:bg-gray-900 dark:text-gray-100',
          figtree.variable,
          fraunces.variable,
        )}
        suppressHydrationWarning>
        <NavMobile />
        <Navbar />
        <main className="flex grow flex-col justify-center">{children}</main>
        <Footer />
        <Toaster />
        <ThirdPartyScripts />
      </body>
    </html>
  );
}
