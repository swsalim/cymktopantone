import { SiteConfig } from '@/types';

import { absoluteUrl } from '@/lib/utils';

export const siteConfig: SiteConfig = {
  title: 'RGB to CMYK Converter — Free & Instant Color Conversion Tool',
  description:
    'Free RGB to CMYK converter for designers, printers, and marketers. Convert instantly with accurate color values and no account required.',
  siteName: 'RGB to CMYK',
  url: new URL(absoluteUrl()),
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for rgbtocmyk.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
};
