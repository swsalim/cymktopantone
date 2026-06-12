'use client';

import { useState } from 'react';

import Link from 'next/link';
import { ArrowLeftRight } from 'lucide-react';

import {
  formatCmykString,
  formatHslString,
  formatRgbString,
  rgbToCmyk,
  rgbToHsl,
} from '@/lib/colors';
import { calculateMatchPercentage, deltaE00, rgbToLab } from '@/lib/color-matching';
import { hexToRgbTuple, normalizeHex } from '@/lib/palette-harmony';

import { CopyButton } from '@/components/color-tools/copy-button';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wrapper } from '@/components/wrapper';

function ColorInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  return (
    <div className="min-w-0">
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2 flex items-center gap-3">
        <Input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-12 w-20 shrink-0 cursor-pointer p-1"
        />
        <Input
          value={value}
          onChange={(e) => {
            const v = e.target.value.trim();
            onChange(v.startsWith('#') ? v.toUpperCase() : `#${v.toUpperCase()}`);
          }}
          className="font-mono"
          spellCheck={false}
          aria-label={`${label} HEX value`}
        />
      </div>
    </div>
  );
}

function FormatTable({ hex }: { hex: string }) {
  const rgb = hexToRgbTuple(hex);
  const rows = [
    { label: 'HEX', value: normalizeHex(hex) },
    { label: 'RGB', value: formatRgbString(rgb) },
    { label: 'CMYK', value: formatCmykString(rgbToCmyk(rgb)) },
    { label: 'HSL', value: formatHslString(rgbToHsl(rgb)) },
  ];

  return (
    <dl className="space-y-2">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-2">
          <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {row.label}
          </dt>
          <dd className="flex min-w-0 items-center gap-1.5">
            <span className="truncate font-mono text-xs text-gray-800 dark:text-gray-200">
              {row.value}
            </span>
            <CopyButton text={row.value} label="" className="h-6 px-1.5" />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function verdictFor(deltaE: number): { heading: string; detail: string } {
  if (deltaE <= 1) {
    return {
      heading: 'Indistinguishable',
      detail: 'Below the just-noticeable difference. These read as the same color to everyone.',
    };
  }
  if (deltaE <= 2.3) {
    return {
      heading: 'Barely distinguishable',
      detail:
        'At the edge of the just-noticeable difference (ΔE ≈ 2.3). Safe to treat as the same color in brand guidelines.',
    };
  }
  if (deltaE <= 10) {
    return {
      heading: 'Noticeably different',
      detail:
        'A trained eye sees the difference at a glance. Too far apart to use interchangeably for brand colors.',
    };
  }
  if (deltaE <= 35) {
    return {
      heading: 'Clearly different colors',
      detail: 'Most viewers see two distinct colors. Fine as separate palette roles.',
    };
  }
  return {
    heading: 'Completely different',
    detail: 'No perceptual relationship — these are unrelated colors.',
  };
}

export function ColorComparator() {
  const [hexA, setHexA] = useState('#7C3AED');
  const [hexB, setHexB] = useState('#6D28D9');

  const validA = /^#[0-9A-F]{6}$/i.test(hexA);
  const validB = /^#[0-9A-F]{6}$/i.test(hexB);

  const deltaE =
    validA && validB
      ? deltaE00(rgbToLab(hexToRgbTuple(hexA)), rgbToLab(hexToRgbTuple(hexB)))
      : null;
  const matchPct = deltaE !== null ? calculateMatchPercentage(deltaE) : null;
  const verdict = deltaE !== null ? verdictFor(deltaE) : null;

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <ColorInput id="compare-a" label="Color A" value={hexA} onChange={setHexA} />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mx-auto mb-1 hidden sm:flex"
            onClick={() => {
              setHexA(hexB);
              setHexB(hexA);
            }}
            aria-label="Swap colors">
            <ArrowLeftRight className="size-4" />
          </Button>
          <ColorInput id="compare-b" label="Color B" value={hexB} onChange={setHexB} />
        </div>

        {deltaE !== null && verdict && (
          <>
            <div className="mt-10 flex h-36 overflow-hidden rounded-2xl shadow-sm md:h-44">
              <div className="flex-1" style={{ backgroundColor: hexA }} />
              <div className="flex-1" style={{ backgroundColor: hexB }} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
              <div className="rounded-xl border border-violet-200/70 bg-white/90 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900/80">
                <h2 className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {normalizeHex(hexA)}
                </h2>
                <div className="mt-4">
                  <FormatTable hex={hexA} />
                </div>
              </div>
              <div className="rounded-xl border border-violet-200/70 bg-white/90 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900/80">
                <h2 className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {normalizeHex(hexB)}
                </h2>
                <div className="mt-4">
                  <FormatTable hex={hexB} />
                </div>
              </div>

              <div className="rounded-xl border border-violet-200/70 bg-gradient-to-br from-violet-50/90 to-cyan-50/60 p-5 shadow-sm dark:border-violet-500/30 dark:from-violet-500/10 dark:to-cyan-500/5">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {deltaE.toFixed(1)}
                  </span>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    ΔE2000
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {matchPct}% perceptual match
                </p>
                <h3 className="mt-4 font-heading text-lg font-bold text-gray-900 dark:text-gray-100">
                  {verdict.heading}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {verdict.detail}
                </p>
              </div>
            </div>
          </>
        )}

        <p className="mt-8 max-w-3xl text-sm text-gray-600 dark:text-gray-400">
          ΔE2000 (CIEDE2000) measures perceptual color difference in Lab space — how different two
          colors look to humans, not how far apart their RGB numbers are. A ΔE below 2.3 is the
          &ldquo;just-noticeable difference&rdquo;: most people cannot tell the colors apart. Check
          how each color holds up in print with the{' '}
          <Link
            href="/print-gamut"
            className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            print gamut checker
          </Link>
          .
        </p>

        <RelatedColorTools excludeHref="/compare-colors" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
