import { Metadata } from 'next';

import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Daily Challenge - Pantone Memory Match',
  description:
    "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.",
  keywords: 'pantone, color matching, memory game, daily challenge, daily puzzle, pantone colors',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-match/daily',
  },
  openGraph: {
    title: 'Daily Challenge - Pantone Memory Match',
    description:
      "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.",
    type: 'website',
  },
};

export default function PantoneDailyChallengePage() {
  return (
    <>
      <GameHeader gameMode="daily" />
      <PantoneMatchGame gameMode="daily" />
    </>
  );
}
