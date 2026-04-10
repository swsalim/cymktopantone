import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { BrandPalettePantoneExporter } from '@/components/brand-palette/brand-palette-pantone-exporter';
import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { ConverterPageIntro } from '@/components/converter-page-intro';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

const config = {
  title: 'Brand Palette to Pantone — Export CSV & Markdown',
  description:
    'Paste up to six brand HEX colors and get a shareable table: RGB, approximate CMYK, and closest Pantone (PMS) match per swatch using our HEX→Pantone matching engine.',
  url: '/brand-palette-to-pantone',
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

const JSONLDbreadcrumbs = [
  { url: `${process.env.NEXT_PUBLIC_BASE_URL}`, name: 'Home' },
  { url: absoluteUrl(config.url), name: config.title },
];

export default async function BrandPaletteToPantonePage({
  searchParams,
}: {
  searchParams: Promise<{ colors?: string }>;
}) {
  const { colors } = await searchParams;

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl(config.url)} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <ConverterPageIntro title={config.title} description={config.description} />
      <BrandPalettePantoneExporter key={colors ?? 'default'} initialColorsParam={colors} />
      <LazyAdsLeaderboard />
    </>
  );
}
