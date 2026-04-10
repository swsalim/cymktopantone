'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type ColorType, ConverterConfig, converters } from '@/config/converters';

import { cn } from '@/lib/utils';

type Tool = {
  url: string;
  name: string;
  target: '_blank' | '_self';
  isExternal?: boolean;
  targetFormat: string;
};

// External tools that are not part of our converter configuration
const externalTools: Partial<ConverterConfig & { target: '_blank' | '_self' }>[] = [
  {
    url: '/brand-palette-to-pantone',
    sourceColor: 'HEX',
    title: 'Brand palette to Pantone',
    target: '_self',
  },
  {
    url: '/pantone',
    sourceColor: 'PANTONE',
    title: 'Pantone color lookup',
    target: '_self',
  },
  {
    url: '/pantone-colors',
    sourceColor: 'PANTONE',
    title: 'Pantone Colors Chart',
    target: '_self',
  },
  {
    url: 'https://www.rgbtopantone.com/',
    sourceColor: 'RGB',
    title: 'Convert RGB to Pantone',
    target: '_blank',
    isExternal: true,
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hsv-to-rgb',
    sourceColor: 'HSV',
    title: 'Convert HSV to RGB',
    target: '_blank',
    isExternal: true,
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hex-to-rgb',
    sourceColor: 'HEX',
    title: 'Convert HEX to RGB',
    target: '_self',
  },
];

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

// Group converter tools by sourceColor
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

/** Visual accent per source model — short gradient bars, not full-bleed rainbow. */
const SOURCE_VISUAL: Record<
  ColorType,
  { bar: string; ring: string; mono: string }
> = {
  CMYK: {
    bar: 'linear-gradient(90deg, #0891b2 0%, #db2777 38%, #ca8a04 72%, #0c0a09 100%)',
    ring: 'ring-cyan-600/25 dark:ring-cyan-400/20',
    mono: 'text-cyan-800 dark:text-cyan-300',
  },
  RGB: {
    bar: 'linear-gradient(90deg, #dc2626 0%, #16a34a 50%, #2563eb 100%)',
    ring: 'ring-red-600/20 dark:ring-red-400/15',
    mono: 'text-red-800 dark:text-red-300',
  },
  HEX: {
    bar: 'linear-gradient(90deg, #5b21b6 0%, #7c3aed 55%, #c4b5fd 100%)',
    ring: 'ring-violet-600/25 dark:ring-violet-400/20',
    mono: 'text-violet-800 dark:text-violet-300',
  },
  HSL: {
    bar: 'linear-gradient(90deg, #ec4899 0%, #a855f7 35%, #0ea5e9 70%, #f59e0b 100%)',
    ring: 'ring-fuchsia-600/20 dark:ring-fuchsia-400/15',
    mono: 'text-fuchsia-800 dark:text-fuchsia-300',
  },
  HSV: {
    bar: 'linear-gradient(90deg, #1d4ed8 0%, #6366f1 50%, #8b5cf6 100%)',
    ring: 'ring-blue-600/25 dark:ring-blue-400/20',
    mono: 'text-blue-800 dark:text-blue-300',
  },
  PANTONE: {
    bar: 'linear-gradient(90deg, #ca8a04 0%, #1c1917 42%, #ca8a04 100%)',
    ring: 'ring-amber-600/30 dark:ring-amber-400/25',
    mono: 'text-amber-900 dark:text-amber-200',
  },
};

const SOURCE_ORDER: ColorType[] = ['HEX', 'RGB', 'CMYK', 'HSL', 'HSV', 'PANTONE'];

/** Flip this to compare: `'editorial'` (gradient cards) · `'minimal'` (type + quiet list) */
const RELATED_TOOLS_LAYOUT: 'editorial' | 'minimal' = 'minimal';

