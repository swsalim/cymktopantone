import { CYMK, HSL, RGB } from '@/types';

import { HEX, PMS } from '@/config/colors';

export const cmykToRgb = ({ c, m, y, k }: CYMK): RGB => {
  const r = 255 * (1 - c / 100) * (1 - k / 100);
  const g = 255 * (1 - m / 100) * (1 - k / 100);
  const b = 255 * (1 - y / 100) * (1 - k / 100);
  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
};

export const rgbToHex = ({ r, g, b }: RGB): string => {
  const bin = (r << 16) | (g << 8) | b;
  return `#${bin.toString(16).padStart(6, '0').toUpperCase()}`;
};

// Converts a HEX color string to RGB values
export const hexToRgb = (hex: string): RGB => {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

// Converts RGB to HSL
export const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslToRgb = ({ h, s, l }: HSL): RGB => {
  s /= 100;
  l /= 100;
  const k = (n: number): number => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number): number => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
};

export function formatRgbString({ r, g, b }: RGB): string {
  return `rgb(${r},${g},${b})`;
}

// Formats HSL string
export function formatHslString({ h, s, l }: HSL): string {
  return `hsl(${h},${s}%,${l}%)`;
}

// Formats CMYK string
export function formatCmykString({ c, m, y, k }: CYMK): string {
  return `cmyk(${c ?? 0},${m ?? 0},${y ?? 0},${k ?? 0})`;
}

// Calculates relative luminance
export function luminance({ r, g, b }: RGB): number {
  const toLinear = (c: number): number => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Calculates contrast ratio
export function contrastRatio(rgb1: RGB, rgb2: RGB): number {
  const lum1 = luminance(rgb1);
  const lum2 = luminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Lightens or darkens a color by a percentage
export function adjustRgbColor(rgb: RGB, percent: number): RGB {
  const { r, g, b } = rgb;
  return {
    r: Math.min(255, Math.max(0, Math.round(r + r * percent))),
    g: Math.min(255, Math.max(0, Math.round(g + g * percent))),
    b: Math.min(255, Math.max(0, Math.round(b + b * percent))),
  };
}

export function getTextColor(hex: string): string {
  const background = hexToRgb(hex);
  const ratios: Array<{ color: string; ratio: number }> = [];

  function testColor(baseColor: RGB, direction: number, steps: number): void {
    for (let i = 0; i <= steps; i++) {
      const adjusted = adjustRgbColor(baseColor, i * direction * 0.1);
      const ratio = contrastRatio(background, adjusted);
      ratios.push({ color: rgbToHex(adjusted), ratio });
    }
  }

  testColor({ r: 0, g: 0, b: 0 }, 1, 10);
  testColor({ r: 255, g: 255, b: 255 }, -1, 10);

  ratios.sort((a, b) => b.ratio - a.ratio);
  const bestColor = ratios.find((r) => r.ratio >= 7);
  return bestColor !== undefined ? bestColor.color : ratios[0].color;
}

/**
 * Get the HEX value of a Pantone color
 * @param {string} color The Pantone color to get the HEX for
 * @returns {string} The HEX value of the Pantone color
 */
export const convertPantoneToHex = (pantoneColor: string): string => {
  const pantoneIndex = PMS.indexOf(pantoneColor);
  return pantoneIndex !== -1 ? HEX[pantoneIndex] : '';
};
/**
 * Converts an HEX color to its corresponding Pantone color.
 * @param {string} HEXColor - The RGB color to convert.
 * @returns {string} The matching Pantone color or an empty string if not found.
 */
export const convertHexToPantone = (hexColor: string): string => {
  const hexIndex = HEX.indexOf(hexColor);
  return hexIndex !== -1 ? PMS[hexIndex] : '';
};
export const findMatchingPMSColors = (
  hexColor: string,
  maxDistance = 32,
): { pantone: string; hex: string }[] => {
  const result = [];
  const tempResult = [];

  const colorHEXValues = [];
  const matchingPantoneColor = convertHexToPantone(hexColor);
  '' != matchingPantoneColor &&
    ((result[0] = {
      pantone: matchingPantoneColor,
      hex: hexColor,
    }),
    tempResult.push(matchingPantoneColor));

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  for (let i = 0; i < HEX.length; i++) {
    const rgb1 = HEX[i];
    const r1 = parseInt(rgb1.substring(0, 2), 16);
    const g1 = parseInt(rgb1.substring(2, 4), 16);
    const b1 = parseInt(rgb1.substring(4, 6), 16);
    colorHEXValues[i] = Math.sqrt(Math.pow(r - r1, 2) + Math.pow(g - g1, 2) + Math.pow(b - b1, 2));
  }

  // for (let i = 0; i < colorHEXValues.length; i++)
  //   colorHEXValues[i] <= maxDistance && -1 == (result.indexOf(PMS[i]) && result.push(PMS[i]));

  for (let i = 0; i < colorHEXValues.length; i++) {
    // Check if the color value is within the maximum distance
    if (colorHEXValues[i] <= maxDistance) {
      // Check if this PMS color isn't already in the result array
      if (tempResult.indexOf(PMS[i]) === -1) {
        // Add the PMS color to the result array
        result.push({
          pantone: PMS[i],
          hex: HEX[i],
        });
      }
    }
  }
  return result;
};
