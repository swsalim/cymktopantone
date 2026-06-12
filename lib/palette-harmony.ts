import { HSL, RGB } from '@/types';

import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from '@/lib/colors';

export type HarmonyScheme =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'monochromatic'
  | 'tetradic';

export const HARMONY_SCHEMES: { id: HarmonyScheme; label: string; description: string }[] = [
  {
    id: 'complementary',
    label: 'Complementary',
    description: 'Base and its opposite on the wheel, plus tints and shades — bold contrast in a full palette.',
  },
  {
    id: 'analogous',
    label: 'Analogous',
    description: 'Neighboring hues — harmonious and cohesive.',
  },
  {
    id: 'triadic',
    label: 'Triadic',
    description: 'Three hues evenly spaced — vibrant but balanced.',
  },
  {
    id: 'split-complementary',
    label: 'Split Complementary',
    description: 'Base color plus two adjacent to its complement.',
  },
  {
    id: 'monochromatic',
    label: 'Monochromatic',
    description: 'One hue with varied lightness — clean and unified.',
  },
  {
    id: 'tetradic',
    label: 'Tetradic',
    description: 'Four hues in a rectangle — rich, complex schemes.',
  },
];

function rotateHue(h: number, degrees: number): number {
  return ((h + degrees) % 360 + 360) % 360;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

function buildHsl(seed: HSL, hOffset: number, s?: number, l?: number): HSL {
  return {
    h: rotateHue(seed.h, hOffset),
    s: clamp(s ?? seed.s, 0, 100),
    l: clamp(l ?? seed.l, 0, 100),
  };
}

export function generateHarmony(hex: string, scheme: HarmonyScheme): string[] {
  const seed = hexToHsl(hex.startsWith('#') ? hex : `#${hex}`);

  switch (scheme) {
    case 'complementary':
      return [
        hslToHex(seed),
        hslToHex(buildHsl(seed, 180)),
        hslToHex(buildHsl(seed, 0, seed.s * 0.7, seed.l + 15)),
        hslToHex(buildHsl(seed, 180, seed.s * 0.7, seed.l + 15)),
        hslToHex(buildHsl(seed, 0, seed.s * 0.5, seed.l - 15)),
      ];
    case 'analogous':
      return [
        hslToHex(buildHsl(seed, -30)),
        hslToHex(seed),
        hslToHex(buildHsl(seed, 30)),
        hslToHex(buildHsl(seed, 60)),
        hslToHex(buildHsl(seed, -60, seed.s * 0.85)),
      ];
    case 'triadic':
      return [
        hslToHex(seed),
        hslToHex(buildHsl(seed, 120)),
        hslToHex(buildHsl(seed, 240)),
        hslToHex(buildHsl(seed, 120, seed.s * 0.7, seed.l + 15)),
        hslToHex(buildHsl(seed, 240, seed.s * 0.7, seed.l - 10)),
      ];
    case 'split-complementary':
      return [
        hslToHex(seed),
        hslToHex(buildHsl(seed, 150)),
        hslToHex(buildHsl(seed, 210)),
        hslToHex(buildHsl(seed, 0, seed.s * 0.6, seed.l + 20)),
        hslToHex(buildHsl(seed, 180, seed.s * 0.5, seed.l - 15)),
      ];
    case 'monochromatic':
      return [20, 35, 50, 65, 80].map((l) => hslToHex(buildHsl(seed, 0, seed.s, l)));
    case 'tetradic':
      return [
        hslToHex(seed),
        hslToHex(buildHsl(seed, 90)),
        hslToHex(buildHsl(seed, 180)),
        hslToHex(buildHsl(seed, 270)),
        hslToHex(buildHsl(seed, 90, seed.s * 0.65, seed.l + 12)),
      ];
    default:
      return [hslToHex(seed)];
  }
}

export function randomizeUnlockedColors(
  hex: string,
  scheme: HarmonyScheme,
  locked: boolean[],
  current: string[],
): string[] {
  const base = generateHarmony(hex, scheme);
  const jitter = (): number => (Math.random() - 0.5) * 24;

  return base.map((color, i) => {
    if (locked[i] && current[i]) return current[i];
    const hsl = hexToHsl(color);
    const varied: HSL = {
      h: rotateHue(hsl.h, jitter()),
      s: clamp(hsl.s + (Math.random() - 0.5) * 20, 15, 100),
      l: clamp(hsl.l + (Math.random() - 0.5) * 16, 10, 90),
    };
    return hslToHex(varied);
  });
}

export function paletteToCssVariables(colors: string[], prefix = 'color'): string {
  return colors
    .map((hex, i) => `  --${prefix}-${i + 1}: ${hex.startsWith('#') ? hex : `#${hex}`};`)
    .join('\n');
}

export function paletteToTailwind(colors: string[], name = 'brand'): string {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const entries = colors.map((hex, i) => {
    const step = steps[Math.min(i, steps.length - 1)];
    const normalized = hex.startsWith('#') ? hex : `#${hex}`;
    return `          ${step}: '${normalized}',`;
  });
  return `theme: {\n  extend: {\n    colors: {\n      ${name}: {\n${entries.join('\n')}\n      },\n    },\n  },\n},`;
}

export function paletteToJson(colors: string[]): string {
  return JSON.stringify(
    colors.map((hex, i) => ({
      name: `color-${i + 1}`,
      hex: hex.startsWith('#') ? hex : `#${hex}`,
    })),
    null,
    2,
  );
}

export function normalizeHex(hex: string): string {
  const cleaned = hex.replace('#', '').toUpperCase();
  if (cleaned.length === 3) {
    return `#${cleaned
      .split('')
      .map((c) => c + c)
      .join('')}`;
  }
  return `#${cleaned}`;
}

export function hexToRgbTuple(hex: string): RGB {
  return hexToRgb(normalizeHex(hex));
}
