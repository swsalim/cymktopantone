'use client';

import { useEffect, useRef, useState } from 'react';

import { useDailyChallenge } from '@/app/components/pantone-match/daily-challenge-provider';
import { track } from '@vercel/analytics';
import { Clock, RefreshCw, Zap } from 'lucide-react';

import { PMS } from '@/config/colors';
import { DEFAULT_GAME_SETTINGS, GAME_DIFFICULTY, GameMode } from '@/config/game';

import { usePantoneGameStats } from '@/lib/hooks/use-pantone-game-stats';
import { usePantoneMatchGame } from '@/lib/hooks/use-pantone-match-game';

import { Container } from '@/components/container';
import { GameCard } from '@/components/pantone-game/game-card';
import { GameCompleteModal } from '@/components/pantone-game/game-complete-modal';
import { GameStatsCard } from '@/components/pantone-game/game-stats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

interface PantoneMatchGameProps {
  gameMode: GameMode;
  difficulty?: keyof typeof GAME_DIFFICULTY;
}

// Noop function for non-daily modes
const noop = () => {
  // Intentionally empty
};

// Default daily values for non-daily game modes
const defaultDailyValues = {
  dailyColors: [],
  hasPlayedToday: false,
  markAsPlayed: noop,
  resetDailyStatus: noop,
};

// Define the type for the daily challenge
interface DailyChallenge {
  dailyColors: string[];
  hasPlayedToday: boolean;
  markAsPlayed: () => void;
  resetDailyStatus: () => void;
}

// Daily mode wrapper to properly use the context
function DailyModeWrapper({
  children,
}: {
  children: (dailyChallenge: DailyChallenge) => React.ReactNode;
}) {
  const dailyChallenge = useDailyChallenge();
  return <>{children(dailyChallenge)}</>;
}

export function PantoneMatchGame({
  gameMode,
  difficulty = DEFAULT_GAME_SETTINGS.difficulty,
}: PantoneMatchGameProps) {
  // Flag to track component mounted state
  const isMountedRef = useRef(true);

  // Set isMounted to false on cleanup
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Render the appropriate game based on mode
  if (gameMode === 'daily') {
    return (
      <DailyModeWrapper>
        {(dailyChallenge) => (
          <PantoneMatchGameContent
            gameMode={gameMode}
            difficulty={difficulty}
            dailyChallenge={dailyChallenge}
          />
        )}
      </DailyModeWrapper>
    );
  }

  // For non-daily modes, use default values
  return (
    <PantoneMatchGameContent
      gameMode={gameMode}
      difficulty={difficulty}
      dailyChallenge={defaultDailyValues}
    />
  );
}

// The actual game content component
function PantoneMatchGameContent({
  gameMode,
  difficulty,
  dailyChallenge,
}: {
  gameMode: GameMode;
  difficulty: keyof typeof GAME_DIFFICULTY;
  dailyChallenge: DailyChallenge;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

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

  // Use daily challenge data
  const { dailyColors, markAsPlayed } = dailyChallenge;

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

    // Track game start event
    track(`game_start_${gameMode}_${difficulty}`);
  }, [gameMode, dailyColors, difficulty]);

  // Determine if we should apply limits based on game mode
  const shouldApplyLimits = gameMode === 'challenge' || gameMode === 'daily';

  // Game state with the selected colors and difficulty settings
  const { gameState, handleCardClick, resetGame, gameTime, timeRemaining, updateGameSettings } =
    usePantoneMatchGame(selectedColors, {
      maxMoves: shouldApplyLimits ? GAME_DIFFICULTY[difficulty].maxMoves : undefined,
      timeLimit: shouldApplyLimits ? GAME_DIFFICULTY[difficulty].timeLimit : undefined,
    });

  // Wrap the handleCardClick function to add analytics
  const handleCardClickWithAnalytics = (cardId: string) => {
    handleCardClick(cardId);

    // Only track first card flip to avoid excessive events
    if (gameState.flippedCards.length === 0) {
      track(`card_flip_${gameMode}`);
    }
  };

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

            // Track win event with game stats
            track(`game_win_${gameMode}_${difficulty}`);
            track(`game_complete_time_${gameTime}s`);
            track(`game_complete_moves_${gameState.moves}`);

            // Mark daily challenge as played if in daily mode
            if (gameMode === 'daily') {
              markAsPlayed();
              track('daily_challenge_completed');
            }
          } else {
            // Register loss in stats
            registerLoss();

            // Track loss event with reason
            const lossReason =
              gameState.timeLimit && timeRemaining !== null && timeRemaining <= 0
                ? 'timeout'
                : 'max_moves';
            track(`game_loss_${gameMode}_${difficulty}_${lossReason}`);

            // Mark daily challenge as played if in daily mode
            if (gameMode === 'daily') {
              markAsPlayed();
              track('daily_challenge_attempted');
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
    difficulty,
    gameState.timeLimit,
  ]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNewGame = () => {
    if (gameMode === 'classic' || gameMode === 'challenge') {
      // Generate new random colors
      const pairsCount = GAME_DIFFICULTY[difficulty].pairsCount;
      const randomColors = [...PMS].sort(() => Math.random() - 0.5).slice(0, pairsCount);
      setSelectedColors(randomColors);
    }
    resetGame();
    track(`new_game_${gameMode}_${difficulty}`);
  };

  const handlePlayAgain = () => {
    handleNewGame();
    setIsModalOpen(false);
    track(`play_again_${gameMode}_${difficulty}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    track('game_results_closed');
  };

  return (
    <Wrapper>
      <Container>
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
                  <span className="text-sm font-medium text-gray-500">/ {gameState.maxMoves}</span>
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
                  <span className="text-sm font-medium text-gray-500">
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

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {gameState.cards.map((card) => (
            <GameCard key={card.id} card={card} onClick={handleCardClickWithAnalytics} />
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
