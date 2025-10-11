import { useEffect, useRef, useState } from 'react';

export interface Card {
  id: string;
  pantoneColor: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  totalPairs: number;
  moves: number;
  isGameOver: boolean;
  isWin: boolean;
  startTime: number | null;
  endTime: number | null;
  maxMoves?: number;
  timeLimit?: number;
}

interface GameOptions {
  maxMoves?: number;
  timeLimit?: number;
}

export function usePantoneMatchGame(colorSet: string[], options?: GameOptions) {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 0,
    moves: 0,
    isGameOver: false,
    isWin: false,
    startTime: null,
    endTime: null,
    maxMoves: options?.maxMoves,
    timeLimit: options?.timeLimit,
  });
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const checkMatchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isGameMountedRef = useRef(true);

  // Initialize game with provided colors
  useEffect(() => {
    // Reset mounted state to true when colors change
    isGameMountedRef.current = true;

    if (colorSet.length > 0) {
      initializeGame(colorSet);
    }

    // Cleanup function for component unmount
    return () => {
      isGameMountedRef.current = false;

      // Clear all timers
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (checkMatchTimeoutRef.current) {
        clearTimeout(checkMatchTimeoutRef.current);
        checkMatchTimeoutRef.current = null;
      }
    };
  }, [colorSet]);

  // Update the timer every second
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!gameState.startTime || gameState.isGameOver) {
      // If game is over, ensure we do final cleanup
      if (gameState.isGameOver) {
        // Cancel any pending match checks
        if (checkMatchTimeoutRef.current) {
          clearTimeout(checkMatchTimeoutRef.current);
          checkMatchTimeoutRef.current = null;
        }

        // Set the final time if game is over
        if (gameState.endTime && gameState.startTime) {
          const finalTime = Math.floor((gameState.endTime - gameState.startTime) / 1000);
          setCurrentTime(finalTime);
        }
      }
      return;
    }

    // Store the start time in a variable to avoid dependency on gameState
    const startTime = gameState.startTime || 0;
    const timeLimit = gameState.timeLimit;

    timerRef.current = setInterval(() => {
      if (!isGameMountedRef.current) return;

      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setCurrentTime(elapsedSeconds);

      // Check if time limit is reached - store isGameOver in a local var to avoid dependency issues
      const isGameOver = gameState.isGameOver;
      if (timeLimit && elapsedSeconds >= timeLimit && !isGameOver) {
        // Game over due to time limit - update state directly
        if (isGameMountedRef.current) {
          setGameState((prevState) => {
            // Don't update if already game over (prevent duplicate updates)
            if (prevState.isGameOver) return prevState;

            return {
              ...prevState,
              isGameOver: true,
              isWin: false,
              endTime: Date.now(),
            };
          });
        }

        // Clear the timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState.startTime, gameState.isGameOver, gameState.endTime, gameState.timeLimit]);

  const initializeGame = (colors: string[]) => {
    // Cancel any pending timeouts
    if (checkMatchTimeoutRef.current) {
      clearTimeout(checkMatchTimeoutRef.current);
      checkMatchTimeoutRef.current = null;
    }

    // Create pairs of cards for each color
    const cardPairs = colors.flatMap((color) => [
      {
        id: `${color}-1`,
        pantoneColor: color,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${color}-2`,
        pantoneColor: color,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    // Shuffle the cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);

    setGameState((prev) => ({
      cards: shuffledCards,
      flippedCards: [],
      matchedPairs: 0,
      totalPairs: colors.length,
      moves: 0,
      isGameOver: false,
      isWin: false,
      startTime: Date.now(),
      endTime: null,
      maxMoves: prev.maxMoves, // Keep the maxMoves setting
      timeLimit: prev.timeLimit, // Keep the timeLimit setting
    }));
    setCurrentTime(0);
  };

  const handleCardClick = (cardId: string) => {
    if (gameState.isGameOver) return;

    const { cards, flippedCards, maxMoves, moves } = gameState;

    // Find the clicked card
    const clickedCard = cards.find((card) => card.id === cardId);

    // Ignore if card doesn't exist, is already flipped, or is already matched
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Don't allow clicking while waiting for a pair to be resolved
    if (flippedCards.length === 2) return;

    // Flip the card
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card,
    );

    const updatedFlippedCards = [...flippedCards, clickedCard];

    // Check for match if two cards are flipped
    if (updatedFlippedCards.length === 2) {
      // Count as a move when two cards are flipped
      const updatedMoves = moves + 1;

      // Check if max moves is reached - handle in a single state update
      if (maxMoves && updatedMoves > maxMoves) {
        setGameState((prevState) => ({
          ...prevState,
          cards: updatedCards,
          flippedCards: updatedFlippedCards,
          moves: updatedMoves,
          isGameOver: true,
          isWin: false,
          endTime: Date.now(),
        }));
        return;
      }

      setGameState((prevState) => ({
        ...prevState,
        cards: updatedCards,
        flippedCards: updatedFlippedCards,
        moves: updatedMoves,
      }));

      // Clear any existing check match timeout
      if (checkMatchTimeoutRef.current) {
        clearTimeout(checkMatchTimeoutRef.current);
      }

      // Check for match after a short delay
      checkMatchTimeoutRef.current = setTimeout(() => {
        // Only proceed if component is still mounted
        if (isGameMountedRef.current) {
          checkForMatch();
        }
        checkMatchTimeoutRef.current = null;
      }, 1000);
    } else {
      // Just update the flipped card
      setGameState((prevState) => ({
        ...prevState,
        cards: updatedCards,
        flippedCards: updatedFlippedCards,
      }));
    }
  };

  const checkForMatch = () => {
    if (!isGameMountedRef.current) return;

    // Reset the timeout ref
    checkMatchTimeoutRef.current = null;

    // Check for match and handle game completion in a single state update
    setGameState((prevState) => {
      const { cards, flippedCards, matchedPairs, totalPairs } = prevState;

      if (flippedCards.length !== 2) return prevState;

      const [firstCard, secondCard] = flippedCards;
      const isMatch = firstCard.pantoneColor === secondCard.pantoneColor;

      // Update cards
      const updatedCards = cards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return {
            ...card,
            isFlipped: isMatch, // Keep matched cards flipped, flip back unmatched cards
            isMatched: isMatch ? true : card.isMatched,
          };
        }
        return card;
      });

      const newMatchedPairs = isMatch ? matchedPairs + 1 : matchedPairs;
      const isGameOver = newMatchedPairs === totalPairs;
      const endTime = isGameOver ? Date.now() : null;
      const isWin = isGameOver;

      // Return the updated state
      return {
        ...prevState,
        cards: updatedCards,
        flippedCards: [],
        matchedPairs: newMatchedPairs,
        isGameOver,
        isWin,
        endTime,
      };
    });

    // No need for additional setTimeout to check for game completion
    // Game over state is already handled in the state update above
  };

  const resetGame = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Clear any pending match check
    if (checkMatchTimeoutRef.current) {
      clearTimeout(checkMatchTimeoutRef.current);
      checkMatchTimeoutRef.current = null;
    }

    if (colorSet.length > 0) {
      initializeGame(colorSet);
    }
  };

  // Update game settings
  const updateGameSettings = (settings: GameOptions) => {
    // Check if component is still mounted before updating state
    if (!isGameMountedRef.current) return;

    // Compare with current settings to avoid unnecessary updates
    setGameState((prev) => {
      const newMaxMoves = settings.maxMoves !== undefined ? settings.maxMoves : prev.maxMoves;
      const newTimeLimit = settings.timeLimit !== undefined ? settings.timeLimit : prev.timeLimit;

      // Only update if values actually changed
      if (newMaxMoves === prev.maxMoves && newTimeLimit === prev.timeLimit) {
        return prev; // No change needed
      }

      return {
        ...prev,
        maxMoves: newMaxMoves,
        timeLimit: newTimeLimit,
      };
    });
  };

  // Use the currentTime state for real-time updates
  const gameTime =
    gameState.isGameOver && gameState.endTime && gameState.startTime
      ? Math.floor((gameState.endTime - gameState.startTime) / 1000)
      : currentTime;

  // Calculate time remaining when there's a time limit
  const timeRemaining = gameState.timeLimit ? Math.max(0, gameState.timeLimit - currentTime) : null;

  return {
    gameState,
    handleCardClick,
    resetGame,
    updateGameSettings,
    gameTime,
    timeRemaining,
  };
}
