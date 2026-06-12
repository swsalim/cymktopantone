'use client';

/* Hallmark · component: related-tools · genre: technical · theme: Violet Cyan Gradient */

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type ColorType, ConverterConfig, converters } from '@/config/converters';
import { internalTools } from '@/config/tools-internal';

import { cn } from '@/lib/utils';

type Tool = {
  url: string;
  name: string;
  target: '_blank' | '_self';
  isExternal?: boolean;
  targetFormat: string;
};

const externalTools: Partial<ConverterConfig & { target: '_blank' | '_self' }>[] = [];

function targetFormatFromConverter(converter: Partial<ConverterConfig>): string {
  if (converter.targetColor) return converter.targetColor;
  const title = converter.title;
  if (!title) return '';
  const m = title.match(/\bto\s+([A-Za-z]+)/i);
  if (m?.[1]) return m[1].toUpperCase();
  if (/\bchart\b/i.test(title)) return 'Chart';
  return '';
}

function displayName(title: string): string {
  return title.replace(/\s+Color Converter$/i, '').replace(/\s+Converter$/i, '');
}

const groupedConverterTools = [...converters, ...externalTools].reduce(
  (acc, converter) => {
    const sourceColor = converter.sourceColor;
    if (sourceColor && converter.url && converter.title) {
      if (!acc[sourceColor]) {
        acc[sourceColor] = [];
      }
      const target =
        'target' in converter && converter.target ? converter.target : ('_self' as const);
      acc[sourceColor].push({
        url: converter.url,
        name: displayName(converter.title),
        target,
        isExternal: converter.isExternal,
        targetFormat: targetFormatFromConverter(converter),
      });
    }
    return acc;
  },
  {} as Record<string, Tool[]>,
);

const SOURCE_VISUAL: Record<
  ColorType,
  { bar: string; badge: string; ring: string; mono: string }
> = {
  CMYK: {
    bar: 'linear-gradient(90deg, #0891b2 0%, #db2777 38%, #ca8a04 72%, #0c0a09 100%)',
    badge: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-500/20 dark:text-yellow-200',
    ring: 'ring-yellow-600/30 dark:ring-yellow-400/25',
    mono: 'text-yellow-800 dark:text-yellow-300',
  },
  RGB: {
    bar: 'linear-gradient(90deg, #dc2626 0%, #16a34a 50%, #2563eb 100%)',
    badge: 'bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-200',
    ring: 'ring-red-600/30 dark:ring-red-400/25',
    mono: 'text-red-800 dark:text-red-300',
  },
  HEX: {
    bar: 'linear-gradient(90deg, #5b21b6 0%, #7c3aed 55%, #c4b5fd 100%)',
    badge: 'bg-violet-100 text-violet-900 dark:bg-violet-500/20 dark:text-violet-200',
    ring: 'ring-violet-600/30 dark:ring-violet-400/25',
    mono: 'text-violet-800 dark:text-violet-300',
  },
  HSL: {
    bar: 'linear-gradient(90deg, #ec4899 0%, #a855f7 35%, #0ea5e9 70%, #f59e0b 100%)',
    badge: 'bg-green-100 text-green-900 dark:bg-green-500/20 dark:text-green-200',
    ring: 'ring-green-600/30 dark:ring-green-400/25',
    mono: 'text-green-800 dark:text-green-300',
  },
  HSV: {
    bar: 'linear-gradient(90deg, #1d4ed8 0%, #6366f1 50%, #8b5cf6 100%)',
    badge: 'bg-blue-100 text-blue-900 dark:bg-blue-500/20 dark:text-blue-200',
    ring: 'ring-blue-600/30 dark:ring-blue-400/25',
    mono: 'text-blue-800 dark:text-blue-300',
  },
};

const SOURCE_ORDER: ColorType[] = ['HEX', 'RGB', 'CMYK', 'HSL', 'HSV'];

export default function RelatedTools() {
  const pathname = usePathname();

  const colorTools = internalTools.filter((t) => t.href !== pathname);

  const sections = SOURCE_ORDER.map((source) => {
    const tools = (groupedConverterTools[source] ?? []).filter((t) => t.url !== pathname);
    return { source, tools };
  }).filter((s) => s.tools.length > 0);

  if (sections.length === 0 && colorTools.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-tools-heading"
      className={cn(
        '-mx-6 mt-14 overflow-hidden rounded-none border-y border-violet-200/80 bg-gradient-to-br from-violet-100/90 via-white/95 to-cyan-100/80 px-6 py-10 shadow-lg md:-mx-12 md:rounded-3xl md:border md:py-12',
        'dark:border-violet-500/25 dark:from-violet-500/20 dark:via-gray-900/95 dark:to-cyan-500/15 dark:shadow-[0_20px_50px_-24px_rgba(124,58,237,0.55)]',
      )}>
      <header className="mb-10 max-w-3xl border-b border-violet-200/60 pb-8 dark:border-gray-700">
        <p className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white dark:bg-violet-500 dark:text-violet-50">
          Explore more tools
        </p>
        <h2
          id="related-tools-heading"
          className="mt-4 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 md:text-4xl">
          More color tools
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Palettes, gradients, accessibility checks, and format converters — all free.
        </p>
      </header>

      {colorTools.length > 0 && (
        <div className="mb-10">
          <h3 className="mb-4 font-heading text-xl font-bold text-gray-900 dark:text-gray-100">
            Generators & checkers
          </h3>
          <ul className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {colorTools.slice(0, 6).map((tool) => (
              <li key={tool.id}>
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-xl border border-violet-200/70 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/70">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {tool.title}
                  </span>
                  <span className="mt-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-10 md:gap-12">
        {sections.map(({ source, tools }) => {
          const visual = SOURCE_VISUAL[source];
          return (
            <div key={source} aria-labelledby={`related-tools-${source}`}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div
                    className="h-11 w-1.5 shrink-0 rounded-full shadow-sm"
                    style={{ background: visual.bar }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3
                      id={`related-tools-${source}`}
                      className="flex flex-wrap items-center gap-2 font-heading text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                      <span className={cn('rounded-md px-2 py-0.5 text-sm font-bold', visual.badge)}>
                        {source}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">converters</span>
                    </h3>
                  </div>
                </div>
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold tabular-nums',
                    visual.badge,
                  )}>
                  {tools.length} tool{tools.length === 1 ? '' : 's'}
                </span>
              </div>

              <ul className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool, index) => (
                  <li key={`${tool.url}-${index}`} className="min-w-0">
                    <Link
                      href={tool.url}
                      target={tool.target}
                      rel={tool.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'group flex h-full min-w-0 flex-col justify-between rounded-xl border border-violet-200/70 bg-white/90 p-4 shadow-sm transition duration-200',
                        'hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
                        'dark:border-gray-700 dark:bg-gray-900/70 dark:hover:border-violet-500/40',
                        'dark:focus-visible:ring-offset-gray-900',
                        visual.ring,
                        'hover:ring-2',
                      )}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 no-underline dark:text-gray-100">
                          {tool.name}
                        </span>
                        {tool.isExternal ? (
                          <ArrowUpRight
                            className="size-4 shrink-0 text-gray-400 transition group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-200"
                            aria-hidden
                          />
                        ) : null}
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-200/80 pt-3 dark:border-gray-700">
                        <span
                          className={cn(
                            'text-[10px] font-bold uppercase tracking-wider no-underline',
                            visual.mono,
                          )}>
                          → {tool.targetFormat || '…'}
                        </span>
                        <span className="text-xs font-semibold text-violet-600 opacity-0 transition group-hover:opacity-100 dark:text-violet-300">
                          Open
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
