'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import {
  cmykToRgb,
  formatCmykString,
  formatRgbString,
  hexToRgb,
  hslToRgb,
  hsvToRgb,
  isValidHex,
  rgbToCmyk,
  rgbToHex,
} from '@/lib/colors';
import { getGamutReport } from '@/lib/gamut';
import { DISTANCE_BAND_TOOLTIP, distanceBand, nearestSpotColors } from '@/lib/spot-set';
import type { CMYK, HSL, HSV, RGB } from '@/types';

import { CopyButton } from '@/components/color-tools/copy-button';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wrapper } from '@/components/wrapper';

const TABS = ['RGB', 'HEX', 'HSL', 'HSV', 'CMYK'] as const;
type Tab = (typeof TABS)[number];

const HINTS: Record<Tab, string> = {
  RGB: 'Red, green and blue, 0 to 255',
  HEX: 'Six-digit HEX code, for example #7C3AED',
  HSL: 'Hue 0 to 360, saturation and lightness 0 to 100',
  HSV: 'Hue 0 to 360, saturation and value 0 to 100',
  CMYK: 'Cyan, magenta, yellow and black, 0 to 100',
};

type Fields = Record<string, string>;

const EMPTY_FIELDS: Record<Tab, Fields> = {
  RGB: { r: '', g: '', b: '' },
  HEX: { hex: '' },
  HSL: { h: '', s: '', l: '' },
  HSV: { h: '', s: '', v: '' },
  CMYK: { c: '', m: '', y: '', k: '' },
};

function parseChannel(value: string, max: number): number | null {
  if (!/^\d{1,3}$/.test(value.trim())) return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > max) return null;
  return number;
}

function fieldsAreEmpty(fields: Fields): boolean {
  return Object.values(fields).every((value) => value.trim() === '');
}

function parseRgb(fields: Fields): RGB | null {
  const r = parseChannel(fields.r ?? '', 255);
  const g = parseChannel(fields.g ?? '', 255);
  const b = parseChannel(fields.b ?? '', 255);
  if (r === null || g === null || b === null) return null;
  return { r, g, b };
}

function parseHex(fields: Fields): RGB | null {
  const value = (fields.hex ?? '').trim();
  if (!isValidHex(value)) return null;
  return hexToRgb(value);
}

function parseHsl(fields: Fields): RGB | null {
  const h = parseChannel(fields.h ?? '', 360);
  const s = parseChannel(fields.s ?? '', 100);
  const l = parseChannel(fields.l ?? '', 100);
  if (h === null || s === null || l === null) return null;
  const hsl: HSL = { h, s, l };
  return hslToRgb(hsl);
}

function parseHsv(fields: Fields): RGB | null {
  const h = parseChannel(fields.h ?? '', 360);
  const s = parseChannel(fields.s ?? '', 100);
  const v = parseChannel(fields.v ?? '', 100);
  if (h === null || s === null || v === null) return null;
  const hsv: HSV = { h: h === 360 ? 0 : h, s, v };
  return hsvToRgb(hsv);
}

function parseCmyk(fields: Fields): RGB | null {
  const c = parseChannel(fields.c ?? '', 100);
  const m = parseChannel(fields.m ?? '', 100);
  const y = parseChannel(fields.y ?? '', 100);
  const k = parseChannel(fields.k ?? '', 100);
  if (c === null || m === null || y === null || k === null) return null;
  const cmyk: CMYK = { c, m, y, k };
  return cmykToRgb(cmyk);
}

const PARSERS: Record<Tab, (fields: Fields) => RGB | null> = {
  RGB: parseRgb,
  HEX: parseHex,
  HSL: parseHsl,
  HSV: parseHsv,
  CMYK: parseCmyk,
};

function applyQuery(search: string): { tab: Tab; fields: Fields } | null {
  const params = new URLSearchParams(search);
  const rgb = params.get('rgb');
  if (rgb) {
    const parts = rgb.split(',');
    if (parts.length === 3) return { tab: 'RGB', fields: { r: parts[0].trim(), g: parts[1].trim(), b: parts[2].trim() } };
  }
  const hex = params.get('hex');
  if (hex) return { tab: 'HEX', fields: { hex: hex.trim() } };
  const hsl = params.get('hsl');
  if (hsl) {
    const parts = hsl.split(',');
    if (parts.length === 3) return { tab: 'HSL', fields: { h: parts[0].trim(), s: parts[1].trim(), l: parts[2].trim() } };
  }
  const hsv = params.get('hsv');
  if (hsv) {
    const parts = hsv.split(',');
    if (parts.length === 3) return { tab: 'HSV', fields: { h: parts[0].trim(), s: parts[1].trim(), v: parts[2].trim() } };
  }
  const cmyk = params.get('cmyk');
  if (cmyk) {
    const parts = cmyk.split(',');
    if (parts.length === 4) {
      return { tab: 'CMYK', fields: { c: parts[0].trim(), m: parts[1].trim(), y: parts[2].trim(), k: parts[3].trim() } };
    }
  }
  return null;
}

