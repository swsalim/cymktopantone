/* Hallmark · macrostructure: Bento Grid (hero band) · theme: Violet Cyan Gradient (locked) */
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/container';

const FACTS = [
  { value: '9', label: 'color tools' },
  { value: '18', label: 'format converters' },
  { value: '5', label: 'color model guides' },
] as const;

/* The hero ribbon doubles as proof: a real palette with its real CMYK conversions. */
const RIBBON = [
  { hex: '#5B21B6', cmyk: '50, 82, 0, 29' },
  { hex: '#7C3AED', cmyk: '48, 76, 0, 7' },
  { hex: '#A78BFA', cmyk: '33, 44, 0, 2' },
  { hex: '#67E8F9', cmyk: '59, 7, 0, 2' },
  { hex: '#0E7490', cmyk: '90, 19, 0, 44' },
] as const;

export function HomeHero() {
  return (
    <Container as="header" className="pt-12 md:pt-20">
      <div className="overflow-hidden rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50/90 via-white/90 to-cyan-50/80 shadow-sm dark:border-violet-500/30 dark:from-violet-500/15 dark:via-gray-900/80 dark:to-cyan-500/10">
        <div className="p-6 md:p-12">
          <p className="inline-flex rounded-full border border-violet-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200">
            Free color toolkit
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-heading text-4xl font-bold tracking-tight text-gray-900 md:text-6xl dark:text-gray-50">
            Every color tool in one place
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg dark:text-gray-300">
            Generate palettes, build gradients, check WCAG contrast, and convert between RGB, CMYK,
            HEX, HSL, and HSV. Print-aware values on every swatch — all in your browser, no signup.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none dark:focus-visible:ring-offset-gray-950">
              Explore the tools <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/convert-color"
              className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-white/80 px-6 py-3 text-sm font-semibold text-violet-900 no-underline transition hover:border-violet-400 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none dark:border-violet-500/40 dark:bg-gray-900/60 dark:text-violet-200 dark:hover:bg-violet-500/10 dark:focus-visible:ring-offset-gray-950">
              Browse converters
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex items-baseline gap-2">
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {fact.value}
                </dd>
                <dd className="text-sm text-gray-600 dark:text-gray-400">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex" aria-hidden>
          {RIBBON.map((stop) => (
            <div key={stop.hex} className="group/swatch min-w-0 flex-1">
              <div className="h-14 md:h-16" style={{ backgroundColor: stop.hex }} />
              <div className="hidden border-t border-violet-200/50 bg-white/70 px-2 py-1.5 sm:block dark:border-gray-700 dark:bg-gray-900/70">
                <p className="truncate font-mono text-[10px] text-gray-700 dark:text-gray-300">
                  {stop.hex}
                </p>
                <p className="truncate font-mono text-[10px] text-gray-500 dark:text-gray-400">
                  C {stop.cmyk}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
