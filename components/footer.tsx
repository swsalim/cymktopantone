import type { ComponentProps } from 'react';

import Link from 'next/link';

import { colorModels } from '@/config/colors';
import { converters } from '@/config/converters';
import { tools } from '@/config/tools';

import { cn } from '@/lib/utils';

import { Logo } from '@/components/icons';

export type IconProps = React.HTMLAttributes<SVGElement>;

const navigation = {
  legal: [
    { name: 'Terms of service', href: '/legal/terms-and-conditions' },
    { name: 'Privacy policy', href: '/legal/privacy-policy' },
  ],
  colorModels: colorModels.map((model) => ({
    name: model.title,
    href: model.href,
  })),
  pantone: converters
    .filter((converter) => converter.sourceColor === 'PANTONE')
    .map((converter) => ({
      name: converter.title,
      href: converter.url,
    })),
  projects: tools.map((tool) => ({
    name: tool.title,
    href: tool.href,
    isExternal: tool.isExternal,
  })),
};

interface FooterProps extends ComponentProps<'footer'> {
  className?: string;
}

export default function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-gray-900', className)} {...props}>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          <div className="space-y-3 md:col-span-1 lg:col-span-1">
            <Logo className="size-9 text-white" />
            <p className="text-balance text-base/6 text-gray-100">
              Get instant, accurate Pantone matches for your CMYK colors.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 md:col-span-2 md:mt-0 md:grid-cols-3">
            <div className="md:mt-0">
              <h2 className="text-base font-semibold text-gray-100">Color Models</h2>
              <ul role="list" className="mt-4 space-y-4 md:mt-6">
                {navigation.colorModels.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`${item.href}`}
                      className="text-base/6 text-gray-300 transition hover:text-violet-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:mt-0">
              <div className="md:mt-0">
                <h2 className="text-base font-semibold text-gray-100">Pantone Colors</h2>
                <ul role="list" className="mt-4 space-y-4 md:mt-6">
                  {navigation.pantone.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={`${item.href}`}
                        className="text-base/6 text-gray-300 transition hover:text-violet-400">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 md:mt-8">
                <h3 className="text-base/6 font-semibold text-gray-100">Legal</h3>
                <ul role="list" className="mt-4 space-y-4 md:mt-6">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base/6 text-gray-300 transition hover:text-violet-400">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 md:mt-0">
              <h3 className="text-base/6 font-semibold text-gray-100">Our Projects</h3>
              <ul role="list" className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:grid-cols-1">
                {navigation.projects.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-base/6 text-gray-300 transition hover:text-violet-400"
                      target="_blank">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-row flex-wrap gap-4 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="shrink-0">
            <a href="https://fazier.com/launches/cmyk-to-pantone-converter" target="_blank">
              <img
                src="https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=4551&badge_type=daily&theme=dark"
                width="170"
                height="34"
                alt="Fazier badge"
              />
            </a>
          </div>
          <div className="shrink-0">
            <a href="https://twelve.tools" target="_blank">
              <img
                src="https://twelve.tools/badge0-white.svg"
                alt="Featured on Twelve Tools"
                width="126"
                height="34"
              />
            </a>
          </div>
          <div className="shrink-0">
            <a
              href="https://startupfa.me/s/cmyk-to-pantone?utm_source=www.cmyktopantone.com"
              target="_blank">
              <img
                src="https://startupfa.me/badges/featured-badge.webp"
                alt="Featured on Startup Fame"
                width="108"
                height="34"
              />
            </a>
          </div>
          <div className="shrink-0">
            <a href="https://launchboard.dev/?via=launchboardBadge" target="_blank" rel="noopener">
              <img
                src="https://fjgjjrnzgpkltspdokof.supabase.co/storage/v1/object/public/assets//LaunchBoard%20Badge.png"
                alt="See us on LaunchBoard"
                width="102"
                height="34"
              />
            </a>
          </div>
          <div className="shrink-0">
            <a href="https://liiinks.net" target="_blank">
              <svg width="102" height="34" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="40" rx="8" fill="#667eea" />
                <text
                  x="60"
                  y="25"
                  font-family="Arial, sans-serif"
                  font-size="12"
                  fill="white"
                  text-anchor="middle">
                  Liiinks
                </text>
              </svg>
            </a>
          </div>
          <div className="shrink-0">
            <a href="https://theindiewall.net" target="_blank">
              <img
                src="https://theindiewall.net/indiewall.svg"
                alt="IndieWall"
                width="68"
                height="34"
              />
            </a>
          </div>
          <div className="shrink-0">
            <a href="https://turbo0.com/item/cmyk-to-pantone-converter" target="_blank">
              <img
                src="https://img.turbo0.com/badge-listed-light.svg"
                alt="Listed on Turbo0"
                width="76"
                height="34"
              />
            </a>
          </div>
          <div className="shrink-0">
            <a
              href="https://indie.deals?ref=https%3A%2F%2Fwww.cmyktopantone.com%2F"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#4b5563' }}>
                Find us on{' '}
                <span
                  style={{
                    fontWeight: 700,
                    color: '#0070f3',
                    position: 'relative',
                    display: 'inline-block',
                  }}>
                  Indie.Deals
                </span>
              </span>
            </a>
          </div>
          <div className="shrink-0">
            <a href="https://magicbox.tools" target="_blank">
              <img
                src="https://magicbox.tools/badge.svg"
                alt="Featured on MagicBox.tools"
                width="137"
                height="37"
              />
            </a>
          </div>
          <div className="shrink-0">
            <a href="https://dang.ai/" target="_blank">
              <img
                src="https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png"
                alt="Dang.ai"
                width="103"
                height="37"
              />
            </a>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm text-gray-300">
            &copy; {currentYear}{' '}
            <a
              href="https://www.yuurrific.com?ref=cmyktopantone"
              className="font-medium text-violet-400 transition hover:text-violet-400"
              target="_blank">
              Yuurrific
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
