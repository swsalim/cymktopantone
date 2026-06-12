/* Hallmark · macrostructure: Bento Grid · genre: modern-minimal · theme: Violet Cyan Gradient (locked, design-system)
 * pre-emit critique: P4 H5 E4 S4 R4 V4
 * enrichment: Tier-A CSS art (palette stripes · live gradient · real contrast ratios · violet 50–950 ramp)
 * nav/footer: site chrome (out of page scope) · motion: CSS-only (scroll-driven reveal + hover micro-interactions, motion-reduce guarded) · honest copy: 9 tools / 18 converters / 5 guides
 */
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

/* Real Tailwind violet scale — same values the /color-scale tool outputs. */
const VIOLET_RAMP = [
  '#F5F3FF',
  '#EDE9FE',
  '#DDD6FE',
  '#C4B5FD',
  '#A78BFA',
  '#8B5CF6',
  '#7C3AED',
  '#6D28D9',
  '#5B21B6',
  '#4C1D95',
  '#2E1065',
] as const;

/* Triadic-ish demo palette seeded from the brand violet. */
const DEMO_PALETTE = ['#7C3AED', '#A78BFA', '#3AED7C', '#ED7C3A', '#2E1065'] as const;

/* Deuteranopia pairs computed with lib/color-blindness.ts matrices. */
const CB_PAIRS = [
  { seen: '#EF4444', simulated: '#AFBC44' },
  { seen: '#22C55E', simulated: '#5F537D' },
  { seen: '#7C3AED', simulated: '#4A4FE3' },
] as const;

const EXTRACTED_SWATCHES = ['#0E7490', '#67E8F9', '#FDE68A', '#92400E', '#1C1917'] as const;

const tileClass = cn(
  'group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-violet-200/70 bg-white/85 p-5 shadow-sm transition duration-200',
  'hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
  'dark:border-gray-700 dark:bg-gray-900/75 dark:hover:border-violet-500/40 dark:focus-visible:ring-offset-gray-950',
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
);

function TileHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-4">
      <h3 className="flex items-center gap-1.5 font-heading text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {title}
        <ArrowRight
          className="size-4 shrink-0 -translate-x-1 text-violet-600 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 dark:text-violet-400"
          aria-hidden
        />
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

