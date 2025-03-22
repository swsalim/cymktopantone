import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';
import { siteConfig } from '@/config/site';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Hard Challenge Mode - Pantone Color Match',
  description: `Can you match ${GAME_DIFFICULTY.hard.pairsCount} color pairs in just ${GAME_DIFFICULTY.hard.timeLimit} seconds with ${GAME_DIFFICULTY.hard.maxMoves} moves? For true color experts!`,
  keywords: 'pantone, color matching, memory game, challenge mode, timed, hard difficulty, expert',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/challenge/hard',
  },
  openGraph: {
    title: 'Hard Challenge Mode - Pantone Color Match',
    description: `Can you match ${GAME_DIFFICULTY.hard.pairsCount} color pairs in just ${GAME_DIFFICULTY.hard.timeLimit} seconds with ${GAME_DIFFICULTY.hard.maxMoves} moves? For true color experts!`,
    url: '/pantone-match/challenge/hard',
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Hard Challenge Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Hard Challenge Mode - Pantone Color Match',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Hard Challenge Mode - Pantone Color Match',
    description: `Can you match ${GAME_DIFFICULTY.hard.pairsCount} color pairs in just ${GAME_DIFFICULTY.hard.timeLimit} seconds with ${GAME_DIFFICULTY.hard.maxMoves} moves? For true color experts!`,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Hard Challenge Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Hard Challenge Mode - Pantone Color Match',
      },
    ],
  },
};

export default function PantoneChallengeHardPage() {
  return (
    <>
      <GameHeader gameMode="challenge" difficulty="hard" />
      <DifficultyNavigation basePath="/pantone-match/challenge" />
      <PantoneMatchGame gameMode="challenge" difficulty="hard" />
    </>
  );
}
