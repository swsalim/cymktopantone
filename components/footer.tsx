import type { ComponentProps } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Logo } from '@/components/icons';

export type IconProps = React.HTMLAttributes<SVGElement>;

// TODO: Loop data from navbar
const navigation = {
  legal: [
    { name: 'Terms of service', href: '/legal/terms-and-conditions' },
    { name: 'Privacy policy', href: '/legal/privacy-policy' },
  ],
  colorModels: [
    {
      name: 'CMYK',
      href: '/color-models/cmyk',
    },
    {
      name: 'RGB',
      href: '/color-models/rgb',
    },
    {
      name: 'HEX',
      href: '/color-models/hex',
    },
    {
      name: 'HSL',
      href: '/color-models/hsl',
    },
  ],
  pantone: [
    {
      name: 'Pantone to CMYK',
      href: '/convert-pantone-to-cmyk',
    },
    {
      name: 'Pantone to HEX',
      href: '/convert-pantone-to-hex',
    },
    {
      name: 'Pantone to HSL',
      href: '/convert-pantone-to-hsl',
    },
    {
      name: 'Pantone to HSV',
      href: '/convert-pantone-to-hsv',
    },
    {
      name: 'Pantone to RGB',
      href: '/convert-pantone-to-rgb',
    },
  ],
  projects: [
    {
      name: 'Random Number Generator',
      href: 'https://www.randomnumberapp.com/?ref=cmyktopantone.com',
    },
    {
      name: 'Resize Image',
      href: 'https://pfpresizer.com/?ref=cmyktopantone.com',
    },
    {
      name: 'Flip Image',
      href: 'https://www.flipanimage.xyz/?ref=cmyktopantone.com',
    },
    {
      name: 'Play Sudoku',
      href: 'https://sudokuunlimited.com/?ref=cmyktopantone.com',
    },
    {
      name: 'RGB to Pantone Converter',
      href: 'https://www.rgbtopantone.com/?ref=cmyktopantone.com',
    },
    {
      name: 'Water a Day',
      href: 'https://www.wateraday.com/?ref=cmyktopantone.com',
    },
    {
      name: 'Will it rain tomorrow?',
      href: 'https://www.willitraintomorrow.com/?ref=cmyktopantone.com',
    },
  ],
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
            <div className="md:mt-0">
              <h3 className="text-base/6 font-semibold text-gray-100">Our Projects</h3>
              <ul role="list" className="mt-4 space-y-4 md:mt-6">
                {navigation.projects.map((item) => (
                  <li key={item.name}>
                    <a
                      href={`${item.href}?ref=cmyktopantone`}
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
