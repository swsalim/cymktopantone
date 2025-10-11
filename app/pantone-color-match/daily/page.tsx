import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

export const metadata: Metadata = {
  title: 'Daily Challenge - Pantone Color Match',
  description:
    "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.",
  keywords: 'pantone, color matching, memory game, daily challenge, daily puzzle, pantone colors',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-color-match/daily',
  },
  openGraph: {
    title: 'Daily Challenge - Pantone Color Match',
    description:
      "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.",
    url: '/pantone-color-match/daily',
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Daily Challenge - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Daily Challenge - Pantone Color Match',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Daily Challenge - Pantone Color Match',
    description:
      "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.",
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Daily Challenge - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Daily Challenge - Pantone Color Match',
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
    url: absoluteUrl('/pantone-color-match'),
    name: 'Pantone Color Match',
  },
  {
    url: absoluteUrl('/pantone-color-match/daily'),
    name: 'Daily Mode',
  },
];

export default function PantoneDailyChallengePage() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd
        id={absoluteUrl('/pantone-color-match/daily')}
        description={`A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.`}
      />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <GameHeader gameMode="daily" />
      <PantoneMatchGame gameMode="daily" />
    </>
  );
}
