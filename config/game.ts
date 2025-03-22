/**
 * Game difficulty settings
 */
export const GAME_DIFFICULTY = {
  easy: {
    maxMoves: 10,
    timeLimit: 120, // seconds
    pairsCount: 3,
  },
  medium: {
    maxMoves: 16,
    timeLimit: 90, // seconds
    pairsCount: 5,
  },
  hard: {
    maxMoves: 24,
    timeLimit: 60, // seconds
    pairsCount: 8,
  },
};

/**
 * Default game settings
 */
export const DEFAULT_GAME_SETTINGS = {
  maxMoves: GAME_DIFFICULTY.medium.maxMoves,
  timeLimit: GAME_DIFFICULTY.medium.timeLimit,
  difficulty: 'medium' as keyof typeof GAME_DIFFICULTY,
};

/**
 * Game modes
 */
export type GameMode = 'classic' | 'challenge' | 'daily';
