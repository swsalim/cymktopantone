/* Hallmark · component: footer · archetype: Ft5 Statement (sentence ~38ch · wordmark in meta row · hairline rule)
 * genre: modern-minimal · theme: Violet Cyan Gradient (locked)
 * states: default · hover · focus · active — links + CTA
 */
import type { ComponentProps } from 'react';

import Link from 'next/link';

import {
  footerColorTools,
  footerLearnLinks,
  footerSiteLinks,
  POPULAR_CONVERTERS,
} from '@/config/navigation';
import { siteConfig } from '@/config/site';

import { cn } from '@/lib/utils';

import { Logo } from '@/components/icons';

const footerLinkClass =
  'inline-block whitespace-nowrap rounded-md text-sm text-gray-400 no-underline transition-colors duration-150 hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:text-violet-200';

const DIRECTORY_BADGES = [
  {
    href: 'https://launchpadly.co/startup/color-mapper?ref=badge',
    src: 'https://launchpadly.co/embed/badges/startup/color-mapper.svg?variant=listed-on',
    alt: 'Launchpadly Startup Directory',
    attrs: {
      'data-launchpadly-badge': 'color-mapper',
      'data-launchpadly-badge-variant': 'listed-on',
    },
  },
  {
    href: 'https://buildlist.io',
    src: 'https://buildlist.io/badge.svg',
    alt: 'Featured on Buildlist',
  },
  {
    href: 'https://www.listbulb.com/tools/colormapper',
    src: 'https://www.listbulb.com/featured-on-listbulb-light.svg',
    alt: 'Featured on ListBulb',
  },
  {
    href: 'https://www.tinyshelf.co/?ref=colormapper.xyz',
    src: 'https://www.tinyshelf.co/badge/tinyshelf-badge-dark-f4d1216a.svg',
    alt: 'Featured on tinyshelf',
    title: 'Featured on tinyshelf',
  },
  {
    href: 'https://nicklaunches.com/products/color-mapper/?utm_source=colormapper.xyz&utm_medium=badge&utm_campaign=featured',
    src: 'https://nicklaunches.com/badges/featured.png',
    alt: 'Color Mapper on Nick Launches',
  },
  {
    href: 'https://twelve.tools',
    src: 'https://twelve.tools/badge0-white.svg',
    alt: 'Featured on Twelve Tools',
  },
  {
    href: 'https://easylaunch.dev/design/color-mapper',
    src: 'https://easylaunch.dev/badge/easylaunch-badge-light.svg',
    alt: 'Featured on EasyLaunch',
  },
  {
    href: 'https://lemonlaunch.dev/design/color-mapper',
    src: 'https://lemonlaunch.dev/badge/lemonlaunch-badge-light.svg',
    alt: 'Featured on LemonLaunch',
  },
  {
    href: 'https://easydofollow.dev/design/color-mapper',
    src: 'https://easydofollow.dev/badge/easydofollow-badge-light.svg',
    alt: 'Featured on EasyDoFollow',
  },
  {
    href: 'https://launchstreak.dev/design/color-mapper',
    src: 'https://launchstreak.dev/badge/launch-streak-badge-light.svg',
    alt: 'Launched on Launch Streak',
  },
] as const;

interface FooterProps extends ComponentProps<'footer'> {
  className?: string;
}

function LinkRow({
  label,
  links,
}: {
  label: string;
  links: ReadonlyArray<{ name: string; href: string }>;
}) {
  return (
    <div className="min-w-0">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</h2>
      <ul role="list" className="mt-2 flex flex-wrap gap-x-2 gap-y-2">
        {links.map((link, i) => (
          <li key={link.href} className="flex items-center gap-x-2">
            {i > 0 && (
              <span aria-hidden className="text-gray-700">
                ·
              </span>
            )}
            <Link href={link.href} className={footerLinkClass}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DirectoryBadgeTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      role="list"
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-5 pr-5">
      {DIRECTORY_BADGES.map((badge) => (
        <li key={badge.href} className="shrink-0">
          <a
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            title={'title' in badge ? badge.title : undefined}
            className="inline-flex rounded-md opacity-80 transition-opacity duration-150 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            {...('attrs' in badge ? badge.attrs : {})}>
            {/* eslint-disable-next-line @next/next/no-img-element -- third-party directory badges from many hosts */}
            <img
              src={badge.src}
              alt={badge.alt}
              height={28}
              className="h-7 w-auto max-w-[140px] object-contain"
              loading="lazy"
              decoding="async"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

function DirectoryBadgeMarquee() {
  return (
    <div
      className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label="Featured on directories">
      <div className="flex w-max motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused]">
        <DirectoryBadgeTrack />
        <DirectoryBadgeTrack hidden />
      </div>
    </div>
  );
}

export default function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-site-nav
      className={cn('bg-gray-950 text-gray-100', className)}
      {...props}>
      {/* Theme signature: thin violet→cyan band instead of a border */}
      <div
        aria-hidden
        className="h-1 w-full bg-gradient-to-r from-violet-700 via-violet-500 to-cyan-400"
      />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8 lg:pt-24">
        {/* Statement */}
        <p className="max-w-[16ch] font-heading text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          One palette, from{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
            screen to press
          </span>
          .
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/tools"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 active:bg-violet-700">
            Start with a color
          </Link>
          <Link
            href="/convert-color"
            className="inline-flex items-center text-sm font-semibold text-gray-300 underline decoration-gray-600 underline-offset-4 transition-colors duration-150 hover:text-violet-300 hover:decoration-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:text-violet-200">
            or just convert one
          </Link>
        </div>

        {/* Compact link band — rows, not columns */}
        <div className="mt-16 space-y-7 lg:mt-20">
          <LinkRow label="Tools" links={footerColorTools} />
          <LinkRow label="Convert" links={POPULAR_CONVERTERS} />
          <LinkRow label="Learn" links={footerLearnLinks} />
        </div>

        <DirectoryBadgeMarquee />

        {/* Meta row */}
        <div className="mt-14 flex flex-col gap-4 border-t border-gray-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">
              <Logo className="size-7 text-white" />
              <span className="sr-only">{siteConfig.siteName} home</span>
            </Link>
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {siteConfig.siteName}. Built by{' '}
              <a
                href="https://www.yuurrific.com?ref=colormapper"
                className={cn(footerLinkClass, 'whitespace-normal')}
                target="_blank"
                rel="noopener noreferrer">
                Yuurrific
              </a>
              .
            </p>
          </div>
          <ul role="list" className="flex flex-wrap gap-x-5 gap-y-2">
            {footerSiteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
