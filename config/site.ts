import { SiteConfig } from '@/types';

import { absoluteUrl, SITE_DOMAIN } from '@/lib/utils';

export { SITE_DOMAIN };

export const siteConfig: SiteConfig = {
  title: 'Color Mapper — Free Color Tools: Palettes, Gradients, Contrast & Converters',
  description:
    'Free color tools for designers, printers, and developers. Generate palettes and gradients, check WCAG contrast, build Tailwind scales, and convert between RGB, CMYK, HEX, HSL, and HSV — no account required.',
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
