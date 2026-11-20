import { cmykToRgb, hexToRgb, hslToRgb, hsvToRgb, isValidHex, rgbToCmyk, rgbToHex, rgbToHsl, rgbToHsv } from '@/lib/colors';
import type { CMYK, HSL, HSV, RGB } from '@/types';

export const COLOR_MODES = ['rgb', 'hex', 'hsl', 'hsv', 'cmyk'] as const;
export type ColorMode = (typeof COLOR_MODES)[number];

export type ColorChannel = {
  key: string;
  label: string;
  max: number;
  /** When set, the channel gets a slider. HEX is typed, not slid. */
  slider: boolean;
  sliderColor?: string;
};

export const COLOR_CHANNELS: Record<ColorMode, readonly ColorChannel[]> = {
  rgb: [
    { key: 'r', label: 'Red', max: 255, slider: true, sliderColor: 'red' },
    { key: 'g', label: 'Green', max: 255, slider: true, sliderColor: 'green' },
    { key: 'b', label: 'Blue', max: 255, slider: true, sliderColor: 'blue' },
  ],
  hex: [{ key: 'hex', label: 'HEX', max: 0, slider: false }],
  hsl: [
    { key: 'h', label: 'Hue', max: 360, slider: true },
    { key: 's', label: 'Saturation', max: 100, slider: true },
    { key: 'l', label: 'Lightness', max: 100, slider: true },
  ],
  hsv: [
    { key: 'h', label: 'Hue', max: 360, slider: true },
    { key: 's', label: 'Saturation', max: 100, slider: true },
    { key: 'v', label: 'Value', max: 100, slider: true },
  ],
  cmyk: [
    { key: 'c', label: 'Cyan', max: 100, slider: true, sliderColor: 'cyan' },
    { key: 'm', label: 'Magenta', max: 100, slider: true, sliderColor: 'magenta' },
    { key: 'y', label: 'Yellow', max: 100, slider: true, sliderColor: 'yellow' },
    { key: 'k', label: 'Black', max: 100, slider: true, sliderColor: 'black key' },
  ],
};

export const COLOR_PRESETS: readonly { name: string; hex: string }[] = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Orange', hex: '#FF7A00' },
  { name: 'Yellow', hex: '#FFE600' },
  { name: 'Green', hex: '#00A86B' },
  { name: 'Blue', hex: '#0047FF' },
  { name: 'Purple', hex: '#7C3AED' },
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#FFFFFF' },
];

export type ColorChannels = Record<string, string>;

function parseChannel(value: string, max: number): number | null {
  if (!/^\d{1,3}$/.test(value.trim())) return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > max) return null;
  return number;
}

export function normalizeHex(value: string): string | null {
  const raw = value.trim().replace(/^#/, '');
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(raw)) return null;
  const expanded = raw.length === 3 ? raw.split('').map((char) => char + char).join('') : raw;
  return `#${expanded.toUpperCase()}`;
}

export function emptyChannels(mode: ColorMode): ColorChannels {
  return Object.fromEntries(COLOR_CHANNELS[mode].map((channel) => [channel.key, '']));
}

export function channelsFromHex(mode: ColorMode, hex: string): ColorChannels | null {
  const normalized = normalizeHex(hex);
  if (!normalized || !isValidHex(normalized)) return null;
  if (mode === 'hex') return { hex: normalized };
  const rgb = hexToRgb(normalized);
  if (mode === 'rgb') return { r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) };
  if (mode === 'hsl') {
    const hsl = rgbToHsl(rgb);
    return { h: String(hsl.h), s: String(hsl.s), l: String(hsl.l) };
  }
  if (mode === 'hsv') {
    const hsv = rgbToHsv(rgb);
    return { h: String(hsv.h), s: String(hsv.s), v: String(hsv.v) };
  }
  const cmyk = rgbToCmyk(rgb);
  return { c: String(cmyk.c), m: String(cmyk.m), y: String(cmyk.y), k: String(cmyk.k) };
}

export function hexFromChannels(mode: ColorMode, channels: ColorChannels): string | null {
  if (mode === 'hex') return normalizeHex(channels.hex ?? '');
  if (mode === 'rgb') {
    const r = parseChannel(channels.r ?? '', 255);
    const g = parseChannel(channels.g ?? '', 255);
    const b = parseChannel(channels.b ?? '', 255);
    if (r === null || g === null || b === null) return null;
    return rgbToHex({ r, g, b });
  }
  if (mode === 'hsl') {
    const h = parseChannel(channels.h ?? '', 360);
    const s = parseChannel(channels.s ?? '', 100);
    const l = parseChannel(channels.l ?? '', 100);
    if (h === null || s === null || l === null) return null;
    const hsl: HSL = { h, s, l };
    return rgbToHex(hslToRgb(hsl));
  }
  if (mode === 'hsv') {
    const h = parseChannel(channels.h ?? '', 360);
    const s = parseChannel(channels.s ?? '', 100);
    const v = parseChannel(channels.v ?? '', 100);
    if (h === null || s === null || v === null) return null;
    const hsv: HSV = { h: h === 360 ? 0 : h, s, v };
    return rgbToHex(hsvToRgb(hsv));
  }
  const c = parseChannel(channels.c ?? '', 100);
  const m = parseChannel(channels.m ?? '', 100);
  const y = parseChannel(channels.y ?? '', 100);
  const k = parseChannel(channels.k ?? '', 100);
  if (c === null || m === null || y === null || k === null) return null;
  const cmyk: CMYK = { c, m, y, k };
  return rgbToHex(cmykToRgb(cmyk));
}

/** Canonical channel strings for a parsed color, so text, sliders and the picker agree. */
export function syncChannels(mode: ColorMode, channels: ColorChannels): ColorChannels | null {
  const hex = hexFromChannels(mode, channels);
  if (!hex) return null;
  return channelsFromHex(mode, hex);
}

export function encodeColorSearch(mode: ColorMode, channels: ColorChannels): string | null {
  const synced = syncChannels(mode, channels);
  if (!synced) return null;
  if (mode === 'hex') {
    const hex = normalizeHex(synced.hex ?? '');
    return hex ? `hex=${hex.slice(1)}` : null;
  }
  const value = COLOR_CHANNELS[mode].map((channel) => synced[channel.key]).join(',');
  return `${mode}=${value}`;
}

export function decodeColorSearch(search: string): { mode: ColorMode; channels: ColorChannels } | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  for (const mode of COLOR_MODES) {
    const raw = params.get(mode);
    if (!raw) continue;
    if (mode === 'hex') {
      const channels = channelsFromHex('hex', raw);
      return channels ? { mode, channels } : null;
    }
    const parts = raw.split(',');
    const spec = COLOR_CHANNELS[mode];
    if (parts.length !== spec.length) return null;
    const channels: ColorChannels = {};
    for (let index = 0; index < spec.length; index += 1) {
      const channel = spec[index];
      const parsed = parseChannel(parts[index] ?? '', channel.max);
      if (parsed === null) return null;
      channels[channel.key] = String(parsed);
    }
    if (!hexFromChannels(mode, channels)) return null;
    return { mode, channels };
  }
  return null;
}

export function rgbFromChannels(mode: ColorMode, channels: ColorChannels): RGB | null {
  const hex = hexFromChannels(mode, channels);
  if (!hex) return null;
  return hexToRgb(hex);
}
