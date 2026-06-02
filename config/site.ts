import { SiteConfig } from '@/types';

import { absoluteUrl, SITE_DOMAIN } from '@/lib/utils';

export { SITE_DOMAIN };

export const siteConfig: SiteConfig = {
  title: 'Color Mapper — Free RGB, CMYK, HEX, HSL & HSV Converters',
  description:
    'Free color converters for designers, printers, and developers. Convert between RGB, CMYK, HEX, HSL, and HSV instantly with accurate values — no account required.',
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
