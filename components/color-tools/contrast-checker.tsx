'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { parsePaletteFromQuery } from '@/lib/gradient';
import { normalizeHex } from '@/lib/palette-harmony';
import {
  buildContrastMatrix,
  getContrastResult,
  suggestPassingColor,
} from '@/lib/wcag-contrast';
import { cn } from '@/lib/utils';

import { CopyButton } from '@/components/color-tools/copy-button';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wrapper } from '@/components/wrapper';

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <span
      className={cn(
        'rounded-md px-2 py-0.5 text-xs font-semibold',
        pass
          ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200',
      )}>
      {label}: {pass ? 'Pass' : 'Fail'}
    </span>
  );
}

interface ContrastCheckerProps {
  initialForeground?: string;
  initialBackground?: string;
  initialPalette?: string[] | null;
}

export function ContrastChecker({
  initialForeground = '#1F2937',
  initialBackground = '#FFFFFF',
  initialPalette = null,
}: ContrastCheckerProps) {
  const [foreground, setForeground] = useState(initialForeground);
  const [background, setBackground] = useState(initialBackground);
  const [paletteMode, setPaletteMode] = useState(false);
  const [paletteInput, setPaletteInput] = useState(
    initialPalette?.join(', ') ?? '#5B21B6, #7C3AED, #C4B5FD, #FFFFFF, #1F2937',
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parsed = parsePaletteFromQuery(params.get('colors'));
    if (parsed && parsed.length > 0) {
      setPaletteInput(parsed.join(', '));
      setPaletteMode(true);
    }
  }, []);

  const result = getContrastResult(foreground, background);
  const suggestion = !result.normalTextAA
    ? suggestPassingColor(foreground, background)
    : null;

  const paletteColors = paletteInput
    .split(',')
    .map((c) => c.trim())
    .filter((c) => /^#?[0-9A-Fa-f]{3,6}$/.test(c))
    .map(normalizeHex);

  const matrix = paletteColors.length >= 2 ? buildContrastMatrix(paletteColors) : null;

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="mb-6 flex gap-2">
          <Button
            type="button"
            variant={!paletteMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaletteMode(false)}>
            Pair checker
          </Button>
          <Button
            type="button"
            variant={paletteMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaletteMode(true)}>
            Palette matrix
          </Button>
        </div>

        {!paletteMode ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Label htmlFor="fg">Text (foreground)</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    id="fg"
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="h-12 w-16 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bg">Background</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    id="bg"
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-12 w-16 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setForeground(background);
                  setBackground(foreground);
                }}>
                Swap colors
              </Button>
            </div>

            <div className="space-y-4">
              <div
                className="rounded-2xl border border-gray-200 p-8 dark:border-gray-700"
                style={{ backgroundColor: background, color: foreground }}>
                <p className="text-lg font-semibold">Sample heading text</p>
                <p className="mt-2 text-sm">
                  Body copy preview. The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div className="rounded-xl border border-violet-200/70 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/80">
                <p className="text-3xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
                  {result.ratioFormatted}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contrast ratio</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge pass={result.normalTextAA} label="AA normal" />
                  <Badge pass={result.normalTextAAA} label="AAA normal" />
                  <Badge pass={result.largeTextAA} label="AA large" />
                  <Badge pass={result.largeTextAAA} label="AAA large" />
                </div>
                {suggestion && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Suggested fix:</span>
                    <span
                      className="inline-block size-6 rounded border border-gray-300"
                      style={{ backgroundColor: suggestion }}
                    />
                    <CopyButton text={suggestion} label={suggestion} />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setForeground(suggestion)}>
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <Label htmlFor="palette-colors">Palette colors (comma-separated HEX)</Label>
              <Input
                id="palette-colors"
                value={paletteInput}
                onChange={(e) => setPaletteInput(e.target.value)}
                className="mt-2 font-mono"
                placeholder="#5B21B6, #7C3AED, #FFFFFF"
              />
            </div>
            {matrix && (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="p-2" />
                      {matrix.labels.map((label) => (
                        <th key={label} className="p-2 font-mono">
                          <span
                            className="inline-block size-4 rounded border border-gray-300 align-middle"
                            style={{ backgroundColor: label }}
                          />{' '}
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.cells.map((row, ri) => (
                      <tr key={ri}>
                        <td className="p-2 font-mono font-semibold">{matrix.labels[ri]}</td>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={cn(
                              'p-2 text-center font-mono',
                              cell.result.normalTextAA
                                ? 'bg-green-50 dark:bg-green-500/10'
                                : 'bg-red-50 dark:bg-red-500/10',
                            )}>
                            {cell.result.ratioFormatted}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          Need lighter/darker variants? Try the{' '}
          <Link href="/color-scale" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            tint & shade generator
          </Link>
          .
        </p>

        <RelatedColorTools excludeHref="/contrast-checker" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
