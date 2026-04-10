import { Metadata } from 'next';

import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { listPantoneLookupOptions, pantoneNameToSlug } from '@/lib/pantone-lookup';
import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { ConverterPageIntro } from '@/components/converter-page-intro';
import { Container } from '@/components/container';
import { PantoneLookupSearch } from '@/components/pantone/pantone-lookup-search';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const POPULAR = ['485 C', '293 C', '185 C', 'Black C', 'Cool Gray 11 C', 'Yellow C'] as const;

const config = {
  title: 'Pantone Color Lookup — HEX, RGB, CMYK & HSL',
  description:
    'Look up any Pantone PMS (Coated) swatch: instant HEX, RGB, approximate CMYK, HSL, and HSV for screens and handoffs. Free, no signup.',
  url: '/pantone',
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
  { url: absoluteUrl(config.url), name: 'Pantone color lookup' },
];

export default function PantoneLookupHubPage() {
  const items = listPantoneLookupOptions();

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl(config.url)} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <ConverterPageIntro title={config.title} description={config.description} />
      <Wrapper className="pb-12 md:pb-20">
        <Container className="space-y-8">
          <div className="not-prose flex flex-col gap-3">
            <PantoneLookupSearch items={items} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Values are sRGB approximations for digital use. For press, always match a physical
              Pantone guide or contract proof.
            </p>
          </div>

          <div className="prose dark:prose-invert">
            <h2>Popular swatches</h2>
            <ul className="not-prose flex list-none flex-wrap gap-2 pl-0">
              {POPULAR.map((name) => (
                <li key={name}>
                  <Link
                    href={`/pantone/${pantoneNameToSlug(name)}`}
                    className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-gray-800 transition hover:border-violet-300 hover:bg-violet-50 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-100 dark:hover:border-violet-600 dark:hover:bg-violet-950/40">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="prose dark:prose-invert">
            <h2>Related tools</h2>
            <p>
              Browse the full{' '}
              <Link href="/pantone-colors">Pantone color chart</Link>, use the interactive{' '}
              <Link href="/convert-pantone-pms-to-hex">Pantone to HEX</Link> grid, or find closest
              matches with <Link href="/convert-hex-to-pantone-pms">HEX to Pantone</Link>.
            </p>
          </div>
        </Container>
      </Wrapper>
      <LazyAdsLeaderboard />
    </>
  );
}
