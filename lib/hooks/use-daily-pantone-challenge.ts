'use client';

import { useEffect, useState } from 'react';

// Using a date string as the key in the format YYYY-MM-DD
const getDailyKey = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate(),
  ).padStart(2, '0')}`;
};

export function useDailyPantoneChallenge(pantoneColors: string[]): {
  dailyColors: string[];
  hasPlayedToday: boolean;
  markAsPlayed: () => void;
  resetDailyStatus: () => void;
} {
  const [dailyColors, setDailyColors] = useState<string[]>([]);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  const generateDailyColors = () => {
    if (!pantoneColors.length) return;

    // Create a deterministic but seemingly random set of colors based on the date
    const dailyKey = getDailyKey();
    const seed = Array.from(dailyKey).reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Fisher-Yates shuffle with seeded random
    const shuffled = [...pantoneColors];
    const seededRandom = (n: number) => {
      const x = Math.sin(seed + n) * 10000;
      return x - Math.floor(x);
    };

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(i) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Get 8 colors (for 16 cards total - 8 pairs)
    const selectedColors = shuffled.slice(0, 8);

    // Save to localStorage
    const dailyData = {
      colors: selectedColors,
      played: false,
    };

    localStorage.setItem(`pantoneDaily-${dailyKey}`, JSON.stringify(dailyData));
    setDailyColors(selectedColors);
    setHasPlayedToday(false);
  };

  const markAsPlayed = () => {
    const dailyKey = getDailyKey();
    const savedData = localStorage.getItem(`pantoneDaily-${dailyKey}`);

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        data.played = true;
        localStorage.setItem(`pantoneDaily-${dailyKey}`, JSON.stringify(data));
        setHasPlayedToday(true);
      } catch (error) {
        console.error('Failed to mark daily challenge as played:', error);
      }
    }
  };

  const resetDailyStatus = () => {
    const dailyKey = getDailyKey();
    const savedData = localStorage.getItem(`pantoneDaily-${dailyKey}`);

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        data.played = false;
        localStorage.setItem(`pantoneDaily-${dailyKey}`, JSON.stringify(data));
        setHasPlayedToday(false);
      } catch (error) {
        console.error('Failed to reset daily challenge status:', error);
      }
    }
  };

  useEffect(() => {
    if (!pantoneColors.length) return;

    const dailyKey = getDailyKey();
    const savedData = localStorage.getItem(`pantoneDaily-${dailyKey}`);

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setDailyColors(data.colors);
        setHasPlayedToday(data.played);
      } catch (error) {
        console.error('Failed to parse daily challenge data:', error);
        generateDailyColors();
      }
    } else {
      generateDailyColors();
    }
  }, [pantoneColors, generateDailyColors]);

  return {
    dailyColors,
    hasPlayedToday,
    markAsPlayed,
    resetDailyStatus,
  };
}
