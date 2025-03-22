import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Classic Medium Mode - Pantone Color Match',
  description: `Balance challenge and fun with ${GAME_DIFFICULTY.medium.pairsCount} Pantone color pairs. Test your memory at a comfortable pace.`,
  keywords: 'pantone, color matching, memory game, classic mode, medium difficulty',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/classic/medium',
  },
  openGraph: {
    title: 'Classic Medium Mode - Pantone Color Match',
    description: `Balance challenge and fun with ${GAME_DIFFICULTY.medium.pairsCount} Pantone color pairs. Test your memory at a comfortable pace.`,
    type: 'website',
  },
};

export default function PantoneMatchMediumPage() {
  return (
    <>
      <GameHeader gameMode="classic" difficulty="medium" />
      <DifficultyNavigation basePath="/pantone-match/classic" />
      <PantoneMatchGame gameMode="classic" difficulty="medium" />
    </>
  );
}
