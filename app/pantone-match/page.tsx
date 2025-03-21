import { Metadata } from 'next';

import { PmsColors } from '@/components/pantone-game/pantone-match-game';

export const metadata: Metadata = {
  title: 'Pantone Match Game | Memory Match: Find the Pantone Pairs',
  description:
    'Play a memory card game with Pantone color pairs. Match color swatches, track your statistics, and challenge yourself with daily color sets.',
  keywords: 'pantone, color matching, memory game, color pairs, pantone match',
  authors: [{ name: 'CMYK to Pantone' }],
  openGraph: {
    title: 'Pantone Match Game | Memory Match: Find the Pantone Pairs',
    description:
      'Play a memory card game with Pantone color pairs. Match color swatches, track your statistics, and challenge yourself with daily color sets.',
    type: 'website',
  },
};

export default function PantoneMatchPage() {
  return <PmsColors />;
}
