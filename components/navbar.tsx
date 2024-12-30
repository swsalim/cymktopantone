'use client';

import Link from 'next/link';

import { siteConfig } from '@/config/site';

import useScroll from '@/lib/hooks/use-scroll';

import { Container } from '@/components/container';
import { Logo } from '@/components/icons';

export default function Navbar() {
  const scrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/50'
            : 'bg-white/0'
        } z-30 transition-all`}>
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-x-2 text-xl">
            <Logo className="h-8 w-auto fill-violet-600" />
            <span className="text-base font-medium">{siteConfig.siteName}</span>
          </Link>
          <div className="flex flex-shrink-0 gap-x-4">
            <a
              href="https://pfpresizer.com?ref=cymktopantone"
              target="_blank"
              className="font-medium text-gray-700 transition hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400">
              Resize Image
            </a>
            <a
              href="https://www.flipanimage.xyz?ref=cymktopantone"
              target="_blank"
              className="font-medium text-gray-700 transition hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400">
              Flip Image
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
