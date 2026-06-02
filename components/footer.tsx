/* Hallmark · component: footer · genre: modern-minimal · theme: Violet Cyan Gradient
 * states: default · hover · focus · active · disabled · loading · error · success
 * Ft4 link-band · curated internal IA
 */
import type { ComponentProps } from 'react';

import Link from 'next/link';

import { colorModels } from '@/config/colors';
import { siteConfig } from '@/config/site';

import { cn } from '@/lib/utils';

import { Logo } from '@/components/icons';

/** High-intent converters — short labels, no duplicate long SEO titles. */
const POPULAR_CONVERTERS = [
  { name: 'RGB to CMYK', href: '/convert-rgb-to-cmyk' },
  { name: 'HEX to CMYK', href: '/convert-hex-to-cmyk' },
  { name: 'CMYK to RGB', href: '/convert-cmyk-to-rgb' },
  { name: 'HEX to RGB', href: '/convert-hex-to-rgb' },
  { name: 'CMYK to HEX', href: '/convert-cmyk-to-hex' },
  { name: 'RGB to HEX', href: '/convert-rgb-to-hex' },
] as const;

const LEARN_LINKS = [
  { name: 'Color models overview', href: '/color-models' },
  ...colorModels.map((model) => ({
    name: `${model.title} explained`,
    href: model.href,
  })),
  { name: 'Blog', href: '/blog' },
  { name: 'Color theory basics', href: '/blog/color-theory-101' },
  { name: 'Startup color palettes', href: '/blog/best-color-palettes-startup' },
] as const;

const SITE_LINKS = [
  { name: 'All converters', href: '/convert-color' },
  { name: 'Advertise', href: '/advertise' },
  { name: 'Terms of service', href: '/legal/terms-and-conditions' },
  { name: 'Privacy policy', href: '/legal/privacy-policy' },
] as const;

const footerLinkClass =
  'inline-block rounded-md text-gray-300 no-underline transition-colors duration-150 hover:text-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:text-violet-700 dark:text-gray-600 dark:hover:text-violet-500';

interface FooterProps extends ComponentProps<'footer'> {
  className?: string;
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <h2 className="font-heading text-sm font-semibold tracking-tight text-white">{title}</h2>
      <ul role="list" className="mt-4 space-y-3">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className={footerLinkClass}>
        {children}
      </Link>
    </li>
  );
}

export default function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-site-nav
      className={cn(
        'border-t border-violet-500/20 bg-gray-950 text-gray-100',
        'dark:border-violet-400/15 dark:bg-gray-950',
        className,
      )}
      {...props}>
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
          {/* Brand + primary CTA */}
          <div className="min-w-0 space-y-5">
            <Link
              href="/"
              className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">
              <Logo className="size-9 text-white" />
              <span className="sr-only">{siteConfig.siteName} home</span>
            </Link>
            <p className="max-w-sm text-pretty text-base/7 text-gray-300">
              Free color conversion between RGB, CMYK, HEX, HSL, and HSV — built for print handoffs
              and digital workflows.
            </p>
            <Link
              href="/convert-color"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 active:bg-violet-700">
              Open converter hub
            </Link>
          </div>

          {/* Curated link bands */}
          <div className="grid min-w-0 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <FooterColumn title="Popular converters">
              {POPULAR_CONVERTERS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.name}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Learn">
              {LEARN_LINKS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.name}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Site">
              {SITE_LINKS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.name}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-8 sm:mt-14 lg:mt-16">
          <p className="text-sm leading-6 text-gray-400">
            &copy; {currentYear} {siteConfig.siteName}. Built by{' '}
            <a
              href="https://www.yuurrific.com?ref=colormapper"
              className={cn(footerLinkClass, 'text-sm')}
              target="_blank"
              rel="noopener noreferrer">
              Yuurrific
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