export function HomeBento() {
  return (
    <section aria-labelledby="tools-bento-heading" className="min-w-0">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="tools-bento-heading"
            className="font-heading text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
            Nine tools, one workflow
          </h2>
          <p className="mt-2 max-w-2xl text-base text-gray-600 dark:text-gray-400">
            Every swatch carries HEX, RGB, and CMYK — and links straight into the converters.
          </p>
        </div>
        <Link
          href="/tools"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-violet-700 no-underline hover:underline dark:text-violet-300">
          All tools <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="bento-reveal grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Palette Generator — hero tile, 2×2 */}
        <Link
          href="/palettes"
          className={cn(tileClass, 'sm:col-span-2 lg:row-span-2')}
          aria-label="Color Palette Generator">
          <div className="flex grow flex-col justify-between gap-5">
            <div className="flex h-36 overflow-hidden rounded-2xl md:h-48" aria-hidden>
              {DEMO_PALETTE.map((hex) => (
                <div
                  key={hex}
                  className="flex-1 transition-[flex-grow] duration-300 group-hover:first:grow-[1.6] motion-reduce:transition-none"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <div aria-hidden className="flex flex-wrap gap-1.5">
              {['Triadic', 'Complementary', 'Analogous', 'Mono'].map((scheme) => (
                <span
                  key={scheme}
                  className="rounded-full border border-violet-200/80 bg-violet-50/80 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200">
                  {scheme}
                </span>
              ))}
            </div>
          </div>
          <TileHeading
            title="Palette Generator"
            description="Six harmony rules from one seed color. Lock swatches, regenerate the rest, export CSS, Tailwind, or JSON. Out-of-gamut colors are flagged before they reach a press."
          />
        </Link>

        {/* Gradient Generator — wide 2×1 */}
        <Link
          href="/gradients"
          className={cn(tileClass, 'sm:col-span-2')}
          aria-label="CSS Gradient Generator">
          <div
            aria-hidden
            className="h-24 rounded-2xl bg-[length:200%_100%] bg-left transition-[background-position] duration-700 ease-out group-hover:bg-right motion-reduce:transition-none"
            style={{
              backgroundImage: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 45%, #67E8F9 100%)',
            }}
          />
          <TileHeading
            title="Gradient Generator"
            description="Linear, radial, and conic with up to five stops. Copy production-ready CSS."
          />
        </Link>

        {/* Contrast Checker — 1×1, real ratios */}
        <Link href="/contrast-checker" className={tileClass} aria-label="WCAG Contrast Checker">
          <div aria-hidden className="space-y-2">
            <div
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold"
              style={{ backgroundColor: '#5B21B6', color: '#FFFFFF' }}>
              <span>9.0:1</span>
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-xs">AAA</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold dark:border-gray-700">
              <span style={{ color: '#9CA3AF' }}>2.5:1</span>
              <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700 dark:bg-red-500/20 dark:text-red-300">
                Fail
              </span>
            </div>
          </div>
          <TileHeading
            title="Contrast Checker"
            description="WCAG AA/AAA badges, auto-fix suggestions, full palette matrix."
          />
        </Link>

        {/* Tint & Shade — 1×1, real ramp */}
        <Link href="/color-scale" className={tileClass} aria-label="Tint and Shade Generator">
          <div aria-hidden className="flex h-[4.5rem] overflow-hidden rounded-xl">
            {VIOLET_RAMP.map((hex) => (
              <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
            ))}
          </div>
          <TileHeading
            title="Tint &amp; Shade Scale"
            description="One HEX in, a Tailwind 50–950 ramp out — contrast-checked per step."
          />
        </Link>

        {/* Converters — wide 2×1 */}
        <Link
          href="/convert-color"
          className={cn(tileClass, 'sm:col-span-2')}
          aria-label="Color format converters">
          <div aria-hidden className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
            {['RGB', 'CMYK', 'HEX', 'HSL', 'HSV'].map((format, i) => (
              <span key={format} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ArrowRight
                    className="size-3.5 text-gray-400 transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden
                  />
                )}
                <span className="rounded-lg border border-violet-200/80 bg-violet-50/70 px-2.5 py-1.5 font-mono text-violet-900 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-100">
                  {format}
                </span>
              </span>
            ))}
          </div>
          <TileHeading
            title="18 Format Converters"
            description="Convert between all five color models — sliders, history, copy-ready values. RGB to CMYK included."
          />
        </Link>

        {/* Palette from Image — 1×1 */}
        <Link href="/palette-from-image" className={tileClass} aria-label="Palette from Image">
          <div
            aria-hidden
            className="relative h-[4.5rem] overflow-hidden rounded-xl"
            style={{
              background: 'linear-gradient(120deg, #0E7490 0%, #67E8F9 55%, #FDE68A 100%)',
            }}>
            <div className="absolute bottom-2 left-2 flex gap-1 transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
              {EXTRACTED_SWATCHES.map((hex) => (
                <span
                  key={hex}
                  className="size-4 rounded-full border border-white/80 shadow-sm"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
          <TileHeading
            title="Palette from Image"
            description="Extract dominant colors from a photo — fully in your browser."
          />
        </Link>

        {/* Color Blindness — 1×1 */}
        <Link href="/color-blindness" className={tileClass} aria-label="Color Blindness Simulator">
          <div aria-hidden className="space-y-1.5">
            <div className="flex h-7 gap-1.5">
              {CB_PAIRS.map(({ seen }) => (
                <div key={seen} className="flex-1 rounded-lg" style={{ backgroundColor: seen }} />
              ))}
            </div>
            <div className="flex h-7 gap-1.5">
              {CB_PAIRS.map(({ seen, simulated }) => (
                <div
                  key={seen}
                  className="flex-1 rounded-lg"
                  style={{ backgroundColor: simulated }}
                />
              ))}
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Normal · Deuteranopia
            </p>
          </div>
          <TileHeading
            title="Color Blindness Sim"
            description="Preview palettes under three common vision deficiencies."
          />
        </Link>

        {/* Color Wheel — 1×1 */}
        <Link href="/color-wheel" className={tileClass} aria-label="Interactive Color Wheel">
          <div aria-hidden className="relative mx-auto size-[4.5rem]">
            <div
              className="size-full rounded-full transition-transform duration-700 ease-out group-hover:rotate-90 motion-reduce:transition-none"
              style={{
                background:
                  'conic-gradient(hsl(0 85% 55%), hsl(60 85% 55%), hsl(120 85% 45%), hsl(180 85% 45%), hsl(240 85% 60%), hsl(300 85% 55%), hsl(360 85% 55%))',
              }}
            />
            <span className="absolute left-[72%] top-[18%] size-3 rounded-full border-2 border-white bg-[#7C3AED] shadow dark:border-gray-900" />
            <span className="absolute left-[22%] top-[74%] size-3 rounded-full border-2 border-white bg-[#3AED7C] shadow dark:border-gray-900" />
          </div>
          <TileHeading
            title="Color Wheel"
            description="Drag a marker, watch harmonies rotate with it live."
          />
        </Link>

        {/* Print Gamut — wide 2×1, brand differentiator */}
        <Link
          href="/print-gamut"
          className={cn(tileClass, 'sm:col-span-2')}
          aria-label="Print Gamut Checker">
          <div aria-hidden>
            <div className="flex h-14 overflow-hidden rounded-xl">
              <div className="flex-1" style={{ backgroundColor: '#3AED7C' }} />
              <div
                className="flex-1 transition-[flex-grow] duration-500 ease-out group-hover:grow-[1.8] motion-reduce:transition-none"
                style={{ backgroundColor: '#2D9A5D' }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <span>Screen #3AED7C</span>
              <span>Press #2D9A5D</span>
            </div>
          </div>
          <TileHeading
            title="Print Gamut Checker"
            description="See exactly how a screen color shifts on a CMYK press — before the proof comes back wrong."
          />
        </Link>

        {/* Compare Colors — 1×1, real delta-E */}
        <Link href="/compare-colors" className={tileClass} aria-label="Compare Colors">
          <div aria-hidden>
            <div className="flex h-14 overflow-hidden rounded-xl">
              <div className="flex-1" style={{ backgroundColor: '#7C3AED' }} />
              <div className="flex-1" style={{ backgroundColor: '#6D28D9' }} />
            </div>
            <p className="mt-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400">
              ΔE 5.5 · 86% match
            </p>
          </div>
          <TileHeading
            title="Compare Colors"
            description="ΔE2000 perceptual difference — can anyone tell them apart?"
          />
        </Link>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: 'Print-aware by default',
    description:
      'CMYK values on every swatch, plus gamut warnings when an RGB color will shift on press. Built for teams that ship web and print from one palette.',
  },
  {
    title: 'Accessibility built in',
    description:
      'WCAG 2.1 ratios, AA/AAA badges, color-blindness simulation, and contrast-checked scale steps — across the whole toolkit, not a single page.',
  },
  {
    title: 'Exports developers use',
    description:
      'CSS custom properties, Tailwind theme.extend.colors, and JSON tokens. Copy once, paste into the codebase.',
  },
  {
    title: 'Free, private, no signup',
    description:
      'Everything runs in your browser. Images never upload to a server, and no tool sits behind an account wall.',
  },
] as const;

export function HomeFeatures() {
  return (
    <section aria-labelledby="features-heading" className="min-w-0">
      <h2
        id="features-heading"
        className="font-heading text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
        Why designers and developers use Color Mapper
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="min-w-0 border-l-2 border-violet-300 pl-5 dark:border-violet-500/50">
            <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-100">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const GUIDES = [
  {
    title: 'Your brand purple probably fails WCAG',
    href: '/blog/wcag-contrast-brand-colors',
    tag: 'Accessibility',
  },
  {
    title: 'Neon HEX colors lie on screen. They shift on press.',
    href: '/blog/cmyk-safe-web-palettes',
    tag: 'Print',
  },
  {
    title: 'One brand HEX is not a design system',
    href: '/blog/tailwind-color-scale-guide',
    tag: 'Tailwind',
  },
  {
    title: 'CSS gradients: linear, radial, and conic',
    href: '/blog/css-gradients-guide',
    tag: 'CSS',
  },
  {
    title: 'CMYK, RGB, HEX, HSL & HSV explained',
    href: '/color-models',
    tag: 'Color models',
  },
] as const;

export function HomeGuides() {
  return (
    <section aria-labelledby="guides-heading" className="min-w-0">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="guides-heading"
          className="font-heading text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
          Guides worth reading first
        </h2>
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-violet-700 no-underline hover:underline dark:text-violet-300">
          All articles <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((guide) => (
          <li key={guide.href} className="min-w-0">
            <Link
              href={guide.href}
              className="group flex h-full flex-col justify-between rounded-2xl border border-violet-200/70 bg-white/85 p-4 no-underline shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-gray-700 dark:bg-gray-900/75 dark:hover:border-violet-500/40">
              <span className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
                {guide.title}
              </span>
              <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                {guide.tag}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
