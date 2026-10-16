import { RGB } from '@/types';

import { CatalogColor, getCatalogColor, similarNamedColors } from '@/lib/color-catalog';
import {
  contrastRatio,
  formatCmykString,
  formatHslString,
  hexToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
} from '@/lib/colors';
import { formatOklch, rgbToOklch } from '@/lib/oklch';
import { HARMONY_SCHEMES, HarmonyScheme, generateHarmony, normalizeHex } from '@/lib/palette-harmony';

const WHITE: RGB = { r: 255, g: 255, b: 255 };
const BLACK: RGB = { r: 0, g: 0, b: 0 };

export type ContrastCheck = {
  ratio: number;
  ratioLabel: string;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
};

function checkContrast(color: RGB, against: RGB): ContrastCheck {
  const ratio = contrastRatio(color, against);
  return {
    ratio,
    ratioLabel: ratio.toFixed(2),
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

export type ColorSwatch = {
  hex: string;
  label: string;
};

export type ColorPageData = {
  entry: CatalogColor;
  hashHex: string;
  rgb: RGB;
  rgbLabel: string;
  hslLabel: string;
  hsvLabel: string;
  cmykLabel: string;
  oklchLabel: string;
  tints: ColorSwatch[];
  shades: ColorSwatch[];
  harmonies: { id: HarmonyScheme; label: string; colors: string[] }[];
  onWhite: ContrastCheck;
  onBlack: ContrastCheck;
  similar: CatalogColor[];
  cssKeyword: string | null;
};

export function getColorPageData(hex: string): ColorPageData | null {
  const normalized = hex.replace('#', '').toUpperCase();
  const entry = getCatalogColor(normalized);
  if (!entry) return null;

  const hashHex = `#${entry.hex}`;
  const rgb = hexToRgb(hashHex);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);
  const hsvHue = ((hsv.h % 360) + 360) % 360;
  const cmyk = rgbToCmyk(rgb);

  const steps = [0.2, 0.4, 0.6, 0.8];
  const tints = steps.map((t) => {
    const mixed = rgbToHex(mixRgb(rgb, WHITE, t));
    return { hex: mixed, label: `${Math.round(t * 100)}% white` };
  });
  const shades = steps.map((t) => {
    const mixed = rgbToHex(mixRgb(rgb, BLACK, t));
    return { hex: mixed, label: `${Math.round(t * 100)}% black` };
  });

  const harmonies = HARMONY_SCHEMES.map((scheme) => ({
    id: scheme.id,
    label: scheme.label,
    colors: generateHarmony(hashHex, scheme.id).map((color) => normalizeHex(color)),
  }));

  const cssKeyword =
    entry.kind === 'css' ? entry.names[0].toLowerCase().replace(/\s+/g, '') : null;

  return {
    entry,
    hashHex,
    rgb,
    rgbLabel: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hslLabel: formatHslString(hsl),
    hsvLabel: `hsv(${hsvHue}, ${hsv.s}%, ${hsv.v}%)`,
    cmykLabel: formatCmykString(cmyk),
    oklchLabel: formatOklch(rgbToOklch(rgb)),
    tints,
    shades,
    harmonies,
    onWhite: checkContrast(rgb, WHITE),
    onBlack: checkContrast(rgb, BLACK),
    similar: similarNamedColors(entry.hex),
    cssKeyword,
  };
}
