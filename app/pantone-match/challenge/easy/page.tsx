import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';

import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Easy Challenge Mode - Pantone Memory Match',
  description: `Find ${GAME_DIFFICULTY.easy.pairsCount} color pairs in ${GAME_DIFFICULTY.easy.timeLimit} seconds with only ${GAME_DIFFICULTY.easy.maxMoves} moves. A friendly challenge for beginners.`,
  keywords:
    'pantone, color matching, memory game, challenge mode, timed, easy difficulty, beginner',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/challenge/easy',
  },
  openGraph: {
    title: 'Easy Challenge Mode - Pantone Memory Match',
    description: `Find ${GAME_DIFFICULTY.easy.pairsCount} color pairs in ${GAME_DIFFICULTY.easy.timeLimit} seconds with only ${GAME_DIFFICULTY.easy.maxMoves} moves. A friendly challenge for beginners.`,
    type: 'website',
  },
};

export default function PantoneChallengeEasyPage() {
  return (
    <>
      <GameHeader gameMode="challenge" difficulty="easy" />
      <PantoneMatchGame gameMode="challenge" difficulty="easy" />
    </>
  );
}
