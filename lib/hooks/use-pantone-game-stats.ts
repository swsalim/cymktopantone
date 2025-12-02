import { useCallback, useEffect, useState } from 'react';

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  winPercentage: number;
  currentStreak: number;
  maxStreak: number;
}

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  winPercentage: 0,
  currentStreak: 0,
  maxStreak: 0,
};

export function usePantoneGameStats(): {
  stats: GameStats;
  registerWin: () => void;
  registerLoss: () => void;
  resetStats: () => void;
} {
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);

  // Load stats from localStorage on component mount
  useEffect(() => {
    const storedStats = localStorage.getItem('pantoneGameStats');
    if (storedStats) {
      try {
        setStats(JSON.parse(storedStats));
      } catch (error) {
        console.error('Failed to parse game stats:', error);
        localStorage.removeItem('pantoneGameStats');
        setStats(DEFAULT_STATS);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pantoneGameStats', JSON.stringify(stats));
  }, [stats]);

  const registerWin = useCallback(() => {
    setStats((prevStats) => {
      const gamesPlayed = prevStats.gamesPlayed + 1;
      const gamesWon = prevStats.gamesWon + 1;
      const currentStreak = prevStats.currentStreak + 1;
      const maxStreak = Math.max(prevStats.maxStreak, currentStreak);
      const winPercentage = Math.round((gamesWon / gamesPlayed) * 100);

      return {
        gamesPlayed,
        gamesWon,
        winPercentage,
        currentStreak,
        maxStreak,
      };
    });
  }, []);

  const registerLoss = useCallback(() => {
    setStats((prevStats) => {
      const gamesPlayed = prevStats.gamesPlayed + 1;
      const winPercentage =
        prevStats.gamesWon > 0 ? Math.round((prevStats.gamesWon / gamesPlayed) * 100) : 0;

      return {
        ...prevStats,
        gamesPlayed,
        winPercentage,
        currentStreak: 0,
      };
    });
  }, []);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
  }, []);

  return {
    stats,
    registerWin,
    registerLoss,
    resetStats,
  };
}
