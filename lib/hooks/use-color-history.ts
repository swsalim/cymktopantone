import { useEffect, useState } from 'react';

export interface ColorHistoryItem {
  id: string;
  sourceColor: string;
  targetColor: string;
  sourceValue: string;
  targetValue: string;
  timestamp: number;
}

export interface ColorHistoryState {
  items: ColorHistoryItem[];
  addToHistory: (item: Omit<ColorHistoryItem, 'id' | 'timestamp'>) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

export function useColorHistory(converterType: string): ColorHistoryState {
  const [history, setHistory] = useState<ColorHistoryItem[]>([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem(`colorHistory-${converterType}`);
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Failed to parse color history:', error);
        localStorage.removeItem(`colorHistory-${converterType}`);
      }
    }
  }, [converterType]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`colorHistory-${converterType}`, JSON.stringify(history));
  }, [history, converterType]);

  // Add a color to history if it doesn't already exist
  const addToHistory = (item: Omit<ColorHistoryItem, 'id' | 'timestamp'>) => {
    // Use a functional update to avoid unnecessary re-renders
    setHistory((prevHistory) => {
      // Check if identical color combination already exists
      const exists = prevHistory.some(
        (historyItem) =>
          historyItem.sourceValue === item.sourceValue &&
          historyItem.targetValue === item.targetValue,
      );

      if (exists) return prevHistory;

      // Add new item with unique ID
      const newItem: ColorHistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };

      // Limit history to 5 items (removing oldest first)
      const updatedHistory = [newItem, ...prevHistory];
      if (updatedHistory.length > 5) {
        return updatedHistory.slice(0, 5);
      }
      return updatedHistory;
    });
  };

  // Remove a color from history by ID
  const removeFromHistory = (id: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
  };

  return {
    items: history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
