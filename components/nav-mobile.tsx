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
          'fixed right-3 top-3 z-40 rounded-full p-2 transition-colors duration-200 hover:bg-gray-50 focus:outline-none active:bg-gray-100 md:hidden dark:hover:bg-white/20 dark:active:bg-white/30',
        )}>
        {open ? (
          <X className="text-neutral-600 h-5 w-5 dark:text-white/70" />
        ) : (
          <Menu className="text-neutral-600 h-5 w-5 dark:text-white/70" />
        )}
      </button>
      <nav
        className={cn(
          'fixed inset-0 z-20 hidden max-h-screen w-full overflow-y-auto bg-white px-5 py-16 lg:hidden dark:bg-black dark:text-white/70',
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
                  className="flex w-full gap-3">
                  {Icon && (
                    <div className="border-neutral-200 from-neutral-100 flex size-10 items-center justify-center rounded-lg border bg-gradient-to-t">
                      <Icon className="text-neutral-700 size-5" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-neutral-900 text-sm font-medium">{title}</h2>
                    </div>
                    <p className="text-neutral-500 text-sm">{description}</p>
                  </div>
                </Link>
              ))}
              {viewMore && (
                <Link
                  href={viewMore.href}
                  onClick={handleLinkClick}
                  className="block bg-violet-50 py-3 text-center text-sm font-medium text-violet-700">
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
      <Link href={href} onClick={handleLinkClick} className="flex w-full font-semibold capitalize">
        {name}
      </Link>
    </li>
  );
};
