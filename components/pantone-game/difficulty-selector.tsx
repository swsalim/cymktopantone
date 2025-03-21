'use client';

import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { GAME_DIFFICULTY } from '@/config/game';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DifficultyInfo {
  value: string;
  label: string;
  description: string;
}

const difficultyLevels: DifficultyInfo[] = [
  {
    value: 'easy',
    label: 'Easy',
    description: `${GAME_DIFFICULTY.easy.pairsCount} pairs, ${GAME_DIFFICULTY.easy.maxMoves} moves, ${GAME_DIFFICULTY.easy.timeLimit}s`,
  },
  {
    value: 'medium',
    label: 'Medium',
    description: `${GAME_DIFFICULTY.medium.pairsCount} pairs, ${GAME_DIFFICULTY.medium.maxMoves} moves, ${GAME_DIFFICULTY.medium.timeLimit}s`,
  },
  {
    value: 'hard',
    label: 'Hard',
    description: `${GAME_DIFFICULTY.hard.pairsCount} pairs, ${GAME_DIFFICULTY.hard.maxMoves} moves, ${GAME_DIFFICULTY.hard.timeLimit}s`,
  },
];

interface DifficultySelectorProps {
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export function DifficultySelector({ difficulty, onDifficultyChange }: DifficultySelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-[200px]">
          {difficulty
            ? difficultyLevels.find((level) => level.value === difficulty)?.label
            : 'Select difficulty...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[200px]">
        <Command>
          <CommandInput placeholder="Search difficulty..." />
          <CommandEmpty>No difficulty found.</CommandEmpty>
          <CommandGroup>
            {difficultyLevels.map((level) => (
              <CommandItem
                key={level.value}
                onSelect={() => {
                  onDifficultyChange(level.value);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    difficulty === level.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <div>
                  <div>{level.label}</div>
                  <div className="text-muted-foreground text-xs">{level.description}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
