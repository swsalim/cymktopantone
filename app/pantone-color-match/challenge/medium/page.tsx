import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';
import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

export const metadata: Metadata = {
  title: 'Medium Challenge Mode - Pantone Color Match',
  description: `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`,
  keywords: 'pantone, color matching, memory game, challenge mode, timed, medium difficulty',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-color-match/challenge/medium',
  },
  openGraph: {
    title: 'Medium Challenge Mode - Pantone Color Match',
    description: `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`,
    url: '/pantone-color-match/challenge/medium',
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Medium Challenge Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Medium Challenge Mode - Pantone Color Match',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Medium Challenge Mode - Pantone Color Match',
    description: `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Medium Challenge Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Medium Challenge Mode - Pantone Color Match',
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
    url: absoluteUrl('/pantone-color-match/challenge'),
    name: 'Challenge Mode',
  },
  {
    url: absoluteUrl('/pantone-color-match/challenge/medium'),
    name: 'Medium Mode',
  },
];

export default function PantoneChallengeMediumPage() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd
        id={absoluteUrl('/pantone-color-match/challenge/medium')}
        description={`Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`}
      />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <GameHeader gameMode="challenge" difficulty="medium" />
      <DifficultyNavigation basePath="/pantone-color-match/challenge" />
      <PantoneMatchGame gameMode="challenge" difficulty="medium" />
    </>
  );
}
