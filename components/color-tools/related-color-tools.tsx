'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { internalTools } from '@/config/tools-internal';
import { cn } from '@/lib/utils';

interface RelatedColorToolsProps {
  excludeHref?: string;
  className?: string;
}

export function RelatedColorTools({ excludeHref, className }: RelatedColorToolsProps) {
  const tools = internalTools.filter((t) => t.href !== excludeHref);

  if (tools.length === 0) return null;

  return (
    <section
      aria-labelledby="related-color-tools-heading"
      className={cn(
        'mt-14 overflow-hidden rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-100/90 via-white/95 to-cyan-100/80 p-6 shadow-lg md:p-10',
        'dark:border-violet-500/25 dark:from-violet-500/20 dark:via-gray-900/95 dark:to-cyan-500/15',
        className,
      )}>
      <header className="mb-8 border-b border-violet-200/60 pb-6 dark:border-gray-700">
        <p className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white dark:bg-violet-500">
          Color tools
        </p>
        <h2
          id="related-color-tools-heading"
          className="mt-4 font-heading text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 md:text-3xl">
          More free color tools
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-700 dark:text-gray-300 md:text-base">
          Palettes, gradients, accessibility checks, and print-ready conversions — all in one place.
        </p>
      </header>
      <ul className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={tool.href}
              className="group flex h-full flex-col rounded-xl border border-violet-200/70 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/70 dark:hover:border-violet-500/40">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {tool.title}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-gray-400 transition group-hover:text-violet-600 dark:group-hover:text-violet-400" />
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <Link
          href="/tools"
          className="text-sm font-semibold text-violet-600 hover:underline dark:text-violet-400">
          View all tools →
        </Link>
      </div>
    </section>
  );
}
