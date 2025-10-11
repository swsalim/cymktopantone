// This module contains heavy color matching logic that should only be loaded when needed
// It's separated from the main colors.ts to enable code splitting
import { RGB } from '@/types';

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
