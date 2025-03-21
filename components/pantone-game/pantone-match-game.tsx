'use client';

import { useEffect, useRef, useState } from 'react';

import { CalendarDays, Clock, Gamepad2, RefreshCw, Timer, Zap } from 'lucide-react';

import { PMS } from '@/config/colors';
import { DEFAULT_GAME_SETTINGS, GAME_DIFFICULTY, GameMode } from '@/config/game';

import { useDailyPantoneChallenge } from '@/lib/hooks/use-daily-pantone-challenge';
import { usePantoneGameStats } from '@/lib/hooks/use-pantone-game-stats';
import { usePantoneMatchGame } from '@/lib/hooks/use-pantone-match-game';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

import { GameCard } from './game-card';
import { GameCompleteModal } from './game-complete-modal';
import { GameStatsCard } from './game-stats';

export function PmsColors() {
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<keyof typeof GAME_DIFFICULTY>(
    DEFAULT_GAME_SETTINGS.difficulty,
  );

  // Flag to track if we've processed the game completion for this game
  const hasProcessedGameCompletion = useRef(false);
  // Flag to track component mounted state
  const isMountedRef = useRef(true);

  // Set isMounted to false on cleanup
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Stats from localStorage
  const { stats, registerWin, registerLoss, resetStats } = usePantoneGameStats();

  // Daily challenge from localStorage
  const { dailyColors, hasPlayedToday, markAsPlayed, resetDailyStatus } =
    useDailyPantoneChallenge(PMS);

  // Initialize with a random selection for classic/challenge mode
  useEffect(() => {
    if (gameMode === 'classic' || gameMode === 'challenge') {
      // Initialize with random colors based on difficulty
      const pairsCount = GAME_DIFFICULTY[difficulty].pairsCount;
      const randomColors = [...PMS].sort(() => Math.random() - 0.5).slice(0, pairsCount);
      setSelectedColors(randomColors);
    } else if (gameMode === 'daily') {
      // Use daily colors for daily mode
      setSelectedColors(dailyColors);
    }
  }, [gameMode, dailyColors, difficulty]);

  // Determine if we should apply limits based on game mode
  const shouldApplyLimits = gameMode === 'challenge' || gameMode === 'daily';

  // Game state with the selected colors and difficulty settings
  const { gameState, handleCardClick, resetGame, gameTime, timeRemaining, updateGameSettings } =
    usePantoneMatchGame(selectedColors, {
      maxMoves: shouldApplyLimits ? GAME_DIFFICULTY[difficulty].maxMoves : undefined,
      timeLimit: shouldApplyLimits ? GAME_DIFFICULTY[difficulty].timeLimit : undefined,
    });

  // Update game settings when difficulty or mode changes
  useEffect(() => {
    const newMaxMoves = shouldApplyLimits ? GAME_DIFFICULTY[difficulty].maxMoves : undefined;
    const newTimeLimit = shouldApplyLimits ? GAME_DIFFICULTY[difficulty].timeLimit : undefined;

    // Skip update if game is over - let game restart trigger the settings change
    if (gameState.isGameOver) return;

    // Compare with current settings to avoid unnecessary updates
    if (newMaxMoves !== gameState.maxMoves || newTimeLimit !== gameState.timeLimit) {
      updateGameSettings({
        maxMoves: newMaxMoves,
        timeLimit: newTimeLimit,
      });
    }
  }, [
    difficulty,
    gameMode,
    shouldApplyLimits,
    updateGameSettings,
    gameState.maxMoves,
    gameState.timeLimit,
    gameState.isGameOver,
  ]);

  // Reset the completion flag when starting a new game
  useEffect(() => {
    hasProcessedGameCompletion.current = false;
  }, [selectedColors]);

  // Handle game completion
  useEffect(() => {
    if (gameState.isGameOver && !hasProcessedGameCompletion.current) {
      // Mark that we've processed this game completion
      hasProcessedGameCompletion.current = true;

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        // Open the modal immediately
        setIsModalOpen(true);

        // Register stats with a small delay to ensure UI is responsive first
        setTimeout(() => {
          // Check again if component is still mounted before the timeout executes
          if (!isMountedRef.current) return;

          if (gameState.isWin) {
            // Register win in stats
            registerWin();

            // Mark daily challenge as played if in daily mode
            if (gameMode === 'daily') {
              markAsPlayed();
            }
          } else {
            // Register loss in stats
            registerLoss();

            // Mark daily challenge as played if in daily mode
            if (gameMode === 'daily') {
              markAsPlayed();
            }
          }
        }, 100);
      }
    }
  }, [
    gameState.isGameOver,
    gameState.isWin,
    gameState.matchedPairs,
    gameState.totalPairs,
    gameMode,
    registerWin,
    registerLoss,
    markAsPlayed,
    gameTime,
    gameState.moves,
    timeRemaining,
  ]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  };

  const handleNewGame = () => {
    if (gameMode === 'classic' || gameMode === 'challenge') {
      // Generate new random colors
      const pairsCount = GAME_DIFFICULTY[difficulty].pairsCount;
      const randomColors = [...PMS].sort(() => Math.random() - 0.5).slice(0, pairsCount);
      setSelectedColors(randomColors);
    }
    resetGame();
  };

  const handlePlayAgain = () => {
    // Just start a new game
    handleNewGame();
  };

  const handleDifficultyChange = (newDifficulty: keyof typeof GAME_DIFFICULTY) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Container>
        <div className="mb-8">
          <h1 className="mb-2 text-center text-3xl font-bold md:text-4xl">
            Memory Match: Find the Pantone Pairs
          </h1>
          <p className="mx-auto max-w-2xl text-center text-gray-700">
            Flip the cards to match identical Pantone color pairs. The fewer moves you make, the
            better your score!
          </p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <Button
            variant={gameMode === 'classic' ? 'default' : 'outline'}
            onClick={() => handleModeChange('classic')}
            className="flex gap-2">
            <Gamepad2 className="h-4 w-4" />
            Classic Mode
          </Button>
          <Button
            variant={gameMode === 'challenge' ? 'default' : 'outline'}
            onClick={() => handleModeChange('challenge')}
            className="flex gap-2">
            <Timer className="h-4 w-4" />
            Challenge Mode
          </Button>
          <Button
            variant={gameMode === 'daily' ? 'default' : 'outline'}
            onClick={() => handleModeChange('daily')}
            disabled={hasPlayedToday}
            className="flex gap-2">
            <CalendarDays className="h-4 w-4" />
            Daily Challenge
            {hasPlayedToday && <span className="ml-1 text-xs opacity-70">(Completed)</span>}
          </Button>
        </div>

        {(gameMode === 'classic' || gameMode === 'challenge') && (
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Button
              size="sm"
              variant={difficulty === 'easy' ? 'default' : 'outline'}
              onClick={() => handleDifficultyChange('easy')}
              className="flex gap-1">
              Easy
              <span className="text-xs opacity-75">({GAME_DIFFICULTY.easy.pairsCount} pairs)</span>
            </Button>
            <Button
              size="sm"
              variant={difficulty === 'medium' ? 'default' : 'outline'}
              onClick={() => handleDifficultyChange('medium')}
              className="flex gap-1">
              Medium
              <span className="text-xs opacity-75">
                ({GAME_DIFFICULTY.medium.pairsCount} pairs)
              </span>
            </Button>
            <Button
              size="sm"
              variant={difficulty === 'hard' ? 'default' : 'outline'}
              onClick={() => handleDifficultyChange('hard')}
              className="flex gap-1">
              Hard
              <span className="text-xs opacity-75">({GAME_DIFFICULTY.hard.pairsCount} pairs)</span>
            </Button>
          </div>
        )}

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Moves</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 pt-0">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-2xl font-bold">{gameState.moves}</span>
                {shouldApplyLimits && gameState.maxMoves && (
                  <span className="text-muted-foreground text-sm">/ {gameState.maxMoves}</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">
                {shouldApplyLimits && gameState.timeLimit ? 'Time Left' : 'Time'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 pt-0">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-2xl font-bold">
                  {shouldApplyLimits && gameState.timeLimit
                    ? formatTime(timeRemaining || 0)
                    : formatTime(gameTime)}
                </span>
                {shouldApplyLimits && gameState.timeLimit && (
                  <span className="text-muted-foreground text-sm">
                    / {formatTime(gameState.timeLimit)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Pairs</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 pt-0">
              <div className="text-2xl font-bold">
                {gameState.matchedPairs} / {gameState.totalPairs}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Mode</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 pt-0">
              <div className="text-xl font-bold capitalize">
                {gameMode === 'daily' ? 'Daily' : `${gameMode} - ${difficulty}`}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Button variant="outline" onClick={handleNewGame} className="flex gap-2">
            <RefreshCw className="h-4 w-4" />
            New Game
          </Button>
        </div>

        <div className="mb-10 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
          {gameState.cards.map((card) => (
            <GameCard key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>

        <GameStatsCard stats={stats} onReset={resetStats} className="mb-6" />

        <GameCompleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onPlayAgain={handlePlayAgain}
          moves={gameState.moves}
          timeInSeconds={gameTime}
          gameMode={gameMode}
          isWin={gameState.isWin}
          difficulty={difficulty}
          maxMoves={gameState.maxMoves}
          timeLimit={gameState.timeLimit}
        />
      </Container>
    </Wrapper>
  );
}
