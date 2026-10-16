import { Metadata } from 'next';
import Link from 'next/link';

import { ogImages, siteConfig } from '@/config/site';

import { cssCatalogColors, neutralCatalogColors } from '@/lib/color-catalog';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const title = 'CSS Named Colors and Neutrals — HEX Index';
const description =
  'Browse CSS named colors and common neutrals. Each page lists HEX, RGB, HSL, HSV, CMYK, OKLCH, tints, harmonies, and WCAG contrast against white and black.';
const url = '/colors';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    images: ogImages(title),
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: ogImages(title),
  },
};

function ColorGrid({
  colors,
}: {
  colors: { hex: string; names: string[] }[];
}) {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {colors.map((color) => (
        <li key={color.hex}>
          <Link
            href={`/color/${color.hex}`}
            className="flex items-center gap-3 rounded-xl border border-violet-200/70 bg-white/80 p-3 transition hover:border-violet-400 dark:border-gray-700 dark:bg-gray-900/70">
            <span
              className="size-10 shrink-0 rounded-lg border border-black/10"
              style={{ backgroundColor: `#${color.hex}` }}
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {color.names[0]}
              </span>
              <span className="font-mono text-xs text-gray-500">#{color.hex}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ColorsIndexPage() {
  const named = cssCatalogColors();
  const neutrals = neutralCatalogColors();

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl(url)} description={description} />
      <BreadcrumbJsonLd
        itemListElements={[
          { url: absoluteUrl('/'), name: 'Home' },
          { url: absoluteUrl('/colors'), name: 'Colors' },
        ]}
      />
      <Wrapper className="pb-16">
        <Container as="section">
          <h1 className="max-w-4xl text-balance text-3xl font-semibold text-gray-900 md:text-5xl dark:text-gray-100">
            Named colors
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
            CSS Color Module Level 4 defines a set of named colors. Some names share one hex —
            gray and grey, aqua and cyan, fuchsia and magenta — so this index lists each hex once
            and the color page shows every name. Neutrals below are common interface grays that are
            not in that named set. Open a swatch for conversions, tints, harmony palettes, and
            contrast against white and black.
          </p>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Build a scheme in the <Link href="/palettes" className="text-violet-700 hover:underline dark:text-violet-300">palette generator</Link>,
            or convert a value in the <Link href="/convert-color" className="text-violet-700 hover:underline dark:text-violet-300">converter hub</Link>.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">CSS named colors</h2>
          <ColorGrid colors={named} />

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">Neutrals</h2>
          <ColorGrid colors={neutrals} />
        </Container>
      </Wrapper>
    </>
  );
}
