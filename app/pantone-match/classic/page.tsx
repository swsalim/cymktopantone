import { Metadata } from 'next';

import { GAME_DIFFICULTY } from '@/config/game';
import { siteConfig } from '@/config/site';

import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';
import { GameHeader } from '@/components/pantone-game/game-header';
import { PantoneMatchGame } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Classic Medium Mode - Pantone Color Match',
  description: `Balance challenge and fun with ${GAME_DIFFICULTY.medium.pairsCount} Pantone color pairs. Test your memory at a comfortable pace.`,
  keywords: 'pantone, color matching, memory game, classic mode, medium difficulty',
  authors: [{ name: 'CMYK to Pantone' }],
  alternates: {
    canonical: '/pantone-color-match/classic',
  },
  openGraph: {
    title: 'Classic Medium Mode - Pantone Color Match',
    description: `Balance challenge and fun with ${GAME_DIFFICULTY.medium.pairsCount} Pantone color pairs. Test your memory at a comfortable pace.`,
    url: '/pantone-color-match/classic',
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Classic Medium Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Classic Medium Mode - Pantone Color Match',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Classic Medium Mode - Pantone Color Match',
    description: `Balance challenge and fun with ${GAME_DIFFICULTY.medium.pairsCount} Pantone color pairs. Test your memory at a comfortable pace.`,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${'Classic Medium Mode - Pantone Color Match'}`,
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: 'Classic Medium Mode - Pantone Color Match',
      },
    ],
  },
};

export default function PantoneClassicPage() {
  return (
    <>
      <GameHeader gameMode="classic" difficulty="medium" />
      <DifficultyNavigation basePath="/pantone-color-match/classic" />
      <PantoneMatchGame gameMode="classic" difficulty="medium" />
    </>
  );
}
