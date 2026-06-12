'use client';

import { useState } from 'react';

import Link from 'next/link';

import { generateTailwindScale, scaleToCssVariables, scaleToTailwindConfig } from '@/lib/color-scale';
import { getContrastResult } from '@/lib/wcag-contrast';
import { formatCmykString, rgbToCmyk } from '@/lib/colors';
import { hexToRgbTuple, normalizeHex } from '@/lib/palette-harmony';
import { cn } from '@/lib/utils';

import { CopyButton } from '@/components/color-tools/copy-button';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wrapper } from '@/components/wrapper';

export function ColorScaleGenerator() {
  const [baseHex, setBaseHex] = useState('#6D39AC');
  const [exportFormat, setExportFormat] = useState<'tailwind' | 'css'>('tailwind');
  const scale = generateTailwindScale(baseHex);

  const exportText =
    exportFormat === 'tailwind'
      ? scaleToTailwindConfig(scale)
      : `:root {\n${scaleToCssVariables(scale)}\n}`;

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="mb-8 max-w-md space-y-4">
          <div>
            <Label htmlFor="base-color">Brand color</Label>
            <Input
              id="base-color"
              type="color"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              className="mt-2 h-16 w-full cursor-pointer"
            />
            <Input
              type="text"
              value={baseHex}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#?[0-9A-Fa-f]{3,6}$/.test(v)) {
                  setBaseHex(v.startsWith('#') ? v : `#${v}`);
                }
              }}
              className="mt-2 font-mono"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scale.map(({ step, hex }) => {
            const normalized = normalizeHex(hex);
            const rgb = hexToRgbTuple(normalized);
            const cmyk = rgbToCmyk(rgb);
            const onWhite = getContrastResult(normalized, '#FFFFFF');
            const onBlack = getContrastResult(normalized, '#000000');

            return (
              <div
                key={step}
                className="overflow-hidden rounded-xl border border-violet-200/70 bg-white/90 dark:border-gray-700 dark:bg-gray-900/80">
                <div className="h-16 w-full" style={{ backgroundColor: normalized }} />
                <div className="space-y-1 p-3 text-xs">
                  <p className="font-bold text-gray-900 dark:text-gray-100">{step}</p>
                  <p className="font-mono">{normalized}</p>
                  <p className="font-mono text-gray-600 dark:text-gray-400">
                    {formatCmykString(cmyk)}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 font-semibold',
                        onWhite.normalTextAA
                          ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
                      )}>
                      /white {onWhite.ratioFormatted}
                    </span>
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 font-semibold',
                        onBlack.normalTextAA
                          ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
                      )}>
                      /black {onBlack.ratioFormatted}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-violet-200/70 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/80">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <Label>Export scale</Label>
            <Select
              value={exportFormat}
              onValueChange={(v) => setExportFormat(v as typeof exportFormat)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tailwind">Tailwind config</SelectItem>
                <SelectItem value="css">CSS variables</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <pre className="max-h-48 overflow-auto rounded-lg bg-gray-950 p-3 text-xs text-gray-100">
            {exportText}
          </pre>
          <CopyButton text={exportText} label="Copy export" className="mt-3" />
        </div>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          Validate text pairs with the{' '}
          <Link href="/contrast-checker" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            WCAG contrast checker
          </Link>
          .
        </p>

        <RelatedColorTools excludeHref="/color-scale" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
