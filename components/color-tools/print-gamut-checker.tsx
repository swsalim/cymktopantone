'use client';

import { useState } from 'react';

import Link from 'next/link';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

import { formatCmykString } from '@/lib/colors';
import { getGamutReport } from '@/lib/gamut';
import { parseHexPaletteInput } from '@/lib/brand-palette';

import { CopyButton } from '@/components/color-tools/copy-button';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wrapper } from '@/components/wrapper';

function GamutCard({ hex }: { hex: string }) {
  const report = getGamutReport(hex);

  return (
    <div className="overflow-hidden rounded-xl border border-violet-200/70 bg-white/90 shadow-sm dark:border-gray-700 dark:bg-gray-900/80">
      <div className="flex h-28">
        <div className="flex-1" style={{ backgroundColor: report.hex }} />
        <div className="flex-1" style={{ backgroundColor: report.printHex }} />
      </div>
      <div className="grid grid-cols-2 border-b border-gray-100 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <span className="py-1.5">Screen</span>
        <span className="border-l border-gray-100 py-1.5 dark:border-gray-800">Press (CMYK)</span>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
            {report.hex}
          </span>
          {report.outOfGamut ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
              <AlertTriangle className="size-3.5" aria-hidden /> Will shift
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800 dark:bg-green-500/20 dark:text-green-300">
              <CheckCircle2 className="size-3.5" aria-hidden /> Print-safe
            </span>
          )}
        </div>
        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
          {formatCmykString(report.cmyk)}
        </p>
        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
          On press: {report.printHex} · ΔE {report.deltaE.toFixed(1)}
        </p>
        <div className="flex items-center gap-3 pt-1">
          <CopyButton text={formatCmykString(report.cmyk)} label="Copy CMYK" className="h-8" />
          <Link
            href="/convert-hex-to-cmyk"
            className="text-xs font-medium text-violet-600 hover:underline dark:text-violet-400">
            Full converter →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PrintGamutChecker() {
  const [singleHex, setSingleHex] = useState('#3AED7C');
  const [batchText, setBatchText] = useState('');

  const batchHexes = parseHexPaletteInput(batchText).slice(0, 8);
  const colors = batchHexes.length > 0 ? batchHexes.map((h) => `#${h}`) : [singleHex];

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="mb-10 grid max-w-2xl gap-6">
          <div>
            <Label htmlFor="gamut-color">Check one color</Label>
            <div className="mt-2 flex items-center gap-3">
              <Input
                id="gamut-color"
                type="color"
                value={singleHex}
                onChange={(e) => setSingleHex(e.target.value.toUpperCase())}
                className="h-12 w-20 shrink-0 cursor-pointer p-1"
              />
              <Input
                value={singleHex}
                onChange={(e) => {
                  const v = e.target.value;
                  setSingleHex(v.startsWith('#') ? v.toUpperCase() : `#${v.toUpperCase()}`);
                }}
                className="font-mono"
                spellCheck={false}
                aria-label="HEX value"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="gamut-batch">Or paste a palette (up to 8 HEX values)</Label>
            <Textarea
              id="gamut-batch"
              value={batchText}
              onChange={(e) => setBatchText(e.target.value)}
              placeholder="#5B21B6, #3AED7C, #FF2D9E …"
              className="mt-2 font-mono"
              rows={2}
              spellCheck={false}
            />
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Separated by commas, spaces, or line breaks. Batch input overrides the single color
              above.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((hex) => (
            <GamutCard key={hex} hex={hex} />
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm text-gray-600 dark:text-gray-400">
          The press preview converts your color to CMYK and back — the same shift a standard
          conversion applies before ink hits paper. Saturated greens, neons, and electric blues
          shift the most. Read why in{' '}
          <Link
            href="/blog/cmyk-safe-web-palettes"
            className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            our guide to CMYK-safe palettes
          </Link>
          .
        </p>

        <RelatedColorTools excludeHref="/print-gamut" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
