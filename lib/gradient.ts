export type GradientType = 'linear' | 'radial' | 'conic';

export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientPreset {
  id: string;
  label: string;
  type: GradientType;
  angle: number;
  stops: GradientStop[];
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: 'sunset',
    label: 'Sunset',
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#FF512F', position: 0 },
      { color: '#F09819', position: 50 },
      { color: '#FF512F', position: 100 },
    ],
  },
  {
    id: 'ocean',
    label: 'Ocean',
    type: 'linear',
    angle: 180,
    stops: [
      { color: '#2193b0', position: 0 },
      { color: '#6dd5ed', position: 100 },
    ],
  },
  {
    id: 'brand-safe',
    label: 'Brand Safe',
    type: 'linear',
    angle: 90,
    stops: [
      { color: '#5B21B6', position: 0 },
      { color: '#7C3AED', position: 50 },
      { color: '#C4B5FD', position: 100 },
    ],
  },
  {
    id: 'forest',
    label: 'Forest',
    type: 'linear',
    angle: 120,
    stops: [
      { color: '#134E4A', position: 0 },
      { color: '#059669', position: 50 },
      { color: '#6EE7B7', position: 100 },
    ],
  },
  {
    id: 'radial-glow',
    label: 'Radial Glow',
    type: 'radial',
    angle: 0,
    stops: [
      { color: '#FFFFFF', position: 0 },
      { color: '#7C3AED', position: 100 },
    ],
  },
];

export function buildGradientCss(
  type: GradientType,
  stops: GradientStop[],
  angle = 90,
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopStr = sorted.map((s) => `${s.color} ${s.position}%`).join(', ');

  switch (type) {
    case 'linear':
      return `linear-gradient(${angle}deg, ${stopStr})`;
    case 'radial':
      return `radial-gradient(circle, ${stopStr})`;
    case 'conic':
      return `conic-gradient(from ${angle}deg, ${stopStr})`;
  }
}

export function buildFullCssProperty(
  type: GradientType,
  stops: GradientStop[],
  angle = 90,
): string {
  const gradient = buildGradientCss(type, stops, angle);
  return `background: ${gradient};\nbackground: -webkit-${gradient};\nbackground: ${gradient};`;
}

export function parsePaletteFromQuery(param: string | null): string[] | null {
  if (!param) return null;
  return param
    .split(',')
    .map((c) => (c.startsWith('#') ? c : `#${c}`))
    .filter((c) => /^#[0-9A-Fa-f]{6}$/.test(c));
}
