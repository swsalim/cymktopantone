'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronDown, Menu, X } from 'lucide-react';

import { getNavDropdownItems, isNavItemActive, navItems, type NavItem } from '@/config/navigation';

import { cn } from '@/lib/utils';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function NavMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed right-3 top-3 z-40 rounded-full border border-violet-200/70 bg-white/80 p-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:bg-violet-100 md:hidden dark:border-gray-700 dark:bg-gray-900/80 dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:focus-visible:ring-offset-gray-900',
        )}>
        {open ? (
          <X className="h-5 w-5 text-neutral-600 dark:text-white/70" />
        ) : (
          <Menu className="h-5 w-5 text-neutral-600 dark:text-white/70" />
        )}
      </button>
      <nav
        data-site-nav
        className={cn(
          'fixed inset-0 z-20 hidden max-h-screen w-full overflow-y-auto bg-white/95 px-5 py-16 backdrop-blur-md md:hidden dark:bg-gray-950/95 dark:text-gray-100',
          open && 'block',
        )}>
        <ul className="grid divide-y divide-gray-100 dark:divide-white/[0.15]">
          {navItems.map((item) => (
            <MobileNavItem key={item.name} item={item} pathname={pathname} setOpen={setOpen} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function MobileNavItem({
  item,
  pathname,
  setOpen,
}: {
  item: NavItem;
  pathname: string | null;
  setOpen: (open: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const dropdownItems = getNavDropdownItems(item);
  const hasDropdown = dropdownItems.length > 0;

  const handleLinkClick = () => setOpen(false);

  if (hasDropdown) {
    return (
      <li className="py-3">
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <p className="font-semibold">{item.name}</p>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-neutral-500 transition-all dark:text-white/50',
                expanded && 'rotate-180',
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent
            className={cn(
              'overflow-hidden transition-all duration-200 ease-in-out',
              'data-[state=closed]:animate-slide-up',
              'data-[state=open]:animate-slide-down',
            )}>
            <div className="grid gap-3 overflow-hidden py-4">
              {item.href && (
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="rounded-lg border border-violet-200/70 bg-violet-50/80 px-3 py-2.5 text-center text-sm font-semibold text-violet-800 no-underline dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200">
                  {item.name === 'Color Tools' ? 'All color tools' : item.name}
                </Link>
              )}

              {item.sections?.length
                ? item.sections.map((section) => (
                    <div key={section.label}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                        {section.label}
                      </p>
                      <div className="grid gap-2">
                        {section.items.map((child) => (
                          <MobileNavLink
                            key={child.href}
                            title={child.title}
                            href={child.href}
                            description={child.description}
                            onClick={handleLinkClick}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                : dropdownItems.map((child) => (
                    <MobileNavLink
                      key={child.href}
                      title={child.title}
                      href={child.href}
                      description={child.description}
                      onClick={handleLinkClick}
                    />
                  ))}

              {item.viewMore && (
                <Link
                  href={item.viewMore.href}
                  onClick={handleLinkClick}
                  className="block rounded-md bg-gray-100/90 py-3 text-center text-sm font-medium text-gray-700 no-underline dark:bg-gray-800/90 dark:text-gray-200">
                  {item.viewMore.name}
                </Link>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  if (!item.href) return null;

  return (
    <li className="py-3">
      <Link
        href={item.href}
        onClick={handleLinkClick}
        className={cn(
          'flex w-full font-semibold text-gray-900 no-underline dark:text-gray-100',
          isNavItemActive(pathname, item) && 'text-violet-600 dark:text-violet-400',
        )}>
        {item.name}
      </Link>
    </li>
  );
}

function MobileNavLink({
  title,
  href,
  description,
  onClick,
}: {
  title: string;
  href: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-md p-2 transition-colors hover:bg-gray-100/90 dark:hover:bg-gray-800/90">
      <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h2>
      <p className="mt-0.5 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  );
}
