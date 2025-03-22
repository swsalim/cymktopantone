import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';
import { siteConfig } from '@/config/site';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Medium Challenge Mode - Pantone Color Match',
  description: `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`,
  keywords: 'pantone, color matching, memory game, challenge mode, timed, medium difficulty',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/challenge',
  },
  openGraph: {
    title: 'Medium Challenge Mode - Pantone Color Match',
    description: `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`,
    url: '/pantone-match/challenge',
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

export default function PantoneChallengePage() {
  return (
    <>
      <GameHeader gameMode="challenge" difficulty="medium" />
      <DifficultyNavigation basePath="/pantone-match/challenge" />
      <PantoneMatchGame gameMode="challenge" difficulty="medium" />
    </>
  );
}
