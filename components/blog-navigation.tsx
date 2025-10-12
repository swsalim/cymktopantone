'use client';

import Link from 'next/link';

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BlogNavigationProps {
  prev?: {
    _meta: { path: string };
    title: string;
  } | null;
  next?: {
    _meta: { path: string };
    title: string;
  } | null;
}

export function BlogNavigation({ prev, next }: BlogNavigationProps) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
      {prev && (
        <Button variant="secondary" size="sm" asChild className="shadow-none">
          <Link
            href={`/blog/${prev._meta.path}`}
            className="flex items-center gap-2"
            onClick={() => {
              window.seline?.track('blog_previous_article_click');
            }}>
            <ArrowLeftIcon className="size-4" />
            <span className="hidden sm:block">Read Previous Post</span>
          </Link>
        </Button>
      )}
      {next && (
        <Button variant="secondary" size="sm" className="ml-auto shadow-none" asChild>
          <Link
            href={`/blog/${next._meta.path}`}
            className="flex items-center gap-2"
            onClick={() => {
              window.seline?.track('blog_next_article_click');
            }}>
            <span className="hidden sm:block">Read Next Post</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
