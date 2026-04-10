import { SiteConfig } from '@/types';

import { absoluteUrl } from '@/lib/utils';

export const siteConfig: SiteConfig = {
  title: 'CMYK to Pantone Converter — Free PMS Match & Color Tools',
  description:
    'Free CMYK to Pantone (PMS) matcher plus HEX, RGB, HSL, and HSV converters for designers and printers. Instant results, no account required.',
  siteName: 'CMYK Pantone',
  url: new URL(absoluteUrl()),
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for cmyktopantone.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
};
