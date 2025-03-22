import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Daily Challenge - Pantone Color Match',
  description:
    "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.",
  keywords: 'pantone, color matching, memory game, daily challenge, daily puzzle, pantone colors',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/daily',
  },
  openGraph: {
    title: 'Daily Challenge - Pantone Color Match',
    description:
      "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.",
    url: '/pantone-match/daily',
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

export default function PantoneDailyChallengePage() {
  return (
    <>
      <GameHeader gameMode="daily" />
      <PantoneMatchGame gameMode="daily" />
    </>
  );
}
