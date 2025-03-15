import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import IndieBoostingAds from '@/components/ads/indie-boosting';
import HslCmykContent from '@/components/hsl-cmyk-content';
import HslCmykConverter from '@/components/hsl-cmyk-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

const config = {
  title: 'HSL to CMYK Color Converter',
  description:
    'Easily convert HSL to CMYK colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
  url: '/convert-hsl-to-cmyk',
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

export default function HslCmykPage() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/convert-hsl-to-cmyk')} />

      <HslCmykConverter />
      <IndieBoostingAds />
      <HslCmykContent />
    </>
  );
}
