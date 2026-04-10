import { PMS } from '@/config/colors';

import {
  convertPantoneToHex,
  hexToRgb,
  rgbToCmyk,
  rgbToHsl,
  rgbToHsv,
} from '@/lib/colors';

export function pantoneNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

let slugToName: Map<string, string> | null = null;

function getSlugToNameMap(): Map<string, string> {
  if (!slugToName) {
    slugToName = new Map();
    for (const name of PMS) {
      slugToName.set(pantoneNameToSlug(name), name);
    }
  }
  return slugToName;
}

export function getPantoneNameFromSlug(slug: string): string | undefined {
  return getSlugToNameMap().get(slug);
}

export function listPantoneLookupOptions(): { slug: string; name: string }[] {
  return PMS.map((name) => ({ slug: pantoneNameToSlug(name), name }));
}

export type PantoneLookupDisplay = {
  hex: string;
  name: string;
  pantone: string;
  rgb: string;
  cmyk: string;
  hsl: string;
  hsv: string;
};

export function getPantoneLookupDisplay(pantoneName: string): PantoneLookupDisplay | null {
  const rawHex = convertPantoneToHex(pantoneName);
  if (!rawHex) return null;

  const hex = `#${rawHex}`;
  const rgb = hexToRgb(hex);
  const cmyk = rgbToCmyk(rgb);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);

  return {
    hex,
    name: `Pantone ${pantoneName}`,
    pantone: `PMS ${pantoneName}`,
    rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    cmyk: `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`,
    hsl: `${hsl.h}, ${hsl.s}%, ${hsl.l}%`,
    hsv: `${hsv.h}, ${hsv.s}%, ${hsv.v}%`,
  };
}
