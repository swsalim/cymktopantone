'use client';

import React, { ElementType } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { colorModels } from '@/config/colors';
import { converters } from '@/config/converters';
import { siteConfig } from '@/config/site';

// import { tools } from '@/config/tools';
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

export const navItems: {
  name: string;
  href?: string;
  segments?: string[];
  viewMore?: {
    name: string;
    href: string;
  };
  childItems: {
    title: string;
    href: string;
    description: string;
    isExternal?: boolean;
    icon?: ElementType;
    iconClassName?: string;
    logo?: string;
  }[];
}[] = [
  {
    name: 'Color Models',
    childItems: colorModels,
    href: '/color-models',
    segments: ['/color-models'],
  },
  {
    name: 'Convert Color',
    childItems: converters.slice(0, 8).map((converter) => ({
      title: converter.title,
      href: converter.url,
      description: converter.description,
    })),
    viewMore: {
      name: 'View All',
      href: '/convert-color',
    },
  },
  // {
  //   name: 'More Tools',
  //   childItems: tools,
  // },
  {
    name: 'Blog',
    childItems: [],
    href: '/blog',
    segments: ['/blog'],
  },
  {
    name: 'Advertise',
    childItems: [],
    href: '/advertise',
  },
];

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

export default function Navbar() {
  const scrolled = useScroll(50);
  const pathname = usePathname();

  return (
    <>
      <div
        className={`sticky top-[-1px] w-full ${
          scrolled
            ? 'border-b border-violet-200/70 bg-white/65 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/80'
            : 'bg-transparent dark:text-gray-100'
        } z-30 transition-all`}>
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-x-2 text-xl">
            <Logo className="h-8 w-auto fill-violet-600 dark:fill-violet-400" />
            <span className="hidden font-heading text-base font-bold text-gray-900 md:block dark:text-gray-100">
              {siteConfig.siteName}
            </span>
          </Link>
          <NavigationMenu className="hidden md:block" data-site-nav>
            <NavigationMenuList>
              {navItems.map(({ name, href, segments, childItems, viewMore }) => {
                const isActive = segments?.some((segment) => pathname?.startsWith(segment));
                const hasDropdown = childItems.length > 0;

                return (
                  <NavigationMenuItem key={name}>
                    {hasDropdown ? (
                      <>
                        <NavigationMenuTrigger data-active={isActive}>{name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-2 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {childItems.map((item) => (
                              <ListItem
                                key={item.title}
                                title={item.title}
                                href={item.href}
                                logo={item.logo}
                                isExternal={item.isExternal}
                                data-active={pathname === item.href}
                                className={cn(
                                  pathname === item.href &&
                                    'bg-gray-100/90 text-gray-900 dark:bg-gray-800/90 dark:text-gray-50',
                                )}>
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                          {viewMore && (
                            <Link
                              href={viewMore.href}
                              className="block border-t border-gray-200/80 bg-gray-50/90 py-3 text-center text-sm font-medium text-gray-700 no-underline transition-colors hover:bg-gray-100/90 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                              {viewMore.name}
                            </Link>
                          )}
                        </NavigationMenuContent>
                      </>
                    ) : (
                      href && (
                        <Link href={href} legacyBehavior passHref>
                          <NavigationMenuLink
                            data-active={isActive}
                            className={cn(navigationMenuTriggerStyle(), 'cursor-pointer')}>
                            {name}
                          </NavigationMenuLink>
                        </Link>
                      )
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden w-[180] md:block"></div>
        </Container>
      </div>
    </>
  );
}
