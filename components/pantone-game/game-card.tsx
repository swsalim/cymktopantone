'use client';

import { memo } from 'react';

import { motion } from 'framer-motion';

import { convertPantoneToHex } from '@/lib/colors';
import { Card } from '@/lib/hooks/use-pantone-match-game';

interface GameCardProps {
  card: Card;
  onClick: (id: string) => void;
}

function GameCardComponent({ card, onClick }: GameCardProps) {
  const { id, pantoneColor, isFlipped, isMatched } = card;

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  // Get hex color for the Pantone color
  const hexColor = `#${convertPantoneToHex(pantoneColor)}`;

  return (
    <div
      className="perspective-1000 aspect-square relative h-32 w-full cursor-pointer"
      onClick={handleClick}>
      <motion.div
        className="transform-style-3d relative h-full w-full transition-transform duration-100"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isMatched ? 0.95 : 1,
        }}
        transition={{
          duration: 0.2,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}>
        {/* Back of card (shown first) */}
        <div
          className="backface-hidden absolute inset-0 flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-100 shadow-md"
          style={{
            backfaceVisibility: 'hidden',
          }}>
          <span className="text-lg font-semibold text-gray-400">?</span>
        </div>

        {/* Front of card (Pantone color) */}
        <motion.div
          className="backface-hidden absolute inset-0 flex h-full w-full items-center justify-center rounded-lg border border-gray-200 p-2 text-center text-xs font-medium shadow-md sm:text-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: hexColor,
          }}
          animate={{
            boxShadow: isMatched ? '0 0 15px rgba(255, 255, 255, 0.8)' : 'none',
          }}
          transition={{ duration: 0.3 }}>
          <motion.div
            className="relative z-10 line-clamp-2"
            animate={{
              scale: isMatched ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}>
            {pantoneColor}
          </motion.div>
          {isMatched && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Use memo to prevent unnecessary re-renders
export const GameCard = memo(GameCardComponent);
