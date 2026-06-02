import Link from 'next/link';

import { ChevronLeftIcon, ChevronRightIcon, Home } from 'lucide-react';

import { cn } from '@/lib/utils';

type BreadcrumbTheme = 'light' | 'dark';

interface BreadcrumbItem {
  name?: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  theme?: BreadcrumbTheme;
  routerCallback?: () => void;
}

const styles = {
  light: {
    link:
      'rounded-sm text-gray-600 dark:text-gray-300 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:hover:text-violet-300',
    text: 'text-gray-800 dark:text-gray-200',
    icon: 'text-violet-500 dark:text-violet-300',
  },
  dark: {
    link: 'text-brand hover:text-brand/80',
    text: 'text-brand',
    icon: 'text-brand',
  },
} as const;

const Breadcrumb = ({ items, theme = 'light', routerCallback }: BreadcrumbProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      {routerCallback && (
        <nav className="mb-6 sm:hidden" aria-label="Back">
          <Link
            href="#"
            className={cn(
              'flex items-center text-sm font-medium transition-colors',
              styles[theme].link,
            )}
            onClick={(e) => {
              e.preventDefault();
              routerCallback();
            }}>
            <ChevronLeftIcon
              className={cn('ml-1 mr-1 h-5 w-5 shrink-0 transition-colors', styles[theme].icon)}
              aria-hidden="true"
            />
            <span>Back</span>
          </Link>
        </nav>
      )}
      <nav
        className={cn(routerCallback && 'hidden sm:flex', !routerCallback && 'flex')}
        aria-label="Breadcrumb">
        <ol
          role="list"
          className="mb-2 flex flex-wrap items-center justify-start gap-y-2 space-x-2 sm:mb-6">
          <li className="flex items-center justify-center">
            <Link
              href="/"
              className={cn(
                'font-regular drop-shadow-xs text-sm capitalize transition-colors dark:text-gray-300',
                styles[theme].link,
              )}>
              <Home className="h-4 w-4" />
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={`breadcrumb-item-${index}`} className="flex items-center justify-center">
              <ChevronRightIcon
                className={cn(
                  'drop-shadow-xs size-4 shrink-0 transition-colors',
                  styles[theme].icon,
                )}
                aria-hidden="true"
              />
              {item.url ? (
                <Link
                  href={item.url}
                  className={cn(
                    'font-regular drop-shadow-xs ml-2 text-sm transition-colors dark:text-gray-300',
                    styles[theme].link,
                  )}>
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={cn(
                    'font-regular drop-shadow-xs ml-2 text-sm transition-colors dark:text-gray-300',
                    styles[theme].text,
                  )}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
