'use client';

import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import { RefreshCw } from 'lucide-react';

import { isCatalogHex } from '@/lib/color-catalog';
import {
  formatCmykString,
  formatHslString,
  formatRgbString,
  hexToRgb,
  luminance,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
} from '@/lib/colors';
import { gamutWarningMessage } from '@/lib/gamut';
import { paletteToCssVariables } from '@/lib/palette-harmony';
import { cn } from '@/lib/utils';

import { CopyButton } from '@/components/color-tools/copy-button';
import { PaletteSwatch } from '@/components/color-tools/palette-swatch';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Wrapper } from '@/components/wrapper';

const PALETTE_SIZE = 5;

interface Gradient {
  from: string;
  to: string;
  angle: number;
}

function randomChannel(): number {
  return Math.floor(Math.random() * 256);
}

function randomHex(): string {
  return rgbToHex({ r: randomChannel(), g: randomChannel(), b: randomChannel() });
}

function randomGradient(): Gradient {
  return {
    from: randomHex(),
    to: randomHex(),
    angle: Math.floor(Math.random() * 360),
  };
}

function gradientDeclaration(gradient: Gradient): string {
  return `background: linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to});`;
}

function inkOn(hex: string): string {
  return luminance(hexToRgb(hex)) > 0.179 ? '#111827' : '#F9FAFB';
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

function ColorFormats({ hex }: { hex: string }) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const cmyk = rgbToCmyk(rgb);
  const rows = [
    ['HEX', hex],
    ['RGB', formatRgbString(rgb)],
    ['HSL', formatHslString(hsl)],
    ['CMYK', formatCmykString(cmyk)],
  ] as const;
  const catalog = isCatalogHex(hex);
  const warning = gamutWarningMessage(hex);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
      <div
        className="flex min-h-40 items-end rounded-xl p-4"
        style={{ backgroundColor: hex, color: inkOn(hex) }}
      >
        <p className="font-mono text-lg font-semibold">{hex}</p>
      </div>
      <div className="space-y-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 rounded-lg border border-violet-200/70 bg-white/80 px-3 py-2 dark:border-gray-700 dark:bg-gray-900/80"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {label}
              </p>
              <p className="font-mono text-sm text-gray-900 dark:text-gray-100">{value}</p>
            </div>
            <CopyButton text={value} label="Copy" />
          </div>
        ))}
        {catalog ? (
          <Link
            href={`/color/${hex.replace('#', '')}`}
            className="inline-block text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            Open the {hex} color page
          </Link>
        ) : null}
        {warning ? (
          <p className="text-amber-800 dark:text-amber-200 text-xs leading-relaxed">{warning}</p>
        ) : null}
      </div>
    </div>
  );
}

function EmptySwatch({ label }: { label: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-violet-300 bg-violet-50/60 px-4 text-center text-sm text-gray-600 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-gray-300">
      {label}
    </div>
  );
}

