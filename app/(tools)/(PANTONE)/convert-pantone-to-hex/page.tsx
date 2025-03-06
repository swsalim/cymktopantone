import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import IndieBoostingAds from '@/components/ads/indie-boosting';
import PantoneHexConverter from '@/components/pantone-hex-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

const config = {
  title: 'Pantone to HEX Converter',
  description:
    'The quickest way to get accurate HEX, CMYK, and RGB values for Pantone colors without using a PMS color chart. Produce more successful color combinations for your designs.',
  url: '/convert-pantone-to-hex',
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: {
    canonical: config.url,
  },
  openGraph: {
    title: config.title,
    description: config.description,
    url: config.url,
    images: [
      {
        url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: config.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: config.title,
    description: config.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: config.title,
      },
    ],
  },
};

export default function PantoneHexPage() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/convert-pantone-to-hex')} />

      <PantoneHexConverter />
      <IndieBoostingAds />
    </>
  );
}
