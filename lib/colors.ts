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
export const findMatchingPMSColors = (
  hexColor: string,
  maxDistance = 15,
): { pantone: string; hex: string; matchPercentage: number }[] => {
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

// Convert RGB to XYZ color space
function rgbToXyz(rgb: RGB) {
  // Convert RGB values to 0-1 range
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // Apply gamma correction (sRGB)
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Scale RGB values
  r *= 100;
  g *= 100;
  b *= 100;

  // Convert to XYZ using sRGB/D65 matrix
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  return { x, y, z };
}

// Helper function for XYZ to Lab conversion
function xyzToLab(xyz: { x: number; y: number; z: number }) {
  // D65 reference white
  const xn = 95.047;
  const yn = 100.0;
  const zn = 108.883;

  // Scale XYZ values
  let x = xyz.x / xn;
  let y = xyz.y / yn;
  let z = xyz.z / zn;

  // Apply cube root transformation
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  // Calculate Lab values
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  return { l, a, b };
}

// Convert RGB to Lab
export function rgbToLab(rgb: RGB): { l: number; a: number; b: number } {
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
}

// Calculate CIEDE2000 color difference
export function deltaE00(
  lab1: { l: number; a: number; b: number },
  lab2: { l: number; a: number; b: number },
): number {
  // Constants
  const kL = 1;
  const kC = 1;
  const kH = 1;

  // Calculate Cprime
  const C1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
  const C2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
  const Cbar = (C1 + C2) / 2;

  // Calculate a'
  const C7 = Math.pow(Cbar, 7);
  const G = 0.5 * (1 - Math.sqrt(C7 / (C7 + Math.pow(25, 7))));
  const a1Prime = (1 + G) * lab1.a;
  const a2Prime = (1 + G) * lab2.a;

  // Calculate C'
  const C1Prime = Math.sqrt(a1Prime * a1Prime + lab1.b * lab1.b);
  const C2Prime = Math.sqrt(a2Prime * a2Prime + lab2.b * lab2.b);
  const CbarPrime = (C1Prime + C2Prime) / 2;

  // Calculate h'
  let h1Prime = (Math.atan2(lab1.b, a1Prime) * 180) / Math.PI;
  if (h1Prime < 0) h1Prime += 360;
  let h2Prime = (Math.atan2(lab2.b, a2Prime) * 180) / Math.PI;
  if (h2Prime < 0) h2Prime += 360;

  // Calculate ΔH'
  const hDiff = h2Prime - h1Prime;
  let dhPrime;
  if (C1Prime * C2Prime === 0) {
    dhPrime = 0;
  } else if (Math.abs(hDiff) <= 180) {
    dhPrime = hDiff;
  } else if (hDiff > 180) {
    dhPrime = hDiff - 360;
  } else {
    dhPrime = hDiff + 360;
  }

  // Calculate H'bar
  let hBarPrime;
  if (C1Prime * C2Prime === 0) {
    hBarPrime = h1Prime + h2Prime;
  } else if (Math.abs(h1Prime - h2Prime) <= 180) {
    hBarPrime = (h1Prime + h2Prime) / 2;
  } else if (h1Prime + h2Prime < 360) {
    hBarPrime = (h1Prime + h2Prime + 360) / 2;
  } else {
    hBarPrime = (h1Prime + h2Prime - 360) / 2;
  }

  // Calculate T
  const T =
    1 -
    0.17 * Math.cos(((hBarPrime - 30) * Math.PI) / 180) +
    0.24 * Math.cos((2 * hBarPrime * Math.PI) / 180) +
    0.32 * Math.cos(((3 * hBarPrime + 6) * Math.PI) / 180) -
    0.2 * Math.cos(((4 * hBarPrime - 63) * Math.PI) / 180);

  // Calculate ΔΘ
  const deltaTheta = 30 * Math.exp(-Math.pow((hBarPrime - 275) / 25, 2));

  // Calculate RC
  const RC = 2 * Math.sqrt(Math.pow(CbarPrime, 7) / (Math.pow(CbarPrime, 7) + Math.pow(25, 7)));

  // Calculate SL
  const SL = 1 + (0.015 * Math.pow(lab1.l - 50, 2)) / Math.sqrt(20 + Math.pow(lab1.l - 50, 2));

  // Calculate SC
  const SC = 1 + 0.045 * CbarPrime;

  // Calculate SH
  const SH = 1 + 0.015 * CbarPrime * T;

  // Calculate RT
  const RT = -Math.sin((2 * deltaTheta * Math.PI) / 180) * RC;

  // Calculate color difference
  const deltaL = (lab2.l - lab1.l) / (kL * SL);
  const deltaC = (C2Prime - C1Prime) / (kC * SC);
  const deltaH =
    (2 * Math.sqrt(C1Prime * C2Prime) * Math.sin((dhPrime * Math.PI) / 360)) / (kH * SH);

  return Math.sqrt(
    Math.pow(deltaL, 2) + Math.pow(deltaC, 2) + Math.pow(deltaH, 2) + RT * deltaC * deltaH,
  );
}

// Calculate match percentage based on deltaE
export function calculateMatchPercentage(deltaE: number): number {
  // DeltaE of 2.3 is considered just noticeable difference (JND)
  // DeltaE of 35 is considered very different
  const maxDeltaE = 35;
  const minDeltaE = 2.3;

  if (deltaE <= minDeltaE) return 100;
  if (deltaE >= maxDeltaE) return 0;

  // Enhanced non-linear mapping using modified exponential decay
  // Using a steeper curve and one decimal place precision
  const percentage = 100 * Math.exp(-1.5 * ((deltaE - minDeltaE) / (maxDeltaE - minDeltaE)));
  return Number(percentage.toFixed(1));
}
