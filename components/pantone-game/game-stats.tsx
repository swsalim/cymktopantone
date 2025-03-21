'use client';

import { Award, BarChart3, Clock, Repeat, Trophy } from 'lucide-react';

import { GameStats } from '@/lib/hooks/use-pantone-game-stats';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GameStatsProps {
  stats: GameStats;
  onReset: () => void;
  className?: string;
}

export function GameStatsCard({ stats, onReset, className }: GameStatsProps) {
  const { gamesPlayed, gamesWon, winPercentage, currentStreak, maxStreak } = stats;

  const statItems = [
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: 'Games Played',
      value: gamesPlayed.toString(),
    },
    {
      icon: <Trophy className="h-4 w-4" />,
      label: 'Games Won',
      value: gamesWon.toString(),
    },
    {
      icon: <Award className="h-4 w-4" />,
      label: 'Win %',
      value: `${winPercentage}%`,
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: 'Current Streak',
      value: currentStreak.toString(),
    },
    {
      icon: <Trophy className="h-4 w-4" />,
      label: 'Max Streak',
      value: maxStreak.toString(),
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Your Statistics</CardTitle>
        <CardDescription>Track your Pantone matching skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {statItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center space-y-1">
              <div className="text-muted-foreground flex items-center">{item.icon}</div>
              <span className="text-xl font-bold">{item.value}</span>
              <span className="text-muted-foreground text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="ml-auto flex gap-1 text-xs">
          <Repeat className="h-3 w-3" />
          Reset Stats
        </Button>
      </CardFooter>
    </Card>
  );
}
