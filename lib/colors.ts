import { CMYK, HSL, HSV, RGB } from '@/types';

import { HEX, PMS } from '@/config/colors';

export const cmykToRgb = ({ c, m, y, k }: CMYK): RGB => {
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

export const rgbToCmyk = ({ r, g, b }: RGB): CMYK => {
  // First convert RGB values to 0-1 range
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;

  // Find the maximum value among R, G, B
  const max = Math.max(rr, gg, bb);

  // If max is 0, it means the color is black
  if (max === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  // Calculate K (black)
  const k = (1 - max) * 100;

  // Calculate C, M, Y values
  const c = ((1 - rr - k / 100) / (1 - k / 100)) * 100;
  const m = ((1 - gg - k / 100) / (1 - k / 100)) * 100;
  const y = ((1 - bb - k / 100) / (1 - k / 100)) * 100;

  // Round values and ensure they're within 0-100 range
  return {
    c: Math.round(Math.max(0, Math.min(100, c))),
    m: Math.round(Math.max(0, Math.min(100, m))),
    y: Math.round(Math.max(0, Math.min(100, y))),
    k: Math.round(Math.max(0, Math.min(100, k))),
  };
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

export const hsvToRgb = ({ h, s, v }: HSV): RGB => {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

// Convert RGB to HSV
export const rgbToHsv = ({ r, g, b }: RGB): HSV => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const h =
    max === min
      ? 0
      : max === r
        ? (g - b) / (max - min)
        : max === g
          ? 2 + (b - r) / (max - min)
          : 4 + (r - g) / (max - min);
  const s = max === 0 ? 0 : (max - min) / max;
  const v = max / 255;
  return {
    h: Math.round(h * 60),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
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
export function formatCmykString({ c, m, y, k }: CMYK): string {
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
export const findMatchingPMSColors = async (
  hexColor: string,
  maxDistance = 15,
): Promise<{ pantone: string; hex: string; matchPercentage: number }[]> => {
  // Dynamically import the heavy color matching logic only when needed
  const { rgbToLab, deltaE00, calculateMatchPercentage } = await import('./color-matching');

  const result: { pantone: string; hex: string; matchPercentage: number }[] = [];
  const seenPantones = new Set<string>();

  // Convert input color to Lab
  const inputRgb = {
    r: parseInt(hexColor.substring(0, 2), 16),
    g: parseInt(hexColor.substring(2, 4), 16),
    b: parseInt(hexColor.substring(4, 6), 16),
  };
  const inputLab = rgbToLab(inputRgb);

  // Check for exact hex match first
  const exactMatchPantone = convertHexToPantone(hexColor);
  if (exactMatchPantone) {
    result.push({
      pantone: exactMatchPantone,
      hex: hexColor,
      matchPercentage: 100,
    });
    seenPantones.add(exactMatchPantone);
  }

  // Find close matches
  const closeMatches: { pantone: string; hex: string; deltaE: number }[] = [];

  for (let i = 0; i < HEX.length; i++) {
    if (seenPantones.has(PMS[i])) continue;

    const pantoneRgb = {
      r: parseInt(HEX[i].substring(0, 2), 16),
      g: parseInt(HEX[i].substring(2, 4), 16),
      b: parseInt(HEX[i].substring(4, 6), 16),
    };
    const pantoneLab = rgbToLab(pantoneRgb);
    const deltaE = deltaE00(inputLab, pantoneLab);

    if (deltaE <= maxDistance) {
      closeMatches.push({
        pantone: PMS[i],
        hex: HEX[i],
        deltaE,
      });
    }
  }

  // Sort by deltaE and calculate match percentages
  closeMatches.sort((a, b) => a.deltaE - b.deltaE);

  // If we don't have an exact match but have very close matches
  if (result.length === 0 && closeMatches.length > 0 && closeMatches[0].deltaE <= 2.3) {
    // Only the closest one gets 100%
    result.push({
      pantone: closeMatches[0].pantone,
      hex: closeMatches[0].hex,
      matchPercentage: 100,
    });
    closeMatches.shift(); // Remove the first one since we've added it
  }

  // Add remaining matches with calculated percentages
  for (const match of closeMatches) {
    const matchPercentage = calculateMatchPercentage(match.deltaE);
    if (matchPercentage > 0) {
      result.push({
        pantone: match.pantone,
        hex: match.hex,
        matchPercentage,
      });
    }
  }

  return result;
};

/**
 * Validates if a string is a valid hex color code
 * @param {string} hex The hex color code to validate
 * @returns {boolean} True if the hex color is valid, false otherwise
 */
export const isValidHex = (hex: string): boolean => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Check if the hex is 3 or 6 characters long and contains only valid hex characters
  return /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(cleanHex);
};
