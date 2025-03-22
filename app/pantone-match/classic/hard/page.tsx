import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';
import { siteConfig } from '@/config/site';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Classic Hard Mode - Pantone Color Match',
  description: `The ultimate memory challenge with ${GAME_DIFFICULTY.hard.pairsCount} Pantone color pairs. For those with a sharp eye for color.`,
  keywords: 'pantone, color matching, memory game, classic mode, hard difficulty, advanced',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-color-match/classic/hard',
  },
  openGraph: {
    title: 'Classic Hard Mode - Pantone Color Match',
    description: `The ultimate memory challenge with ${GAME_DIFFICULTY.hard.pairsCount} Pantone color pairs. For those with a sharp eye for color.`,
    url: '/pantone-color-match/classic/hard',
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Classic Hard Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Classic Hard Mode - Pantone Color Match',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Classic Hard Mode - Pantone Color Match',
    description: `The ultimate memory challenge with ${GAME_DIFFICULTY.hard.pairsCount} Pantone color pairs. For those with a sharp eye for color.`,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Classic Hard Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Classic Hard Mode - Pantone Color Match',
      },
    ],
  },
};

export default function PantoneMatchHardPage() {
  return (
    <>
      <GameHeader gameMode="classic" difficulty="hard" />
      <DifficultyNavigation basePath="/pantone-color-match/classic" />
      <PantoneMatchGame gameMode="classic" difficulty="hard" />
    </>
  );
}
