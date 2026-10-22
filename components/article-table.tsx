import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/**
 * MDX `table` replacement. Markdown tables compile to thead/tbody children;
 * this wrapper gives them borders, readable cell padding, and horizontal scroll.
 */
export function ArticleTable({ className, children, ...props }: ComponentProps<'table'>) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-violet-200/70 bg-white/80 shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
      <table
        {...props}
        className={cn(
          'w-full border-collapse text-left text-sm text-gray-800 dark:text-gray-100',
          '[&_thead]:bg-violet-50 dark:[&_thead]:bg-violet-500/15',
          '[&_th]:border-b [&_th]:border-violet-200/80 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:align-bottom [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-gray-700 dark:[&_th]:border-gray-700 dark:[&_th]:text-gray-100',
          '[&_td]:border-b [&_td]:border-violet-100 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-gray-700 dark:[&_td]:border-gray-800 dark:[&_td]:text-gray-200',
          '[&_tbody_tr:last-child_td]:border-b-0',
          '[&_code]:rounded [&_code]:bg-violet-50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-violet-900 dark:[&_code]:bg-violet-500/20 dark:[&_code]:text-violet-100',
          className,
        )}>
        {children}
      </table>
    </div>
  );
}
