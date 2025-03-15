import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import IndieBoostingAds from '@/components/ads/indie-boosting';
import HsvHslContent from '@/components/hsv-hsl-content';
import HsvHslConverter from '@/components/hsv-hsl-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

const config = {
  title: 'HSV to HSL Color Converter',
  description:
    'Easily convert HSV to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
  url: '/convert-hsv-to-hsl',
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

export default function HsvHslPage() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/convert-hsv-to-hsl')} />

      <HsvHslConverter />
      <IndieBoostingAds />
      <HsvHslContent />
    </>
  );
}
