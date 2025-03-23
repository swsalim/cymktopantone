'use client';

import { useEffect, useState } from 'react';

import { AlertTriangle, Shuffle, Timer, Trophy } from 'lucide-react';

import { saEvent } from '@/lib/analytics';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ShareResults } from './share-results';

interface GameCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  moves: number;
  timeInSeconds: number;
  gameMode: string;
  isWin: boolean;
  difficulty?: string;
  maxMoves?: number;
  timeLimit?: number;
}

export function GameCompleteModal({
  isOpen,
  onClose,
  onPlayAgain,
  moves,
  timeInSeconds,
  gameMode,
  isWin,
  difficulty,
  maxMoves,
  timeLimit,
}: GameCompleteModalProps) {
  // Client-side only state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Store the final stats when the modal opens
  const [finalStats, setFinalStats] = useState({
    moves,
    timeInSeconds,
  });

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track when modal is opened
  useEffect(() => {
    if (isOpen && isMounted) {
      setFinalStats({
        moves,
        timeInSeconds,
      });

      // Track modal view event
      if (isWin) {
        saEvent(`results_view_win_${gameMode}${difficulty ? `_${difficulty}` : ''}`);
      } else {
        const lossReason = getLossReasonType();
        saEvent(`results_view_loss_${gameMode}${difficulty ? `_${difficulty}` : ''}_${lossReason}`);
      }
    }
  }, [isOpen, moves, timeInSeconds, isMounted, gameMode, difficulty, isWin]);

  // Get loss reason for analytics
  const getLossReasonType = () => {
    if (!isWin) {
      if (maxMoves && moves > maxMoves) {
        return 'out_of_moves';
      } else if (timeLimit && timeInSeconds >= timeLimit) {
        return 'out_of_time';
      }
      return 'other';
    }
    return '';
  };

  // Handle the play again button click properly
  const handlePlayAgain = () => {
    // Track play again event
    saEvent(`play_again_from_results_${gameMode}${difficulty ? `_${difficulty}` : ''}`);

    // Close the modal first
    onClose();

    // Then start new game after a short delay
    setTimeout(onPlayAgain, 50);
  };

  // Handle dialog close event
  const handleOpenChange = (open: boolean) => {
    if (open !== isOpen && !open) {
      saEvent('results_modal_dismissed');
      onClose();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine loss reason
  const getLossReason = () => {
    if (!isWin) {
      if (maxMoves && moves > maxMoves) {
        return 'You ran out of moves!';
      } else if (timeLimit && timeInSeconds >= timeLimit) {
        return 'You ran out of time!';
      }
      return 'Game over!';
    }
    return '';
  };

  // Determine game mode display text
  const getGameModeDisplay = () => {
    if (gameMode === 'daily') return 'Daily Challenge';
    const displayDifficulty = difficulty || 'medium';
    return `${gameMode.charAt(0).toUpperCase() + gameMode.slice(1)} - ${displayDifficulty.charAt(0).toUpperCase() + displayDifficulty.slice(1)}`;
  };

  // Determine if limits apply to this game mode
  const hasLimits = gameMode === 'challenge' || gameMode === 'daily';

  // Prevent rendering until client-side
  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-xl">
            {isWin ? (
              <>
                <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
                Game Complete!
              </>
            ) : (
              <>
                <AlertTriangle className="mr-2 h-6 w-6 text-red-500" />
                Game Over
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isWin
              ? gameMode === 'classic'
                ? "You've matched all the Pantone pairs in classic mode!"
                : gameMode === 'challenge'
                  ? "You've completed the challenge and matched all pairs!"
                  : "You've completed today's daily challenge!"
              : getLossReason()}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center space-y-1 rounded-lg border p-2 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Game Mode
              </span>
              <span className="text-lg font-bold capitalize">{getGameModeDisplay()}</span>
            </div>
            <div className="flex flex-col items-center space-y-1 rounded-lg border p-2 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</span>
              <span className="text-lg font-bold">{formatTime(finalStats.timeInSeconds)}</span>
              {hasLimits && timeLimit && (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Limit: {formatTime(timeLimit)}
                </span>
              )}
            </div>
            <div className="col-span-2 flex flex-col items-center space-y-1 rounded-lg border p-2 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Moves</span>
              <span className="text-lg font-bold">{finalStats.moves}</span>
              {hasLimits && maxMoves && (
                <span className="text-xs font-medium text-gray-500">Limit: {maxMoves}</span>
              )}
            </div>
          </div>

          {!isWin && hasLimits && (
            <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500 dark:text-red-500">
              {getLossReason() === 'You ran out of moves!' ? (
                <div className="flex items-center justify-center gap-2">
                  <Shuffle className="h-4 w-4 text-red-500" />
                  <span>You exceeded the {maxMoves} move limit.</span>
                </div>
              ) : getLossReason() === 'You ran out of time!' ? (
                <div className="flex items-center justify-center gap-2">
                  <Timer className="h-4 w-4 text-red-500" />
                  <span>You exceeded the {formatTime(timeLimit || 0)} time limit.</span>
                </div>
              ) : (
                <span>Better luck next time!</span>
              )}
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="default" onClick={handlePlayAgain}>
            Play Again
          </Button>
          <ShareResults
            moves={finalStats.moves}
            timeInSeconds={finalStats.timeInSeconds}
            gameMode={gameMode}
            isWin={isWin}
            onShare={() =>
              saEvent(`share_results_${gameMode}${difficulty ? `_${difficulty}` : ''}`)
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
