'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  DailyChallengeProvider,
  useDailyChallenge,
} from '@/app/components/pantone-match/daily-challenge-provider';
import { CalendarDays, Gamepad2, Timer } from 'lucide-react';

import { PMS } from '@/config/colors';

import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Wrapper } from '@/components/wrapper';

// Client component to display the layout content
function PantoneMatchNavigation() {
  const { hasPlayedToday } = useDailyChallenge();
  const pathname = usePathname();

  // Check if pathname starts with a particular base path
  const isActivePath = (basePath: string) =>
    pathname === basePath || pathname.startsWith(`${basePath}/`);

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-3">
      <Button
        asChild
        variant={isActivePath('/pantone-color-match/classic') ? 'default' : 'outline'}
        className="flex gap-2">
        <Link href="/pantone-color-match/classic">
          <Gamepad2 className="h-4 w-4" />
          Classic Mode
        </Link>
      </Button>

      <Button
        asChild
        variant={isActivePath('/pantone-color-match/challenge') ? 'default' : 'outline'}
        className="flex gap-2">
        <Link href="/pantone-color-match/challenge">
          <Timer className="h-4 w-4" />
          Challenge Mode
        </Link>
      </Button>

      <Button
        asChild
        variant={isActivePath('/pantone-color-match/daily') ? 'default' : 'outline'}
        className={cn('flex gap-2', hasPlayedToday && 'opacity-70')}>
        <Link href="/pantone-color-match/daily">
          <CalendarDays className="h-4 w-4" />
          Daily Challenge
          {hasPlayedToday && <span className="ml-1 text-xs opacity-70">(Completed)</span>}
        </Link>
      </Button>
    </div>
  );
}

export default function PantoneMatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Container>
        <DailyChallengeProvider pantoneColors={PMS}>
          <PantoneMatchNavigation />
          {children}
        </DailyChallengeProvider>
      </Container>
    </Wrapper>
  );
}
