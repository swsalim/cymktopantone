'use client';

import Link from 'next/link';
import { Lock, LockOpen, AlertTriangle } from 'lucide-react';

import { formatCmykString, rgbToCmyk } from '@/lib/colors';
import { gamutWarningMessage, isOutOfPrintGamut } from '@/lib/gamut';
import { normalizeHex, hexToRgbTuple } from '@/lib/palette-harmony';
import { cn } from '@/lib/utils';

import { CopyButton } from '@/components/color-tools/copy-button';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PaletteSwatchProps {
  hex: string;
  index: number;
  locked?: boolean;
  onToggleLock?: () => void;
  showCmyk?: boolean;
  compact?: boolean;
}

export function PaletteSwatch({
  hex,
  index,
  locked,
  onToggleLock,
  showCmyk = true,
  compact = false,
}: PaletteSwatchProps) {
  const normalized = normalizeHex(hex);
  const rgb = hexToRgbTuple(normalized);
  const cmyk = rgbToCmyk(rgb);
  const outOfGamut = isOutOfPrintGamut(normalized);
  const warning = gamutWarningMessage(normalized);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-violet-200/70 bg-white/90 shadow-sm dark:border-gray-700 dark:bg-gray-900/80',
        compact ? 'min-w-[140px]' : 'min-w-[160px]',
      )}>
      <div
        className="relative h-24 w-full"
        style={{ backgroundColor: normalized }}
        aria-label={`Color swatch ${index + 1}: ${normalized}`}>
        {onToggleLock && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 size-8 bg-white/90 shadow-sm hover:bg-white dark:bg-gray-900/90"
            onClick={onToggleLock}
            aria-label={locked ? 'Unlock color' : 'Lock color'}>
            {locked ? <Lock className="size-3.5" /> : <LockOpen className="size-3.5" />}
          </Button>
        )}
        {outOfGamut && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="absolute bottom-2 left-2 rounded-md bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  <AlertTriangle className="mr-0.5 inline size-3" aria-hidden />
                  CMYK
                </span>
              </TooltipTrigger>
              <TooltipContent>{warning}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
            {normalized}
          </span>
          <CopyButton text={normalized} label="" className="h-7 px-2" />
        </div>
        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
          rgb({rgb.r}, {rgb.g}, {rgb.b})
        </p>
        {showCmyk && (
          <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
            {formatCmykString(cmyk)}
          </p>
        )}
        <Link
          href={`/convert-hex-to-cmyk`}
          className="text-xs font-medium text-violet-600 hover:underline dark:text-violet-400"
          onClick={() => {
            if (typeof window !== 'undefined' && window.seline?.track) {
              window.seline.track('palette_to_converter_click', { hex: normalized });
            }
          }}>
          Convert to CMYK →
        </Link>
      </div>
    </div>
  );
}
