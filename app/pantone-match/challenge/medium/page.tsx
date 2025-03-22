import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Medium Challenge Mode - Pantone Color Match',
  description: `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`,
  keywords: 'pantone, color matching, memory game, challenge mode, timed, medium difficulty',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/challenge/medium',
  },
  openGraph: {
    title: 'Medium Challenge Mode - Pantone Color Match',
    description: `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`,
    type: 'website',
  },
};

export default function PantoneChallengeMediumPage() {
  return (
    <>
      <GameHeader gameMode="challenge" difficulty="medium" />
      <DifficultyNavigation basePath="/pantone-match/challenge" />
      <PantoneMatchGame gameMode="challenge" difficulty="medium" />
    </>
  );
}
