'use client';

import { createContext, ReactNode, useContext } from 'react';

import { useDailyPantoneChallenge } from '@/lib/hooks/use-daily-pantone-challenge';

interface DailyChallengeContextType {
  dailyColors: string[];
  hasPlayedToday: boolean;
  markAsPlayed: () => void;
  resetDailyStatus: () => void;
}

const DailyChallengeContext = createContext<DailyChallengeContextType | undefined>(undefined);

export function DailyChallengeProvider({
  children,
  pantoneColors,
}: {
  children: ReactNode;
  pantoneColors: string[];
}) {
  const dailyChallenge = useDailyPantoneChallenge(pantoneColors);

  return (
    <DailyChallengeContext.Provider value={dailyChallenge}>
      {children}
    </DailyChallengeContext.Provider>
  );
}

export function useDailyChallenge() {
  const context = useContext(DailyChallengeContext);
  if (context === undefined) {
    throw new Error('useDailyChallenge must be used within a DailyChallengeProvider');
  }
  return context;
}
