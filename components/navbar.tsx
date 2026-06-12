'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  getNavDropdownItems,
  isNavItemActive,
  navItems,
  type NavChildItem,
  type NavItem,
} from '@/config/navigation';
import { siteConfig } from '@/config/site';

import useScroll from '@/lib/hooks/use-scroll';
import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import { Logo } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export { navItems };

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { logo?: string; isExternal?: boolean }
>(({ className, title, children, logo, isExternal, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none text-gray-900 no-underline outline-none transition-colors hover:bg-gray-100/90 hover:text-gray-900 focus-visible:bg-gray-100/90 focus-visible:text-gray-900 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:text-gray-100 dark:hover:bg-gray-800/90 dark:hover:text-gray-50 dark:focus-visible:bg-gray-800/90 dark:focus-visible:ring-violet-400 dark:focus-visible:ring-offset-gray-900',
            className,
          )}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...props}>
          {!logo && <div className="text-sm font-medium leading-none">{title}</div>}
          {logo && (
            <div className="flex flex-row gap-2 text-sm font-medium leading-none">
              <Image
                src={`https://flagcdn.com/${logo.toLowerCase()}.svg`}
                alt={`${logo} flag`}
                width={24}
                height={18}
                className="rounded"
              />
              {title}
            </div>
          )}
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

function NavDropdownLink({
  item,
  pathname,
}: {
  item: NavChildItem;
  pathname: string | null;
}) {
  return (
    <ListItem
      title={item.title}
      href={item.href}
      isExternal={item.isExternal}
      data-active={pathname === item.href}
      className={cn(
        pathname === item.href &&
          'bg-gray-100/90 text-gray-900 dark:bg-gray-800/90 dark:text-gray-50',
      )}>
      {item.description}
    </ListItem>
  );
}

function NavDropdownContent({ item, pathname }: { item: NavItem; pathname: string | null }) {
  if (item.sections?.length) {
    return (
      <div className="w-[520px] p-3 lg:w-[640px]">
        <div className="grid gap-4 md:grid-cols-2">
          {item.sections.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                {section.label}
              </p>
              <ul className="grid gap-1">
                {section.items.map((child) => (
                  <NavDropdownLink key={child.href} item={child} pathname={pathname} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.href && (
          <Link
            href={item.href}
            className="mt-3 block rounded-md border border-violet-200/70 bg-violet-50/80 px-3 py-2.5 text-center text-sm font-medium text-violet-800 no-underline transition-colors hover:bg-violet-100/90 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200 dark:hover:bg-violet-500/20">
            Open tools hub →
          </Link>
        )}
        {item.viewMore && item.viewMore.href !== item.href && (
          <Link
            href={item.viewMore.href}
            className="mt-2 block py-2 text-center text-xs font-medium text-gray-600 no-underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
            {item.viewMore.name}
          </Link>
        )}
      </div>
    );
  }

  const items = getNavDropdownItems(item);

  return (
    <>
      <ul className="grid w-[400px] gap-2 p-3 md:w-[500px] md:grid-cols-2 lg:w-[560px]">
        {items.map((child) => (
          <NavDropdownLink key={child.href} item={child} pathname={pathname} />
        ))}
      </ul>
      {item.viewMore && (
        <Link
          href={item.viewMore.href}
          className="block border-t border-gray-200/80 bg-gray-50/90 py-3 text-center text-sm font-medium text-gray-700 no-underline transition-colors hover:bg-gray-100/90 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-50">
          {item.viewMore.name}
        </Link>
      )}
    </>
  );
}

export default function Navbar() {
  const scrolled = useScroll(50);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'sticky top-[-1px] z-30 w-full transition-all',
        scrolled
          ? 'border-b border-violet-200/70 bg-white/65 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/80'
          : 'bg-transparent dark:text-gray-100',
      )}>
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-x-2 text-xl">
          <Logo className="h-8 w-auto fill-violet-600 dark:fill-violet-400" />
          <span className="hidden font-heading text-base font-bold text-gray-900 md:block dark:text-gray-100">
            {siteConfig.siteName}
          </span>
        </Link>
        <NavigationMenu className="hidden md:block" data-site-nav>
          <NavigationMenuList>
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item);
              const dropdownItems = getNavDropdownItems(item);
              const hasDropdown = dropdownItems.length > 0;

              return (
                <NavigationMenuItem key={item.name}>
                  {hasDropdown ? (
                    <>
                      <NavigationMenuTrigger data-active={isActive}>
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavDropdownContent item={item} pathname={pathname} />
                      </NavigationMenuContent>
                    </>
                  ) : (
                    item.href && (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          data-active={isActive}
                          className={cn(navigationMenuTriggerStyle(), 'cursor-pointer')}>
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    )
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden w-[180px] md:block" aria-hidden />
      </Container>
    </div>
  );
}
