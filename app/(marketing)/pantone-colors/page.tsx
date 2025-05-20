import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import PantoneColorsList from '@/components/pantone-colors';
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

export default function PantoneColors() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/pantone-colors')} />

      <Wrapper>
        <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
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
            <li>2024: Peach Fuzz - A warm and cozy shade that combines pink and orange</li>
            <li>2023: Viva Magenta - A crimson red tone that balances warmth and coolness</li>
            <li>2022: Very Peri - A dynamic periwinkle blue with violet-red undertones</li>
            <li>
              2021: Ultimate Gray + Illuminating - A practical gray paired with an optimistic yellow
            </li>
          </ul>
        </Container>

        <Wrapper className="mx-auto text-center">
          <div className="mx-auto max-w-2xl">
            <iframe
              width="100%"
              height="250"
              frameBorder="0"
              className="ta-widget"
              data-min-height="250"
              id="67ee0a352dfc280f879388c3-4728"
              src="https://app.tinyadz.com/widgets/67ee0a352dfc280f879388c3?seed= 4728&previewMode=false&showInPopup=false&theme=light"></iframe>
          </div>
        </Wrapper>

        <Container>
          <PantoneColorsList />
        </Container>
      </Wrapper>
    </>
  );
}
