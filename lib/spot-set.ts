import type { RGB } from '@/types';

import { deltaE00, rgbToLab } from '@/lib/color-matching';
import { rgbToHex } from '@/lib/colors';

/**
 * Color Mapper reference set v1.
 * A regular OKLCH grid. Generated here. No external colour library is read.
 */

export const SPOT_GRID = {
  hueCount: 36,
  hueStep: 10,
  lightnessMin: 0.25,
  lightnessMax: 0.93,
  lightnessSteps: 8,
  chromaMin: 0.04,
  chromaMax: 0.2,
  chromaSteps: 5,
  neutralCount: 10,
  neutralLightnessMin: 0.08,
  neutralLightnessMax: 0.98,
} as const;

/** Guidance bands for on-screen ΔE2000. Not a print tolerance. */
export const DISTANCE_BANDS = [
  { label: 'Very close', below: 2 },
  { label: 'Close', below: 5 },
  { label: 'Noticeable', below: 10 },
  { label: 'Far', below: Number.POSITIVE_INFINITY },
] as const;

export const DISTANCE_BAND_TOOLTIP =
  'A rough guide to how different two colors look on screen. The bands are ΔE2000 ranges that Color Mapper set: Very close is under 2, Close is 2 up to but not including 5, Noticeable is 5 up to but not including 10, and Far is 10 or more. They aren\u2019t a print tolerance.';

export type SpotReferenceColor = {
  code: string;
  hex: string;
  rgb: RGB;
  lab: { l: number; a: number; b: number };
};

export type RankedSpotColor = SpotReferenceColor & { deltaE: number };

const NEAREST_LIMIT = 6;

function linspace(min: number, max: number, steps: number): number[] {
  if (steps <= 1) return [min];
  return Array.from({ length: steps }, (_, index) => min + ((max - min) * index) / (steps - 1));
}

/** OKLCH to linear sRGB using the CSS Color Level 4 OKLab inverse. */
export function oklchToLinearSrgb(l: number, c: number, h: number): [number, number, number] {
  const hue = (h * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);
  const lmsL = l + 0.3963377774 * a + 0.2158037573 * b;
  const lmsM = l - 0.1055613458 * a - 0.0638541728 * b;
  const lmsS = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = lmsL ** 3;
  const m3 = lmsM ** 3;
  const s3 = lmsS ** 3;
  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

export function isInsideSrgb(linear: [number, number, number], epsilon = 1e-8): boolean {
  return linear.every((channel) => channel >= -epsilon && channel <= 1 + epsilon);
}

function linearChannelToByte(channel: number): number {
  const clamped = Math.min(1, Math.max(0, channel));
  const encoded =
    clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
  return Math.round(Math.min(1, Math.max(0, encoded)) * 255);
}

function codeNumber(value: number): number {
  return Math.round(value * 100);
}

function chromaticCode(hue: number, lightness: number, chroma: number): string {
  return `CMS-H${Math.round(hue)}-L${codeNumber(lightness)}-C${codeNumber(chroma)}`;
}

function neutralCode(index: number, lightness: number): string {
  return `CMS-N${String(index).padStart(2, '0')}-L${codeNumber(lightness)}-C0`;
}

function toReference(code: string, linear: [number, number, number]): SpotReferenceColor {
  const rgb = {
    r: linearChannelToByte(linear[0]),
    g: linearChannelToByte(linear[1]),
    b: linearChannelToByte(linear[2]),
  };
  return {
    code,
    hex: rgbToHex(rgb),
    rgb,
    lab: rgbToLab(rgb),
  };
}

export function buildSpotReferenceSet(): SpotReferenceColor[] {
  const hues = linspace(0, SPOT_GRID.hueStep * (SPOT_GRID.hueCount - 1), SPOT_GRID.hueCount);
  const lightnesses = linspace(
    SPOT_GRID.lightnessMin,
    SPOT_GRID.lightnessMax,
    SPOT_GRID.lightnessSteps,
  );
  const chromas = linspace(SPOT_GRID.chromaMin, SPOT_GRID.chromaMax, SPOT_GRID.chromaSteps);
  const colors: SpotReferenceColor[] = [];

  for (const hue of hues) {
    for (const lightness of lightnesses) {
      for (const chroma of chromas) {
        const linear = oklchToLinearSrgb(lightness, chroma, hue);
        if (!isInsideSrgb(linear)) continue;
        colors.push(toReference(chromaticCode(hue, lightness, chroma), linear));
      }
    }
  }

  const neutralLightness = linspace(
    SPOT_GRID.neutralLightnessMin,
    SPOT_GRID.neutralLightnessMax,
    SPOT_GRID.neutralCount,
  );
  neutralLightness.forEach((lightness, index) => {
    const linear = oklchToLinearSrgb(lightness, 0, 0);
    if (!isInsideSrgb(linear)) {
      throw new Error(`Neutral ${index + 1} fell outside sRGB`);
    }
    colors.push(toReference(neutralCode(index + 1, lightness), linear));
  });

  return colors;
}

export const SPOT_REFERENCE_SET: readonly SpotReferenceColor[] = buildSpotReferenceSet();

export const SPOT_SET_COUNT = SPOT_REFERENCE_SET.length;

const PREFERRED_EXAMPLE = 'CMS-H210-L74-C12';

export const SPOT_SET_EXAMPLE_CODE =
  SPOT_REFERENCE_SET.find((entry) => entry.code === PREFERRED_EXAMPLE)?.code ??
  SPOT_REFERENCE_SET[0]?.code ??
  '';

export function distanceBand(deltaE: number): string {
  const match = DISTANCE_BANDS.find((band) => deltaE < band.below);
  return match?.label ?? 'Far';
}

export function nearestSpotColors(rgb: RGB, limit = NEAREST_LIMIT): RankedSpotColor[] {
  const lab = rgbToLab(rgb);
  return SPOT_REFERENCE_SET.map((entry) => ({
    ...entry,
    deltaE: deltaE00(lab, entry.lab),
  }))
    .sort((a, b) => a.deltaE - b.deltaE || a.code.localeCompare(b.code))
    .slice(0, limit);
}
