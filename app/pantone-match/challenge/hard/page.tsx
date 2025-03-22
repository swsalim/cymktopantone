import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';

import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Hard Challenge Mode - Pantone Memory Match',
  description: `Can you match ${GAME_DIFFICULTY.hard.pairsCount} color pairs in just ${GAME_DIFFICULTY.hard.timeLimit} seconds with ${GAME_DIFFICULTY.hard.maxMoves} moves? For true color experts!`,
  keywords: 'pantone, color matching, memory game, challenge mode, timed, hard difficulty, expert',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/challenge/hard',
  },
  openGraph: {
    title: 'Hard Challenge Mode - Pantone Memory Match',
    description: `Can you match ${GAME_DIFFICULTY.hard.pairsCount} color pairs in just ${GAME_DIFFICULTY.hard.timeLimit} seconds with ${GAME_DIFFICULTY.hard.maxMoves} moves? For true color experts!`,
    type: 'website',
  },
};

export default function PantoneChallengeHardPage() {
  return (
    <>
      <GameHeader gameMode="challenge" difficulty="hard" />
      <PantoneMatchGame gameMode="challenge" difficulty="hard" />
    </>
  );
}
