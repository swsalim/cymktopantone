import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';
import { siteConfig } from '@/config/site';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Classic Easy Mode - Pantone Color Match',
  description: `A relaxed game of Pantone color matching gamewith just ${GAME_DIFFICULTY.easy.pairsCount} pairs. Perfect for beginners or a quick game.`,
  keywords: 'pantone, color matching, memory game, classic mode, easy difficulty, beginner',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-color-match/classic/easy',
  },
  openGraph: {
    title: 'Classic Easy Mode - Pantone Color Match',
    description: `A relaxed game of Pantone color matching gamewith just ${GAME_DIFFICULTY.easy.pairsCount} pairs. Perfect for beginners or a quick game.`,
    url: '/pantone-color-match/classic/easy',
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Classic Easy Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Classic Easy Mode - Pantone Color Match',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Classic Easy Mode - Pantone Color Match',
    description: `A relaxed game of Pantone color matching gamewith just ${GAME_DIFFICULTY.easy.pairsCount} pairs. Perfect for beginners or a quick game.`,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Classic Easy Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Classic Easy Mode - Pantone Color Match',
      },
    ],
  },
};

export default function PantoneMatchEasyPage() {
  return (
    <>
      <GameHeader gameMode="classic" difficulty="easy" />
      <DifficultyNavigation basePath="/pantone-color-match/classic" />
      <PantoneMatchGame gameMode="classic" difficulty="easy" />
    </>
  );
}
