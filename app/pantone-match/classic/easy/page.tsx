import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Classic Easy Mode - Pantone Memory Match',
  description: `A relaxed game of Pantone color matching with just ${GAME_DIFFICULTY.easy.pairsCount} pairs. Perfect for beginners or a quick game.`,
  keywords: 'pantone, color matching, memory game, classic mode, easy difficulty, beginner',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/classic/easy',
  },
  openGraph: {
    title: 'Classic Easy Mode - Pantone Memory Match',
    description: `A relaxed game of Pantone color matching with just ${GAME_DIFFICULTY.easy.pairsCount} pairs. Perfect for beginners or a quick game.`,
    type: 'website',
  },
};

export default function PantoneMatchEasyPage() {
  return (
    <>
      <GameHeader gameMode="classic" difficulty="easy" />
      <DifficultyNavigation basePath="/pantone-match/classic" />
      <PantoneMatchGame gameMode="classic" difficulty="easy" />
    </>
  );
}