export function SpotColorMatcher({ disclaimer }: { disclaimer: string }) {
  const [tab, setTab] = useState<Tab>('RGB');
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS.RGB);

  useEffect(() => {
    const fromQuery = applyQuery(window.location.search);
    if (!fromQuery) return;
    setTab(fromQuery.tab);
    setFields(fromQuery.fields);
  }, []);

  const empty = fieldsAreEmpty(fields);
  const rgb = empty ? null : PARSERS[tab](fields);
  const invalid = !empty && rgb === null;
  const result = rgb
    ? {
        rgb,
        matches: nearestSpotColors(rgb),
        cmyk: rgbToCmyk(rgb),
        gamut: getGamutReport(rgbToHex(rgb)),
      }
    : null;

  const setField = (key: string, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
  };

  const allValues = result
    ? `HEX: ${result.gamut.hex}\nRGB: ${formatRgbString(result.rgb)}\nCMYK: ${formatCmykString(result.cmyk)}`
    : '';

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Input tabs">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                tab === item
                  ? 'bg-violet-600 text-white'
                  : 'bg-violet-50 text-violet-800 dark:bg-violet-500/10 dark:text-violet-200'
              }`}
              onClick={() => {
                setTab(item);
                setFields(EMPTY_FIELDS[item]);
              }}>
              {item}
            </button>
          ))}
        </div>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{HINTS[tab]}</p>
        <div className="mb-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          {Object.keys(fields).map((key) => (
            <div key={key}>
              <Label htmlFor={`spot-${tab}-${key}`}>{key.toUpperCase()}</Label>
              <Input
                id={`spot-${tab}-${key}`}
                value={fields[key] ?? ''}
                onChange={(event) => setField(key, event.target.value)}
                className="mt-1 font-mono"
                inputMode={key === 'hex' ? 'text' : 'numeric'}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          ))}
        </div>

        <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
          Closest matches in our reference set
        </h2>
        <p id="distance-band-guide" className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-400">
          {DISTANCE_BAND_TOOLTIP}
        </p>

        {empty && <p className="mt-6 text-sm text-gray-700 dark:text-gray-300">Enter a color to see its closest matches.</p>}
        {invalid && (
          <p className="mt-6 text-sm text-gray-700 dark:text-gray-300" role="alert">
            That doesn&apos;t look like a valid {tab} value. Check the format and try again.
          </p>
        )}

        {result && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-700">
                  <th className="py-2 pr-3 font-semibold">Code</th>
                  <th className="py-2 pr-3 font-semibold">Swatch</th>
                  <th className="py-2 pr-3 font-semibold">HEX</th>
                  <th className="py-2 pr-3 font-semibold">ΔE2000</th>
                  <th className="py-2 font-semibold">
                    <span aria-describedby="distance-band-guide">How close</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.matches.map((match) => (
                  <tr key={match.code} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 pr-3 font-mono text-xs">{match.code}</td>
                    <td className="py-3 pr-3">
                      <span
                        className="inline-block size-8 rounded-md border border-black/10"
                        style={{ backgroundColor: match.hex }}
                        role="img"
                        aria-label={`${match.code} ${match.hex}`}
                      />
                    </td>
                    <td className="py-3 pr-3 font-mono text-xs">{match.hex}</td>
                    <td className="py-3 pr-3 font-mono text-xs">{match.deltaE.toFixed(2)}</td>
                    <td className="py-3">{distanceBand(match.deltaE)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 max-w-3xl text-sm text-gray-700 dark:text-gray-300">
          These are reference colors for comparing screen values, not inks you can order. To print a spot color, give your printer the HEX, RGB and CMYK values below and ask them to match it in the swatch system they use.
        </p>

        {result && (
          <div className="mt-8 max-w-2xl rounded-2xl border border-violet-200/70 p-5 dark:border-gray-700">
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100">
              Your color in four-color print (CMYK)
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt>CMYK build</dt>
                <dd className="font-mono">{formatCmykString(result.cmyk)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>On press (after a CMYK round trip)</dt>
                <dd className="font-mono">{result.gamut.printHex}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Shift (ΔE2000)</dt>
                <dd className="font-mono">{result.gamut.deltaE.toFixed(2)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              A large shift means CMYK process ink won&apos;t hold this color. That&apos;s usually when a spot ink is worth discussing with your printer. For a full palette, use the{' '}
              <Link href="/print-gamut" className="font-medium text-violet-700 hover:underline dark:text-violet-300">
                print gamut checker
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton text={result.gamut.hex} label="Copy HEX" />
              <CopyButton text={formatRgbString(result.rgb)} label="Copy RGB" />
              <CopyButton text={formatCmykString(result.cmyk)} label="Copy CMYK" />
              <CopyButton text={allValues} label="Copy all values" />
            </div>
          </div>
        )}

        <p className="mt-8 max-w-3xl text-sm text-gray-600 dark:text-gray-400">{disclaimer}</p>
      </Container>
    </Wrapper>
  );
}
