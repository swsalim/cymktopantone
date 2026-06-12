import { RGB } from '@/types';

import { hexToRgb, rgbToHex } from '@/lib/colors';
import { normalizeHex } from '@/lib/palette-harmony';

export const TAILWIND_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

export function generateTailwindScale(baseHex: string): { step: number; hex: string }[] {
  const base = hexToRgb(normalizeHex(baseHex));
  const white: RGB = { r: 255, g: 255, b: 255 };
  const black: RGB = { r: 0, g: 0, b: 0 };

  const tints = [0.95, 0.85, 0.7, 0.55, 0.4, 0.25];
  const shades = [0.15, 0.3, 0.45, 0.6, 0.75];

  const scale: { step: number; hex: string }[] = [];

  tints.forEach((t, i) => {
    scale.push({ step: TAILWIND_STEPS[i], hex: rgbToHex(mixRgb(white, base, 1 - t)) });
  });

  scale.push({ step: 500, hex: rgbToHex(base) });

  shades.forEach((t, i) => {
    scale.push({ step: TAILWIND_STEPS[6 + i], hex: rgbToHex(mixRgb(base, black, t)) });
  });

  scale.push({ step: 950, hex: rgbToHex(mixRgb(base, black, 0.88)) });

  return scale;
}

export function scaleToTailwindConfig(
  scale: { step: number; hex: string }[],
  name = 'brand',
): string {
  const entries = scale.map(({ step, hex }) => `          ${step}: '${hex}',`).join('\n');
  return `theme: {\n  extend: {\n    colors: {\n      ${name}: {\n${entries}\n      },\n    },\n  },\n},`;
}

export function scaleToCssVariables(scale: { step: number; hex: string }[], prefix = 'brand'): string {
  return scale.map(({ step, hex }) => `  --${prefix}-${step}: ${hex};`).join('\n');
}
