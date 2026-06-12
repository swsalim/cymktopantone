import { RGB } from '@/types';

import { hexToRgb, rgbToCmyk } from '@/lib/colors';
import { deltaE00, rgbToLab } from '@/lib/color-matching';
import { normalizeHex } from '@/lib/palette-harmony';

/**
 * Approximate RGB reflectances of solid coated process inks (SWOP-like).
 * Real inks are impure: cyan reflects some green/blue, magenta some red/blue,
 * black is a dark warm gray rather than 0. This impurity is exactly what makes
 * saturated screen colors shift on press.
 */
const INK_SOLIDS = {
  c: [0.02, 0.62, 0.88],
  m: [0.89, 0.02, 0.48],
  y: [1.0, 0.93, 0.02],
  k: [0.14, 0.12, 0.125],
} as const;

/** Mid-tone dot gain: halftone dots spread on paper, darkening 25–75% coverages most. */
function withDotGain(coverage: number): number {
  return Math.min(1, coverage + 0.36 * coverage * (1 - coverage));
}

/**
 * Simulate how a color renders on a coated CMYK press.
 * Converts to CMYK, then renders each ink as a halftone layer (Murray-Davies:
 * reflectance = (1 - coverage) * paper + coverage * solid ink) multiplied together.
 */
export function simulatePressRgb(hex: string): RGB {
  const rgb = hexToRgb(normalizeHex(hex));
  const cmyk = rgbToCmyk(rgb);
  const coverages = {
    c: withDotGain(cmyk.c / 100),
    m: withDotGain(cmyk.m / 100),
    y: withDotGain(cmyk.y / 100),
    k: withDotGain(cmyk.k / 100),
  };

  const channels = [0, 1, 2].map((ch) => {
    let reflectance = 1;
    for (const ink of ['c', 'm', 'y', 'k'] as const) {
      const a = coverages[ink];
      reflectance *= 1 - a + a * INK_SOLIDS[ink][ch];
    }
    return Math.round(255 * reflectance);
  });

  return { r: channels[0], g: channels[1], b: channels[2] };
}

/** Perceptual difference (ΔE2000) between the screen color and its press rendering. */
export function printShiftDeltaE(hex: string): number {
  const rgb = hexToRgb(normalizeHex(hex));
  return deltaE00(rgbToLab(rgb), rgbToLab(simulatePressRgb(hex)));
}

/** Returns true when the press rendering shifts noticeably (ΔE2000 above threshold). */
export function isOutOfPrintGamut(hex: string, threshold = 6): boolean {
  return printShiftDeltaE(hex) > threshold;
}

export function gamutWarningMessage(hex: string): string | null {
  if (!isOutOfPrintGamut(hex)) return null;
  return 'This color may shift when converted to CMYK for print. Check values before production.';
}

export interface GamutReport {
  hex: string;
  screenRgb: RGB;
  cmyk: ReturnType<typeof rgbToCmyk>;
  printRgb: RGB;
  printHex: string;
  deltaE: number;
  outOfGamut: boolean;
}

/** Full screen-vs-press comparison for one HEX color. */
export function getGamutReport(hex: string, threshold = 6): GamutReport {
  const normalized = normalizeHex(hex);
  const screenRgb = hexToRgb(normalized);
  const cmyk = rgbToCmyk(screenRgb);
  const printRgb = simulatePressRgb(normalized);
  const deltaE = deltaE00(rgbToLab(screenRgb), rgbToLab(printRgb));
  const printHex = `#${[printRgb.r, printRgb.g, printRgb.b]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

  return {
    hex: normalized,
    screenRgb,
    cmyk,
    printRgb,
    printHex,
    deltaE,
    outOfGamut: deltaE > threshold,
  };
}
