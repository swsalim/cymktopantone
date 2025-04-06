'use client';

import { CopyIcon } from 'lucide-react';

import { formatRgbString, getTextColor, hexToRgb } from '@/lib/colors';
import { useToast } from '@/lib/hooks/use-toast';

import { Button } from '@/components/ui/button';

interface PantoneColorCardProps {
  pantone: string;
  hex: string;
  cmyk?: string;
  rgb?: string;
  hsl?: string;
  matchPercentage: number;
  onCopy?: (text: string, label: string) => void;
}

export function PantoneColorCard({ pantone, hex, matchPercentage, onCopy }: PantoneColorCardProps) {
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    if (onCopy) {
      onCopy(text, label);
    } else {
      navigator.clipboard.writeText(text).then(() => {
        toast({
          description: `${label} copied!`,
          duration: 2000,
        });
      });
    }
  };

  return (
    <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-lg border drop-shadow-sm dark:border-gray-600">
      <div
        className="relative flex h-16 w-full flex-col justify-center md:h-24"
        style={{
          backgroundColor: formatRgbString(hexToRgb(hex)),
          color: getTextColor(hex),
        }}>
        <div className="absolute right-2 top-2 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 drop-shadow-md">
          {matchPercentage}% Match
        </div>
      </div>
      <div className="flex flex-col items-start justify-between bg-white px-3 py-2 dark:bg-gray-900">
        <div className="flex flex-row items-center justify-center gap-x-2">
          <div className="text-center text-base font-semibold">{pantone}</div>
        </div>
        <div className="flex w-full flex-row items-center justify-between gap-x-2">
          <div className="text-center text-sm font-medium uppercase opacity-90">#{hex}</div>
          <Button variant="ghost" size="icon" onClick={() => handleCopy(`#${hex}`, 'HEX')}>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
