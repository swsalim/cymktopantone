import { isValidHex } from '@/lib/colors';

/** Normalize user input to 6 uppercase hex digits (no #). */
export function normalizeHexDigits(raw: string): string | null {
  const t = raw.trim().replace(/^#/, '');
  if (!isValidHex(t)) return null;
  if (t.length === 3) {
    return t
      .split('')
      .map((c) => c + c)
      .join('')
      .toUpperCase();
  }
  return t.toUpperCase();
}

/** Split pasted text by commas, semicolons, or line breaks; return unique valid hexes in order. */
export function parseHexPaletteInput(text: string): string[] {
  const parts = text
    .split(/[\s,;]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const p of parts) {
    const n = normalizeHexDigits(p);
    if (n && !seen.has(n)) {
      seen.add(n);
      out.push(n);
    }
  }
  return out;
}

/**
 * Parse `colors` query: comma-separated hex (with or without #), URL-decoded once.
 */
export function parseColorsQueryParam(param: string | undefined): string[] {
  if (!param || !param.trim()) return [];
  let decoded = param.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    /* use raw */
  }
  const segments = decoded.split(',').map((s) => s.trim()).filter(Boolean);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const seg of segments) {
    const n = normalizeHexDigits(seg);
    if (n && !seen.has(n)) {
      seen.add(n);
      out.push(n);
    }
  }
  return out;
}
