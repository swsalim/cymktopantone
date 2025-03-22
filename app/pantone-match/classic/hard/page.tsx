import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Classic Hard Mode - Pantone Color Match',
  description: `The ultimate memory challenge with ${GAME_DIFFICULTY.hard.pairsCount} Pantone color pairs. For those with a sharp eye for color.`,
  keywords: 'pantone, color matching, memory game, classic mode, hard difficulty, advanced',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/classic/hard',
  },
  openGraph: {
    title: 'Classic Hard Mode - Pantone Color Match',
    description: `The ultimate memory challenge with ${GAME_DIFFICULTY.hard.pairsCount} Pantone color pairs. For those with a sharp eye for color.`,
    type: 'website',
  },
};

export default function PantoneMatchHardPage() {
  return (
    <>
      <GameHeader gameMode="classic" difficulty="hard" />
      <DifficultyNavigation basePath="/pantone-match/classic" />
      <PantoneMatchGame gameMode="classic" difficulty="hard" />
    </>
  );
}
