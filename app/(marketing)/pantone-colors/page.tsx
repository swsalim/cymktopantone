import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { Container } from '@/components/container';
import PantoneColorsList from '@/components/pantone-colors';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Pantone Colors Chart',
  description:
    'Pantone Matching System Color Chart. This online PMS Color Chart is intended as a reference guide only for label printing and other print jobs.',
  url: '/pantone-colors',
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
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/pantone-colors`),
    name: 'Pantone Colors',
  },
];

export default function PantoneColors() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/pantone-colors')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container as="section" className="prose dark:prose-invert">
          <h1>Guide to Pantone Colors</h1>

          <h2>What are Pantone Colors?</h2>
          <p>
            Pantone colors represent the global standard in color communication and inspiration
            across multiple industries. The Pantone Matching System (PMS) ensures consistent color
            reproduction across different mediums and materials, from digital displays to printed
            materials and fabric products.
          </p>
          <h2>Understanding Pantone Color of the Year</h2>
          <p>
            Since 2000, Pantone has been selecting a Color of the Year that influences product
            development and purchasing decisions in multiple industries, including fashion, interior
            design, and graphic design. This color selection process involves thoughtful
            consideration of global culture, design trends, and societal movements.
          </p>
          <h3>Recent Colors of the Year</h3>
          <p>Each year's color selection reflects the global zeitgeist and upcoming trends:</p>
          <ul>
            <li>
              <a href="https://www.pantone.com/color-of-the-year/2024" target="_blank">
                2024: Peach Fuzz
              </a>{' '}
              - A warm and cozy shade that combines pink and orange
            </li>
            <li>
              <a href="https://interiordesign.net/designwire/pantone-color-of-the-year-2023-viva-magenta/">
                2023: Viva Magenta
              </a>{' '}
              - A crimson red tone that balances warmth and coolness
            </li>
            <li>
              <a href="https://www.americangemsociety.org/welcome-pantones-color-of-the-year-very-peri/">
                2022: Very Peri
              </a>{' '}
              - A dynamic periwinkle blue with violet-red undertones
            </li>
            <li>
              <a href="https://br24.com/en/pantone-color-of-the-year-2021-ultimate-gray-illuminating/">
                2021: Ultimate Gray + Illuminating
              </a>{' '}
              - A practical gray paired with an optimistic yellow
            </li>
          </ul>
        </Container>

        <div className="mx-auto my-14 md:my-20">
          <LazyAdsLeaderboard />
        </div>

        <Container>
          <PantoneColorsList />
        </Container>
      </Wrapper>
    </>
  );
}
