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
            <div className="pt-4">
              <a href="https://fazier.com" target="_blank">
                <img
                  src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
                  width="120"
                  alt="Fazier badge"
                />
              </a>
            </div>
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
            <div className="md:mt-0">
              <h3 className="text-base/6 font-semibold text-gray-100">Our Projects</h3>
              <ul role="list" className="mt-4 space-y-4 md:mt-6">
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