export default function RelatedTools() {
  const pathname = usePathname();

  const sections = SOURCE_ORDER.map((source) => {
    const tools = (groupedConverterTools[source] ?? []).filter((t) => t.url !== pathname);
    return { source, tools };
  }).filter((s) => s.tools.length > 0);

  if (RELATED_TOOLS_LAYOUT === 'minimal') {
    return (
      <div className="-mx-6 mt-12 border-t border-stone-200/90 px-6 pt-10 dark:border-stone-800 md:-mx-12 md:px-12 md:pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          More color converters
        </h2>
        <p className="mt-1 max-w-md text-base text-gray-500 dark:text-gray-400">
          Grouped by the format you start from.
        </p>

        <div className="mt-8 space-y-9">
          {sections.map(({ source, tools }) => (
            <section key={source} aria-labelledby={`related-tools-${source}`}>
              <h3
                id={`related-tools-${source}`}
                className="mb-3 text-lg font-semibold tracking-tight text-gray-700 dark:text-gray-300">
                {source}
              </h3>
              <ul className="grid list-none gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool, index) => (
                  <li key={`${tool.url}-${index}`}>
                    <Link
                      href={tool.url}
                      target={tool.target}
                      rel={tool.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between gap-3 py-2.5 text-base text-gray-700 transition sm:-mx-2 sm:rounded-md sm:px-2 sm:py-1.5 sm:hover:bg-stone-50 dark:text-gray-300 dark:sm:hover:bg-stone-900/50 dark:sm:hover:text-gray-100">
                      <span className="min-w-0 leading-snug">{tool.name}</span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {tool.targetFormat ? (
                          <span className="font-sans text-sm tabular-nums text-gray-500 dark:text-gray-400">
                            {tool.targetFormat}
                          </span>
                        ) : null}
                        {tool.isExternal ? (
                          <ArrowUpRight
                            className="size-3.5 text-gray-300 transition group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-400"
                            aria-hidden
                          />
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        '-mx-6 mt-12 overflow-hidden rounded-none border-y border-stone-200/90 bg-gradient-to-b from-stone-50 via-white to-stone-50 px-6 py-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] md:-mx-12 md:rounded-2xl md:border md:border-stone-200/80 md:py-12 md:shadow-sm',
        'dark:border-stone-800 dark:from-stone-950 dark:via-stone-950 dark:to-zinc-950 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]',
      )}>
      <header className="mb-10 max-w-2xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          Toolkit
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 md:text-4xl">
          More color converters
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Jump between formats in one click—organized by what you&apos;re converting{' '}
          <span className="whitespace-nowrap">from</span>.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {sections.map(({ source, tools }) => {
          const visual = SOURCE_VISUAL[source];
          return (
            <section key={source} aria-labelledby={`related-tools-${source}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div
                    className="h-10 w-1.5 shrink-0 rounded-full shadow-sm"
                    style={{ background: visual.bar }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3
                      id={`related-tools-${source}`}
                      className="font-heading text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                      <span className={cn('font-sans text-base font-bold', visual.mono)}>
                        {source}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500"> · </span>
                      <span className="font-normal text-gray-600 dark:text-gray-400">converters</span>
                    </h3>
                  </div>
                </div>
                <span className="font-sans text-xs tabular-nums text-gray-400 dark:text-gray-500">
                  {tools.length} link{tools.length === 1 ? '' : 's'}
                </span>
              </div>

              <ul className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool, index) => (
                  <li key={`${tool.url}-${index}`}>
                    <Link
                      href={tool.url}
                      target={tool.target}
                      rel={tool.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'group flex h-full flex-col justify-between rounded-xl border border-stone-200/90 bg-white/80 p-4 shadow-sm transition duration-200',
                        'hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md',
                        'dark:border-stone-800 dark:bg-stone-900/40 dark:hover:border-stone-600',
                        visual.ring,
                        'hover:ring-2',
                      )}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
                          {tool.name}
                        </span>
                        {tool.isExternal ? (
                          <ArrowUpRight
                            className="size-4 shrink-0 text-gray-400 transition group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                            aria-hidden
                          />
                        ) : null}
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-stone-100 pt-3 dark:border-stone-800">
                        <span
                          className={cn(
                            'font-sans text-[10px] font-semibold uppercase tracking-wider',
                            visual.mono,
                          )}>
                          → {tool.targetFormat || '…'}
                        </span>
                        <span className="text-xs font-medium text-gray-400 opacity-0 transition group-hover:opacity-100 dark:text-gray-500">
                          Open
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
