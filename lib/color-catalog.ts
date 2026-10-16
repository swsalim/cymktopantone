import { CSS_NAMED_COLORS } from '@/lib/css-named-colors';
import { NEUTRAL_COLORS } from '@/lib/neutral-colors';

function parseHex(hex: string): { r: number; g: number; b: number } {
  const num = parseInt(hex.replace('#', ''), 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export type CatalogColor = {
  hex: string;
  names: string[];
  kind: 'css' | 'neutral';
};

function buildCatalog(): CatalogColor[] {
  const byHex = new Map<string, CatalogColor>();

  for (const color of CSS_NAMED_COLORS) {
    const hex = color.hex.toUpperCase();
    const existing = byHex.get(hex);
    if (existing) {
      if (!existing.names.includes(color.name)) existing.names.push(color.name);
      continue;
    }
    byHex.set(hex, { hex, names: [color.name], kind: 'css' });
  }

  for (const color of NEUTRAL_COLORS) {
    const hex = color.hex.toUpperCase();
    if (byHex.has(hex)) continue;
    byHex.set(hex, { hex, names: [color.name], kind: 'neutral' });
  }

  return [...byHex.values()];
}

export const colorCatalog: CatalogColor[] = buildCatalog();

const catalogByHex = new Map(colorCatalog.map((color) => [color.hex, color]));

export function getCatalogColor(hex: string): CatalogColor | undefined {
  return catalogByHex.get(hex.replace('#', '').toUpperCase());
}

export function isCatalogHex(hex: string): boolean {
  return catalogByHex.has(hex.replace('#', '').toUpperCase());
}

export function cssCatalogColors(): CatalogColor[] {
  return colorCatalog
    .filter((color) => color.kind === 'css')
    .slice()
    .sort((a, b) => a.names[0].localeCompare(b.names[0]));
}

export function neutralCatalogColors(): CatalogColor[] {
  return colorCatalog.filter((color) => color.kind === 'neutral');
}

export function similarNamedColors(hex: string, limit = 6): CatalogColor[] {
  const source = parseHex(hex);
  return cssCatalogColors()
    .filter((color) => color.hex !== hex.replace('#', '').toUpperCase())
    .map((color) => {
      const rgb = parseHex(color.hex);
      const distance =
        (rgb.r - source.r) ** 2 + (rgb.g - source.g) ** 2 + (rgb.b - source.b) ** 2;
      return { color, distance };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map((entry) => entry.color);
}
