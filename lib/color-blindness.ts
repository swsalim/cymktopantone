export type ColorBlindnessType = 'protanopia' | 'deuteranopia' | 'tritanopia';

export const COLOR_BLINDNESS_TYPES: {
  id: ColorBlindnessType;
  label: string;
  description: string;
}[] = [
  {
    id: 'protanopia',
    label: 'Protanopia',
    description: 'Reduced sensitivity to red (~1% of males).',
  },
  {
    id: 'deuteranopia',
    label: 'Deuteranopia',
    description: 'Reduced sensitivity to green (~1% of males).',
  },
  {
    id: 'tritanopia',
    label: 'Tritanopia',
    description: 'Reduced sensitivity to blue (rare).',
  },
];

/** sRGB → simulated sRGB matrices (Brettel/Vienot approximation). */
const MATRICES: Record<ColorBlindnessType, number[]> = {
  protanopia: [0.56667, 0.43333, 0, 0.55833, 0.44167, 0, 0, 0.24167, 0.75833],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.43333, 0.56667, 0, 0.475, 0.525],
};

export function simulateColorBlindness(hex: string, type: ColorBlindnessType): string {
  const rgb = hexToRgbNormalized(hex);
  const m = MATRICES[type];
  const r = clamp255(rgb.r * m[0] + rgb.g * m[1] + rgb.b * m[2]);
  const g = clamp255(rgb.r * m[3] + rgb.g * m[4] + rgb.b * m[5]);
  const b = clamp255(rgb.r * m[6] + rgb.g * m[7] + rgb.b * m[8]);
  return rgbToHex({ r, g, b });
}

function hexToRgbNormalized(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function clamp255(v: number): number {
  return Math.min(255, Math.max(0, Math.round(v)));
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
  const bin = (r << 16) | (g << 8) | b;
  return `#${bin.toString(16).padStart(6, '0').toUpperCase()}`;
}

export function colorBlindnessCssFilter(type: ColorBlindnessType): string {
  switch (type) {
    case 'protanopia':
      return 'url(#protanopia-filter)';
    case 'deuteranopia':
      return 'url(#deuteranopia-filter)';
    case 'tritanopia':
      return 'url(#tritanopia-filter)';
  }
}
