import { SiteConfig } from '@/types';

import { absoluteUrl, SITE_DOMAIN } from '@/lib/utils';

export { SITE_DOMAIN };

export const siteConfig: SiteConfig = {
  title: 'Color Mapper — CMYK Converter & Colour Tools for Print and Web',
  description:
    'Free CMYK converter and colour tools for designers and print workflows. Convert HEX, RGB, CMYK, HSL, and HSV, check WCAG contrast, and prepare brand colours for press — no account required.',
  siteName: 'Color Mapper',
  url: new URL(absoluteUrl()),
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: `Banner for ${SITE_DOMAIN}`,
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
};

/** Static OG image for Open Graph / Twitter / JSON-LD (public/images/og-default.png). */
export function ogImageUrl() {
  return absoluteUrl(siteConfig.openGraph.image);
}

export function ogImages(alt?: string) {
  return [
    {
      url: ogImageUrl(),
      width: siteConfig.openGraph.width,
      height: siteConfig.openGraph.height,
      alt: alt ?? siteConfig.openGraph.imageAlt,
    },
  ];
}
