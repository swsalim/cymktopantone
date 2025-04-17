import { CMYK, RGB } from '@/types';

// Alternative CMYK to RGB conversion
export const cmykToRgbAlt = ({ c, m, y, k }: CMYK): RGB => {
  const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
  const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
  const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
  return { r, g, b };
};

// New RGB to CMYK conversion with alternative approach
export const rgbToCmykAlt = ({ r, g, b }: RGB): CMYK => {
  // Convert RGB to 0-1 range
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;

  // Calculate maximum value
  const max = Math.max(rr, gg, bb);

  // If max is 0, return black
  if (max === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  // Calculate CMY values first
  const c = 1 - rr;
  const m = 1 - gg;
  const y = 1 - bb;

  // Calculate K (black) as the minimum of CMY
  const k = Math.min(c, m, y);

  // Adjust CMY values by removing the black component
  const adjustedC = (c - k) / (1 - k);
  const adjustedM = (m - k) / (1 - k);
  const adjustedY = (y - k) / (1 - k);

  // Convert to percentages and round
  return {
    c: Math.round(adjustedC * 100),
    m: Math.round(adjustedM * 100),
    y: Math.round(adjustedY * 100),
    k: Math.round(k * 100),
  };
};

// Helper function to test the conversion
export const testCmykConversion = (cmyk: CMYK) => {
  const rgb = cmykToRgbAlt(cmyk);
  const cmyk2 = rgbToCmykAlt(rgb);
  return {
    original: cmyk,
    rgb,
    converted: cmyk2,
    matches: JSON.stringify(cmyk) === JSON.stringify(cmyk2),
  };
};
