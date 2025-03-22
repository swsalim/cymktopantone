import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';
import { siteConfig } from '@/config/site';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Easy Challenge Mode - Pantone Color Match',
  description: `Find ${GAME_DIFFICULTY.easy.pairsCount} color pairs in ${GAME_DIFFICULTY.easy.timeLimit} seconds with only ${GAME_DIFFICULTY.easy.maxMoves} moves. A friendly challenge for beginners.`,
  keywords:
    'pantone, color matching, memory game, challenge mode, timed, easy difficulty, beginner',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-color-match/challenge/easy',
  },
  openGraph: {
    title: 'Easy Challenge Mode - Pantone Color Match',
    description: `Find ${GAME_DIFFICULTY.easy.pairsCount} color pairs in ${GAME_DIFFICULTY.easy.timeLimit} seconds with only ${GAME_DIFFICULTY.easy.maxMoves} moves. A friendly challenge for beginners.`,
    url: '/pantone-color-match/challenge/easy',
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Easy Challenge Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Easy Challenge Mode - Pantone Color Match',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Easy Challenge Mode - Pantone Color Match',
    description: `Find ${GAME_DIFFICULTY.easy.pairsCount} color pairs in ${GAME_DIFFICULTY.easy.timeLimit} seconds with only ${GAME_DIFFICULTY.easy.maxMoves} moves. A friendly challenge for beginners.`,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Easy Challenge Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Easy Challenge Mode - Pantone Color Match',
      },
    ],
  },
};

export default function PantoneChallengeEasyPage() {
  return (
    <>
      <GameHeader gameMode="challenge" difficulty="easy" />
      <DifficultyNavigation basePath="/pantone-color-match/challenge" />
      <PantoneMatchGame gameMode="challenge" difficulty="easy" />
    </>
  );
}
