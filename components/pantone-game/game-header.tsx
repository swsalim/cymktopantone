import { GAME_DIFFICULTY, GameMode } from '@/config/game';

interface GameHeaderProps {
  gameMode: GameMode;
  difficulty?: keyof typeof GAME_DIFFICULTY;
}

export function GameHeader({ gameMode, difficulty }: GameHeaderProps) {
  let title = 'Memory Match: Find the Pantone Pairs';
  let description =
    'Flip the cards to match identical Pantone color pairs. The fewer moves you make, the better your score!';

  // Customize title and description based on game mode and difficulty
  if (gameMode === 'classic') {
    if (difficulty === 'easy') {
      title = 'Classic Easy Mode - Pantone Memory Match';
      description = `A relaxed game of Pantone color matching with just ${GAME_DIFFICULTY.easy.pairsCount} pairs. Perfect for beginners or a quick game.`;
    } else if (difficulty === 'medium') {
      title = 'Classic Medium Mode - Pantone Memory Match';
      description = `Balance challenge and fun with ${GAME_DIFFICULTY.medium.pairsCount} Pantone color pairs. Test your memory at a comfortable pace.`;
    } else if (difficulty === 'hard') {
      title = 'Classic Hard Mode - Pantone Memory Match';
      description = `The ultimate memory challenge with ${GAME_DIFFICULTY.hard.pairsCount} Pantone color pairs. For those with a sharp eye for color.`;
    }
  } else if (gameMode === 'challenge') {
    if (difficulty === 'easy') {
      title = 'Easy Challenge Mode - Pantone Memory Match';
      description = `Find ${GAME_DIFFICULTY.easy.pairsCount} color pairs in ${GAME_DIFFICULTY.easy.timeLimit} seconds with only ${GAME_DIFFICULTY.easy.maxMoves} moves. A friendly challenge for beginners.`;
    } else if (difficulty === 'medium') {
      title = 'Medium Challenge Mode - Pantone Memory Match';
      description = `Match ${GAME_DIFFICULTY.medium.pairsCount} color pairs in ${GAME_DIFFICULTY.medium.timeLimit} seconds with ${GAME_DIFFICULTY.medium.maxMoves} moves. Race against time!`;
    } else if (difficulty === 'hard') {
      title = 'Hard Challenge Mode - Pantone Memory Match';
      description = `Can you match ${GAME_DIFFICULTY.hard.pairsCount} color pairs in just ${GAME_DIFFICULTY.hard.timeLimit} seconds with ${GAME_DIFFICULTY.hard.maxMoves} moves? For true color experts!`;
    }
  } else if (gameMode === 'daily') {
    title = 'Daily Challenge - Pantone Memory Match';
    description =
      "A fresh challenge every day! Match today's specially selected Pantone colors before time runs out.";
  }

  return (
    <div className="mb-8">
      <h1 className="mb-2 text-center text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="mx-auto max-w-2xl text-center text-gray-700">{description}</p>
    </div>
  );
}
