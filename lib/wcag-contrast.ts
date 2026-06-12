import { RGB } from '@/types';

import { contrastRatio, hexToRgb, luminance, rgbToHex } from '@/lib/colors';
import { normalizeHex } from '@/lib/palette-harmony';

export type ContrastLevel = 'fail' | 'aa-large' | 'aa' | 'aaa-large' | 'aaa';

export interface ContrastResult {
  ratio: number;
  ratioFormatted: string;
  normalTextAA: boolean;
  normalTextAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
  level: ContrastLevel;
}

const AA_NORMAL = 4.5;
const AAA_NORMAL = 7;
const AA_LARGE = 3;
const AAA_LARGE = 4.5;

export function getContrastResult(foregroundHex: string, backgroundHex: string): ContrastResult {
  const fg = hexToRgb(normalizeHex(foregroundHex));
  const bg = hexToRgb(normalizeHex(backgroundHex));
  const ratio = contrastRatio(fg, bg);

  const normalTextAA = ratio >= AA_NORMAL;
  const normalTextAAA = ratio >= AAA_NORMAL;
  const largeTextAA = ratio >= AA_LARGE;
  const largeTextAAA = ratio >= AAA_LARGE;

  let level: ContrastLevel = 'fail';
  if (normalTextAAA) level = 'aaa';
  else if (normalTextAA) level = 'aa';
  else if (largeTextAAA) level = 'aaa-large';
  else if (largeTextAA) level = 'aa-large';

  return {
    ratio,
    ratioFormatted: `${ratio.toFixed(2)}:1`,
    normalTextAA,
    normalTextAAA,
    largeTextAA,
    largeTextAAA,
    level,
  };
}

export function suggestPassingColor(
  foregroundHex: string,
  backgroundHex: string,
  targetRatio = AA_NORMAL,
): string | null {
  const bg = hexToRgb(normalizeHex(backgroundHex));
  const fg = hexToRgb(normalizeHex(foregroundHex));
  const bgLum = luminance(bg);

  let best: { hex: string; ratio: number; distance: number } | null = null;

  for (let step = 0; step <= 100; step++) {
    const t = step / 100;
    const candidate: RGB = {
      r: Math.round(fg.r + (255 - fg.r) * t),
      g: Math.round(fg.g + (255 - fg.g) * t),
      b: Math.round(fg.b + (255 - fg.b) * t),
    };
    const ratio = contrastRatio(candidate, bg);
    if (ratio >= targetRatio) {
      const distance = Math.abs(luminance(candidate) - luminance(fg));
      if (!best || distance < best.distance) {
        best = { hex: rgbToHex(candidate), ratio, distance };
      }
    }

    const darker: RGB = {
      r: Math.round(fg.r * (1 - t)),
      g: Math.round(fg.g * (1 - t)),
      b: Math.round(fg.b * (1 - t)),
    };
    const darkRatio = contrastRatio(darker, bg);
    if (darkRatio >= targetRatio) {
      const distance = Math.abs(luminance(darker) - luminance(fg));
      if (!best || distance < best.distance) {
        best = { hex: rgbToHex(darker), ratio: darkRatio, distance };
      }
    }
  }

  if (best) return best.hex;

  return bgLum > 0.5 ? '#000000' : '#FFFFFF';
}

export function buildContrastMatrix(colors: string[]): {
  labels: string[];
  cells: { fg: string; bg: string; result: ContrastResult }[][];
} {
  const normalized = colors.map(normalizeHex);
  const cells = normalized.map((fg) =>
    normalized.map((bg) => ({
      fg,
      bg,
      result: getContrastResult(fg, bg),
    })),
  );
  return {
    labels: normalized,
    cells,
  };
}
