'use client';

import React, { ElementType } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { colorModels } from '@/config/colors';
import { converters } from '@/config/converters';
import { pantoneCategories } from '@/config/pantoneCategories';
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
    childItems: converters
      .filter((converter) => converter.sourceColor !== 'PANTONE')
      .slice(0, 8)
      .map((converter) => ({
        title: converter.title,
        href: converter.url,
        description: converter.description,
      })),
    viewMore: {
      name: 'View All',
      href: '/convert-color',
    },
  },
  {
    name: 'Pantone Colors',
    childItems: pantoneCategories
      .map((category) => ({
        title: category.name,
        href: `/pantone-colors/${category.slug}`,
        description: category.description,
      }))
      .slice(0, 10),
    viewMore: {
      name: 'View All',
      href: '/pantone-colors',
    },
  },
  // {
  //   name: 'More Tools',
  //   childItems: tools,
  // },
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
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-violet-50 hover:text-violet-900 focus:bg-violet-50 focus:text-violet-900',
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
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
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
            ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/50'
            : 'bg-white/0'
        } z-30 transition-all`}>
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-x-2 text-xl">
            <Logo className="h-8 w-auto fill-violet-600" />
            <span className="hidden text-base font-medium md:block">{siteConfig.siteName}</span>
          </Link>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {navItems.map(({ name, href, segments, childItems, viewMore }) => {
                const isActive = segments?.some((segment) => pathname?.startsWith(segment));

                return (
                  <NavigationMenuItem key={name}>
                    <>
                      {href && (
                        <Link href={href} legacyBehavior passHref>
                          <NavigationMenuLink
                            data-active={isActive}
                            className={cn(
                              'group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-violet-50 hover:text-violet-700 focus:bg-violet-50 focus:text-violet-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-violet-50 data-[state=open]:bg-violet-50 data-[active=true]:text-violet-700 data-[state=open]:text-violet-700 data-[active=true]:hover:bg-violet-50 data-[state=open]:hover:bg-violet-50 data-[active=true]:focus:bg-violet-50 data-[state=open]:focus:bg-violet-50 dark:text-gray-300',
                            )}>
                            {name}
                          </NavigationMenuLink>
                        </Link>
                      )}
                      {!href && (
                        <>
                          <NavigationMenuTrigger data-active={isActive}>
                            {name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {childItems.map((item) => {
                                return (
                                  <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    logo={item.logo}
                                    isExternal={item.isExternal}
                                    data-active={pathname === item.href}
                                    className={cn(
                                      pathname === item.href && 'bg-violet-50 text-violet-900',
                                    )}>
                                    {item.description}
                                  </ListItem>
                                );
                              })}
                            </ul>
                            {viewMore && (
                              <Link
                                href={viewMore.href}
                                className="block bg-violet-50 py-3 text-center text-sm font-medium text-violet-700">
                                {viewMore.name}
                              </Link>
                            )}
                          </NavigationMenuContent>
                        </>
                      )}
                    </>
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
