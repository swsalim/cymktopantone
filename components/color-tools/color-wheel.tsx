'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from '@/lib/colors';
import {
  generateHarmony,
  HARMONY_SCHEMES,
  HarmonyScheme,
  normalizeHex,
} from '@/lib/palette-harmony';
import { cn } from '@/lib/utils';

import { PaletteSwatch } from '@/components/color-tools/palette-swatch';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Wrapper } from '@/components/wrapper';

const WHEEL_GRADIENT =
  'conic-gradient(hsl(0 100% 50%), hsl(30 100% 50%), hsl(60 100% 50%), hsl(90 100% 50%), hsl(120 100% 50%), hsl(150 100% 50%), hsl(180 100% 50%), hsl(210 100% 50%), hsl(240 100% 50%), hsl(270 100% 50%), hsl(300 100% 50%), hsl(330 100% 50%), hsl(360 100% 50%))';

interface ColorWheelProps {
  initialScheme?: HarmonyScheme;
  showSchemePicker?: boolean;
}

export function ColorWheel({ initialScheme, showSchemePicker = true }: ColorWheelProps) {
  const [hue, setHue] = useState(262);
  const [saturation, setSaturation] = useState(64);
  const [lightness, setLightness] = useState(45);
  const [scheme, setScheme] = useState<HarmonyScheme>(initialScheme ?? 'triadic');
  const [hexInput, setHexInput] = useState('');
  const wheelRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const seedHex = rgbToHex(hslToRgb({ h: hue, s: saturation, l: lightness }));
  const colors = generateHarmony(seedHex, scheme);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const color = params.get('color');
    if (color && /^#?[0-9a-fA-F]{3,6}$/.test(color)) {
      const hsl = rgbToHsl(hexToRgb(normalizeHex(color)));
      setHue(Math.round(hsl.h));
      setSaturation(Math.round(hsl.s));
      setLightness(Math.round(hsl.l));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickFromPointer = useCallback((clientX: number, clientY: number) => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    const rect = wheel.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const radius = rect.width / 2;
    // 0° at top, clockwise — matches the conic-gradient orientation
    const angle = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy) / radius, 1);
    setHue(Math.round(angle));
    setSaturation(Math.round(dist * 100));
  }, []);

  const applyHex = (raw: string) => {
    setHexInput(raw);
    const cleaned = raw.trim().replace(/^#/, '');
    if (/^[0-9a-fA-F]{6}$/.test(cleaned) || /^[0-9a-fA-F]{3}$/.test(cleaned)) {
      const hsl = rgbToHsl(hexToRgb(normalizeHex(cleaned)));
      setHue(Math.round(hsl.h));
      setSaturation(Math.round(hsl.s));
      setLightness(Math.round(hsl.l));
    }
  };

  /** Marker position for a hex color on the wheel (percent offsets from center). */
  const markerPosition = (hex: string) => {
    const hsl = rgbToHsl(hexToRgb(hex));
    const rad = (hsl.h * Math.PI) / 180;
    const r = (hsl.s / 100) * 50;
    return {
      left: `${50 + r * Math.sin(rad)}%`,
      top: `${50 - r * Math.cos(rad)}%`,
    };
  };

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          {/* Wheel + controls */}
          <div className="min-w-0">
            <div
              ref={wheelRef}
              role="slider"
              aria-label="Color wheel — drag to pick hue and saturation"
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={hue}
              aria-valuetext={`Hue ${hue} degrees, saturation ${saturation} percent`}
              tabIndex={0}
              className="relative mx-auto aspect-square w-full max-w-[340px] cursor-crosshair touch-none select-none rounded-full shadow-md ring-1 ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:ring-white/10 dark:focus-visible:ring-offset-gray-950"
              style={{ background: WHEEL_GRADIENT }}
              onPointerDown={(e) => {
                draggingRef.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                pickFromPointer(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (draggingRef.current) pickFromPointer(e.clientX, e.clientY);
              }}
              onPointerUp={() => {
                draggingRef.current = false;
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setHue((h) => (h + 355) % 360);
                if (e.key === 'ArrowRight') setHue((h) => (h + 5) % 360);
                if (e.key === 'ArrowUp') setSaturation((s) => Math.min(100, s + 5));
                if (e.key === 'ArrowDown') setSaturation((s) => Math.max(0, s - 5));
              }}>
              {/* Saturation falloff toward center */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(0 0% 78%) 0%, transparent 70%)',
                }}
              />
              {/* Harmony markers */}
              {colors.map((hex, i) => (
                <span
                  key={`${hex}-${i}`}
                  aria-hidden
                  className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md dark:border-gray-900"
                  style={{ ...markerPosition(hex), backgroundColor: hex }}
                />
              ))}
              {/* Seed marker */}
              <span
                aria-hidden
                className="pointer-events-none absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-lg ring-1 ring-black/20 dark:border-gray-900"
                style={{
                  ...markerPosition(seedHex),
                  backgroundColor: seedHex,
                }}
              />
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wheel-lightness">Lightness</Label>
                  <span className="font-mono text-xs text-gray-600 dark:text-gray-400">
                    {lightness}%
                  </span>
                </div>
                <Slider
                  id="wheel-lightness"
                  className="mt-2"
                  min={5}
                  max={95}
                  step={1}
                  value={[lightness]}
                  onValueChange={([v]) => setLightness(v)}
                />
              </div>
              <div>
                <Label htmlFor="wheel-hex">Base color (HEX)</Label>
                <div className="mt-2 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="size-10 shrink-0 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700"
                    style={{ backgroundColor: seedHex }}
                  />
                  <Input
                    id="wheel-hex"
                    value={hexInput || seedHex}
                    onChange={(e) => applyHex(e.target.value)}
                    onFocus={() => setHexInput(seedHex)}
                    onBlur={() => setHexInput('')}
                    className="font-mono"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Harmony output */}
          <div className="min-w-0">
            {showSchemePicker && (
              <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Harmony scheme">
                {HARMONY_SCHEMES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScheme(s.id)}
                    aria-pressed={scheme === s.id}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950',
                      scheme === s.id
                        ? 'border-violet-600 bg-violet-600 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-violet-400 hover:text-violet-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-violet-300',
                    )}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              {HARMONY_SCHEMES.find((s) => s.id === scheme)?.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {colors.map((hex, i) => (
                <PaletteSwatch key={`${hex}-${i}`} hex={hex} index={i} compact />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/palettes?color=${seedHex.replace('#', '')}&scheme=${scheme}`}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:bg-violet-700 dark:focus-visible:ring-offset-gray-950">
                Open in Palette Generator <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={`/gradients?colors=${colors.map((c) => c.replace('#', '')).join(',')}`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-800 no-underline transition-colors duration-150 hover:border-violet-400 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:text-gray-200 dark:hover:text-violet-300 dark:focus-visible:ring-offset-gray-950">
                Build a gradient
              </Link>
            </div>
          </div>
        </div>

        <RelatedColorTools excludeHref="/color-wheel" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
