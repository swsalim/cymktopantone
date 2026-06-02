'use client';

import { ElementType, useEffect, useState } from 'react';

import Link from 'next/link';

import { ChevronDown, Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { navItems } from '@/components/navbar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function NavMobile() {
  const [open, setOpen] = useState(false);
  // prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed right-3 top-3 z-40 rounded-full border border-violet-200/70 bg-white/80 p-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:bg-violet-100 md:hidden dark:border-gray-700 dark:bg-gray-900/80 dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:focus-visible:ring-offset-gray-900',
        )}>
        {open ? (
          <X className="text-neutral-600 h-5 w-5 dark:text-white/70" />
        ) : (
          <Menu className="text-neutral-600 h-5 w-5 dark:text-white/70" />
        )}
      </button>
      <nav
        data-site-nav
        className={cn(
          'fixed inset-0 z-20 hidden max-h-screen w-full overflow-y-auto bg-white/95 px-5 py-16 backdrop-blur-md lg:hidden dark:bg-gray-950/95 dark:text-gray-100',
          open && 'block',
        )}>
        <ul className="grid divide-y divide-gray-100 dark:divide-white/[0.15]">
          {navItems.map(({ name, href, childItems, viewMore }, idx) => (
            <MobileNavItem
              key={idx}
              name={name}
              href={href}
              childItems={childItems}
              setOpen={setOpen}
              viewMore={viewMore}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

const MobileNavItem = ({
  name,
  href,
  childItems,
  setOpen,
  viewMore,
}: {
  name: string;
  href?: string;
  childItems?: {
    title: string;
    description: string;
    isExternal?: boolean;
    href: string;
    icon?: ElementType;
    iconClassName?: string;
  }[];
  setOpen: (open: boolean) => void;
  viewMore?: {
    name: string;
    href: string;
  };
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  if (childItems && childItems.length > 0) {
    return (
      <li className="py-3">
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <p className="font-semibold">{name}</p>
            <ChevronDown
              className={cn(
                'text-neutral-500 h-5 w-5 transition-all dark:text-white/50',
                expanded && 'rotate-180',
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent
            className={cn(
              'duration overflow-hidden transition-all ease-in-out',
              'data-[state=closed]:animate-slide-up',
              'data-[state=open]:animate-slide-down',
            )}>
            <div className="grid gap-4 overflow-hidden py-4">
              {childItems.map(({ title, href, icon: Icon, description }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleLinkClick}
                  className="flex w-full gap-3 rounded-md p-2 transition-colors hover:bg-gray-100/90 dark:hover:bg-gray-800/90">
                  {Icon && (
                    <div className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                      <Icon className="size-5 text-gray-700 dark:text-gray-300" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                  </div>
                </Link>
              ))}
              {viewMore && (
                <Link
                  href={viewMore.href}
                  onClick={handleLinkClick}
                  className="block rounded-md bg-gray-100/90 py-3 text-center text-sm font-medium text-gray-700 no-underline dark:bg-gray-800/90 dark:text-gray-200">
                  {viewMore.name}
                </Link>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  if (!href) {
    return null;
  }

  return (
    <li className="py-3">
      <Link
        href={href}
        onClick={handleLinkClick}
        className="flex w-full font-semibold capitalize text-gray-900 no-underline dark:text-gray-100">
        {name}
      </Link>
    </li>
  );
};
