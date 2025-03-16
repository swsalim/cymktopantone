'use client';

import React, { ElementType } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
} from '@/components/ui/navigation-menu';

export const navItems: {
  name: string;
  href?: string;
  segments?: string[];
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
    childItems: [
      {
        title: 'CMYK',
        href: '/color-models/cmyk',
        description: 'Everything You Need to Know about CMYK',
      },
      {
        title: 'RGB',
        href: '/color-models/rgb',
        description: 'All You Need to Know About RGB Color Model',
      },
      {
        title: 'HEX',
        href: '/color-models/hex',
        description: 'HEX Color Codes - The Essential Guide for Designers',
      },
      {
        title: 'HSL',
        href: '/color-models/hsl',
        description: 'A Guide to HSL Color Model',
      },
    ],
  },
  {
    name: 'Convert Color',
    childItems: [
      {
        title: 'CMYK to HEX',
        href: '/convert-cmyk-to-hex',
        description: 'Easily convert CMYK to HEX colors with our fast and reliable tool.',
      },
      {
        title: 'CMYK to HSL',
        href: '/convert-cmyk-to-hsl',
        description: 'Easily convert CMYK to HSL colors with our fast and reliable tool.',
      },
      {
        title: 'CMYK to RGB',
        href: '/convert-cmyk-to-rgb',
        description: 'Easily convert CMYK to RGB colors with our fast and reliable tool.',
      },
      {
        title: 'RGB to CMYK',
        href: '/convert-rgb-to-cmyk',
        description: 'Easily convert HSV to CMYK colors with our fast and reliable tool.',
      },
      {
        title: 'RGB to HEX',
        href: '/convert-rgb-to-hex',
        description: 'Easily convert HSV to HEX colors with our fast and reliable tool.',
      },
      {
        title: 'RGB to HSL',
        href: '/convert-rgb-to-hsl',
        description: 'Easily convert HSV to HSL colors with our fast and reliable tool.',
      },
      {
        title: 'HEX to CMYK',
        href: '/convert-hex-to-cmyk',
        description: 'Easily convert HEX to CMYK colors with our fast and reliable tool.',
      },
      {
        title: 'HEX to HSL',
        href: '/convert-hex-to-hsl',
        description: 'Easily convert HEX to HSL colors with our fast and reliable tool.',
      },
      {
        title: 'HEX to HSV',
        href: '/convert-hex-to-hsv',
        description: 'Easily convert HEX to HSV colors with our fast and reliable tool.',
      },
      {
        title: 'HEX to RGB',
        href: '/convert-hex-to-rgb',
        description: 'Easily convert HEX to RGB colors with our fast and reliable tool.',
      },
      {
        title: 'HEX to Pantone',
        href: '/convert-hex-to-pantone-pms',
        description: 'Easily convert HEX to Pantone colors with our fast and reliable tool.',
      },
      {
        title: 'HSL to CMYK',
        href: '/convert-hsl-to-cmyk',
        description: 'Easily convert HSL to CMYK colors with our fast and reliable tool.',
      },
      {
        title: 'HSL to HEX',
        href: '/convert-hsl-to-hex',
        description: 'Easily convert HSL to HEX colors with our fast and reliable tool.',
      },
      {
        title: 'HSL to RGB',
        href: '/convert-hsl-to-rgb',
        description: 'Easily convert HSL to RGB colors with our fast and reliable tool.',
      },
      {
        title: 'HSL to Pantone',
        href: '/convert-hsl-to-pantone-pms',
        description: 'Easily convert HSL to Pantone colors with our fast and reliable tool.',
      },
      {
        title: 'HSV to CMYK',
        href: '/convert-hsv-to-cmyk',
        description: 'Easily convert HSV to CMYK colors with our fast and reliable tool.',
      },
      {
        title: 'HSV to HEX',
        href: '/convert-hsv-to-hex',
        description: 'Easily convert HSV to HEX colors with our fast and reliable tool.',
      },
      {
        title: 'HSV to HSL',
        href: '/convert-hsv-to-hsl',
        description: 'Easily convert HSV to HSL colors with our fast and reliable tool.',
      },
      {
        title: 'HSV to RGB',
        href: '/convert-hsv-to-rgb',
        description: 'Easily convert HSV to RGB colors with our fast and reliable tool.',
      },
      {
        title: 'HSV to Pantone',
        href: '/convert-hsv-to-pantone-pms',
        description: 'Easily convert HSV to Pantone colors with our fast and reliable tool.',
      },
    ],
  },
  {
    name: 'Pantone',
    childItems: [
      {
        title: 'Pantone to CMYK',
        href: '/convert-pantone-to-cmyk',
        description: 'Easily convert Pantone to CMYK colors with our fast and reliable tool.',
      },
      {
        title: 'Pantone to HEX',
        href: '/convert-pantone-to-hex',
        description: 'Easily convert Pantone to HEX colors with our fast and reliable tool.',
      },
      {
        title: 'Pantone to HSL',
        href: '/convert-pantone-to-hsl',
        description: 'Easily convert Pantone to HSL colors with our fast and reliable tool.',
      },
      {
        title: 'Pantone to HSV',
        href: '/convert-pantone-to-hsv',
        description: 'Easily convert Pantone to HSV colors with our fast and reliable tool.',
      },
      {
        title: 'Pantone to RGB',
        href: '/convert-pantone-to-rgb',
        description: 'Easily convert Pantone to RGB colors with our fast and reliable tool.',
      },
    ],
  },
  {
    name: 'More Tools',
    childItems: [
      {
        title: 'Random Number Generator',
        href: 'https://www.randomnumberapp.com/',
        description: 'Random number generator for numbers 0 to 10,000.',
        isExternal: true,
      },
      {
        title: 'Resize Image',
        href: 'https://pfpresizer.com/',
        description:
          'Quickly resize your profile picture for Instagram, Facebook, WhatsApp, and other platforms. Free and easy-to-use PFP resizer for all social media platforms.',
        isExternal: true,
      },
      {
        title: 'Flip Image',
        href: 'https://www.flipanimage.xyz/',
        description: 'Flip an image horizontally or vertically for free.',
        isExternal: true,
      },
      {
        title: 'Play Sudoku',
        href: 'https://sudokuunlimited.com/',
        description: 'Play free Sudoku online from Easy to Expert level',
        isExternal: true,
      },
      {
        title: 'RGB to Pantone Converter',
        href: 'https://www.rgbtopantone.com/',
        description:
          'Get instant, accurate Pantone matches for your RGB colors. Perfect for designers, printers & creative professionals who need reliable color conversions.',
        isExternal: true,
      },
      {
        title: 'Water a Day',
        href: 'https://www.wateraday.com/',
        description: 'How Much Water Should You Drink Daily?',
        isExternal: true,
      },
      {
        title: 'Will it rain tomorrow?',
        href: 'https://www.willitraintomorrow.com/',
        description:
          'Tomorrow’s Weather Forecast, Today’s Advantage - Plan Your Day Right, Come Rain or Shine',
        isExternal: true,
      },
    ],
  },
];

// TODO: Check for external link
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { logo?: string }
>(({ className, title, children, logo, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-violet-50 hover:text-violet-900 focus:bg-violet-50 focus:text-violet-900',
            className,
          )}
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
              {navItems.map(({ name, href, segments, childItems }) => {
                const isActive = segments?.some((segment) => pathname?.startsWith(segment));

                return (
                  <NavigationMenuItem key={name}>
                    <>
                      {href && (
                        <Link href={href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              'group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-violet-50 hover:text-violet-700 focus:bg-violet-50 focus:text-violet-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-violet-50/50 data-[state=open]:bg-violet-50/50 data-[active=true]:text-violet-700 data-[state=open]:text-violet-700 data-[active=true]:hover:bg-violet-50 data-[state=open]:hover:bg-violet-50 data-[active=true]:focus:bg-violet-50 data-[state=open]:focus:bg-violet-50',
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
                                    data-active={pathname === item.href}
                                    className={cn(
                                      pathname === item.href && 'bg-violet-50 text-violet-900',
                                    )}>
                                    {item.description}
                                  </ListItem>
                                );
                              })}
                            </ul>
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