export function RandomColorGenerator() {
  const [color, setColor] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[] | null>(null);
  const [locked, setLocked] = useState<boolean[]>(() => Array(PALETTE_SIZE).fill(false));
  const [gradient, setGradient] = useState<Gradient | null>(null);

  const regeneratePalette = useCallback(() => {
    setPalette((current) =>
      Array.from({ length: PALETTE_SIZE }, (_, index) =>
        locked[index] && current?.[index] ? current[index] : randomHex(),
      ),
    );
  }, [locked]);

  const regenerateAll = useCallback(() => {
    setColor(randomHex());
    setGradient(randomGradient());
    setPalette((current) =>
      Array.from({ length: PALETTE_SIZE }, (_, index) =>
        locked[index] && current?.[index] ? current[index] : randomHex(),
      ),
    );
  }, [locked]);

  useEffect(() => {
    setColor(randomHex());
    setPalette(Array.from({ length: PALETTE_SIZE }, () => randomHex()));
    setGradient(randomGradient());
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.code !== 'Space' || isTypingTarget(event.target)) return;
      event.preventDefault();
      regenerateAll();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [regenerateAll]);

  const paletteCss = palette ? `:root {\n${paletteToCssVariables(palette, 'random')}\n}` : '';
  const css = gradient ? gradientDeclaration(gradient) : '';

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Press{' '}
            <kbd className="font-mono rounded border border-violet-200 bg-white px-1.5 py-0.5 text-xs dark:border-gray-600 dark:bg-gray-900">
              Space
            </kbd>{' '}
            to regenerate the color, unlocked palette swatches, and the gradient.
          </p>
          <Button type="button" onClick={regenerateAll} className="gap-2">
            <RefreshCw className="size-4" />
            Generate again
          </Button>
        </div>

        <section aria-labelledby="random-color-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2
              id="random-color-heading"
              className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100"
            >
              Random color
            </h2>
            <Button type="button" variant="outline" onClick={() => setColor(randomHex())}>
              New color
            </Button>
          </div>
          {color ? (
            <ColorFormats hex={color} />
          ) : (
            <EmptySwatch label="A random HEX color appears here after the page loads in your browser." />
          )}
          {color ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/palettes?color=${color.replace('#', '')}`}>Build a harmony</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/color-scale">Make a 50–950 scale</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/contrast-checker?colors=${color.replace('#', '')},FFFFFF`}>
                  Check contrast
                </Link>
              </Button>
            </div>
          ) : null}
        </section>

        <section aria-labelledby="random-palette-heading" className="mt-12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                id="random-palette-heading"
                className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100"
              >
                Random palette
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Five colors. Lock a swatch to keep it, then generate the rest again.
              </p>
            </div>
            <Button type="button" variant="outline" onClick={regeneratePalette}>
              New palette
            </Button>
          </div>
          {palette ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {palette.map((hex, index) => (
                <PaletteSwatch
                  key={index}
                  hex={hex}
                  index={index}
                  locked={locked[index]}
                  onToggleLock={() =>
                    setLocked((current) =>
                      current.map((value, i) => (i === index ? !value : value)),
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <EmptySwatch label="Five random colors appear here after the page loads in your browser." />
          )}
          {palette ? (
            <div className="rounded-xl border border-violet-200/70 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/80">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                CSS custom properties
              </p>
              <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-gray-950 p-3 text-xs text-gray-100">
                {paletteCss}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyButton text={paletteCss} label="Copy CSS" />
                <CopyButton text={palette.join(', ')} label="Copy HEX list" />
              </div>
            </div>
          ) : null}
        </section>

        <section aria-labelledby="random-gradient-heading" className="mt-12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                id="random-gradient-heading"
                className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100"
              >
                Random linear gradient
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Two colors and one angle. Copy the CSS, or open it in the gradient generator to add
                stops.
              </p>
            </div>
            <Button type="button" variant="outline" onClick={() => setGradient(randomGradient())}>
              New gradient
            </Button>
          </div>
          {gradient ? (
            <div className="space-y-3">
              <div
                className="h-36 rounded-xl border border-violet-200/70 dark:border-gray-700"
                style={{
                  background: `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`,
                }}
                role="img"
                aria-label={`Linear gradient from ${gradient.from} to ${gradient.to} at ${gradient.angle} degrees`}
              />
              <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{css}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <GradientStopLink hex={gradient.from} />
                <GradientStopLink hex={gradient.to} />
              </div>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={css} label="Copy CSS" />
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/gradients?colors=${gradient.from.replace('#', '')},${gradient.to.replace('#', '')}`}
                  >
                    Edit in gradient generator
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <EmptySwatch label="A two-color linear gradient appears here after the page loads in your browser." />
          )}
        </section>

        <RelatedColorTools excludeHref="/random-color-generator" className="mt-12" />
      </Container>
    </Wrapper>
  );
}

function GradientStopLink({ hex }: { hex: string }) {
  const className = cn(
    'font-mono text-sm font-medium',
    isCatalogHex(hex)
      ? 'text-violet-600 hover:underline dark:text-violet-400'
      : 'text-gray-800 dark:text-gray-200',
  );
  if (!isCatalogHex(hex)) return <span className={className}>{hex}</span>;
  return (
    <Link href={`/color/${hex.replace('#', '')}`} className={className}>
      {hex}
    </Link>
  );
}
