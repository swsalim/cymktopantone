import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import CmykRgbContent from '@/components/cmyk-rgb-content';
import CmykRgbConverter from '@/components/cmyk-rgb-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

const config = {
  title: 'CMYK to RGB Color Converter',
  description:
    'Easily convert CMYK to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
  url: '/convert-cmyk-to-rgb',
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

export default function CmykRgbPage() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/convert-hex-to-rgb')} />

      <CmykRgbConverter />
      <CmykRgbContent />
    </>
  );
}
