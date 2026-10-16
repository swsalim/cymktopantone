'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { TableOfContents as TocData } from '@/lib/toc';
import { cn } from '@/lib/utils';

import { LazyAdsSquare } from '@/components/ads/lazy-ads-square';

/** Clears the sticky header (`h-16` plus its 1px offset). */
const HEADER_OFFSET = 96;

interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

function collectIds(items: TocEntry[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    const id = item.url.replace(/^#/, '');
    if (id) ids.push(id);
    if (item.items?.length) ids.push(...collectIds(item.items));
  }
  return ids;
}

interface TocItemProps {
  item: TocEntry;
  activeId: string | null;
  onSelect: (id: string) => void;
}

function TocItem({ item, activeId, onSelect }: TocItemProps) {
  const id = item.url.replace(/^#/, '');
  const isActive = id !== '' && id === activeId;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    onSelect(id);
    const top = targetElement.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <a
        href={item.url}
        onClick={handleClick}
        aria-current={isActive ? 'location' : undefined}
        className={cn(
          'block border-l-2 py-1 pl-3 text-sm hover:text-gray-900 dark:hover:text-gray-100',
          isActive
            ? 'border-violet-600 font-medium text-violet-700 dark:border-violet-400 dark:text-violet-300'
            : 'border-transparent text-gray-600 dark:text-gray-300',
        )}>
        {item.title}
      </a>
      {item.items && item.items.length > 0 && (
        <div className="ml-3 mt-1 space-y-1">
          {item.items.map((subItem, index) => (
            <TocItem key={`${subItem.url}-${index}`} item={subItem} activeId={activeId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

interface TableOfContentsProps {
  toc: TocData;
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const items = toc.items;
  const ids = useMemo(() => collectIds(items ?? []), [items]);
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const clickedId = useRef<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const update = () => {
      const locked = clickedId.current;
      if (locked) {
        setActiveId(locked);
        const el = document.getElementById(locked);
        if (el && Math.abs(el.getBoundingClientRect().top - HEADER_OFFSET) <= 8) {
          clickedId.current = null;
        }
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= HEADER_OFFSET + 1) current = id;
        else break;
      }
      setActiveId(current);
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  if (!items || items.length === 0) {
    return null;
  }

  const selectHeading = (id: string) => {
    clickedId.current = id;
    setActiveId(id);
    window.setTimeout(() => {
      if (clickedId.current === id) clickedId.current = null;
    }, 900);
  };

  return (
    <aside className="mt-12 hidden lg:sticky lg:top-24 lg:col-span-4 lg:mt-0 lg:block lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto">
      <nav aria-label="Table of contents" className="space-y-2">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Table of Contents
        </h2>
        {items.map((item, index) => (
          <TocItem key={`${item.url}-${index}`} item={item} activeId={activeId} onSelect={selectHeading} />
        ))}
      </nav>

      <div className="mx-auto">
        <LazyAdsSquare />
      </div>
    </aside>
  );
}
