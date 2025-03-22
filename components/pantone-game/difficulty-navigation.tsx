'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GAME_DIFFICULTY } from '@/config/game';

import { Button } from '@/components/ui/button';

interface DifficultyNavigationProps {
  basePath?: string;
}

export function DifficultyNavigation({
  basePath = '/pantone-color-match',
}: DifficultyNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-3 md:mb-12">
      <Button
        asChild
        size="sm"
        variant={pathname === `${basePath}/easy` ? 'default' : 'outline'}
        className="flex gap-1">
        <Link href={`${basePath}/easy`}>
          Easy
          <span className="text-xs opacity-75">({GAME_DIFFICULTY.easy.pairsCount} pairs)</span>
        </Link>
      </Button>

      <Button
        asChild
        size="sm"
        variant={pathname === `${basePath}/medium` || pathname === basePath ? 'default' : 'outline'}
        className="flex gap-1">
        <Link href={`${basePath}/medium`}>
          Medium
          <span className="text-xs opacity-75">({GAME_DIFFICULTY.medium.pairsCount} pairs)</span>
        </Link>
      </Button>

      <Button
        asChild
        size="sm"
        variant={pathname === `${basePath}/hard` ? 'default' : 'outline'}
        className="flex gap-1">
        <Link href={`${basePath}/hard`}>
          Hard
          <span className="text-xs opacity-75">({GAME_DIFFICULTY.hard.pairsCount} pairs)</span>
        </Link>
      </Button>
    </div>
  );
}
