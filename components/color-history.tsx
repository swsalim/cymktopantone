'use client';

import { Trash2, X } from 'lucide-react';

import { cmykToRgb, convertPantoneToHex, hslToRgb, hsvToRgb } from '@/lib/colors';
import { rgbToHex } from '@/lib/colors';
import { ColorHistoryItem, ColorHistoryState } from '@/lib/hooks/use-color-history';

import { Button } from './ui/button';

interface ColorHistoryProps {
  history: ColorHistoryState;
  onColorSelect: (sourceValue: string) => void;
}

export function ColorHistory({ history, onColorSelect }: ColorHistoryProps) {
  if (history.items.length === 0) return null;

  const setBackgroundColor = (item: ColorHistoryItem) => {
    if (item.sourceColor === 'HEX') {
      const hex = item.sourceValue;
      return hex;
    } else if (item.sourceColor === 'CMYK') {
      const matches = item.sourceValue.match(/cmyk\((\d+)%,\s*(\d+)%,\s*(\d+)%,\s*(\d+)%\)/);
      if (matches) {
        const [, c, m, y, k] = matches;
        const rgb = cmykToRgb({
          c: parseInt(c),
          m: parseInt(m),
          y: parseInt(y),
          k: parseInt(k),
        });

        const hex = rgbToHex(rgb);
        return hex;
      }
    } else if (item.sourceColor === 'RGB') {
      const rgb = item.sourceValue;
      return rgb;
    } else if (item.sourceColor === 'HSL') {
      const hslMatches = item.sourceValue.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (hslMatches) {
        const [, h, s, l] = hslMatches;
        const rgb = hslToRgb({
          h: parseInt(h),
          s: parseInt(s),
          l: parseInt(l),
        });
        const hex = rgbToHex(rgb);
        return hex;
      }
    } else if (item.sourceColor === 'HSV') {
      const hsvMatches = item.sourceValue.match(/hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (hsvMatches) {
        const [, h, s, v] = hsvMatches;
        const rgb = hsvToRgb({
          h: parseInt(h),
          s: parseInt(s),
          v: parseInt(v),
        });
        const hex = rgbToHex(rgb);
        return hex;
      }
    } else if (item.sourceColor === 'PANTONE') {
      const hex = `#${convertPantoneToHex(item.sourceValue)}`;
      return hex;
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          Color History <span className="font-medium">(Up to 5 colors)</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={history.clearHistory}
          className="h-7 px-2 text-xs">
          <Trash2 className="mr-1 h-3 w-3" />
          Clear All
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.items.map((item) => (
          <div key={item.id} className="relative">
            <div
              className="size-12 cursor-pointer rounded-md border"
              style={{ backgroundColor: setBackgroundColor(item) }}
              title={`${item.sourceValue} → ${item.targetValue}`}
              onClick={() => onColorSelect(item.sourceValue)}
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => history.removeFromHistory(item.id)}
              className="absolute -right-1 -top-1 size-4 rounded-full p-0 shadow-sm">
              <X className="size-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
