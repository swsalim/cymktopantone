import type { MetadataRoute } from 'next';

import { absoluteUrl, SITE_DOMAIN } from '@/lib/utils';

const NEXT_SSG_FILES = ['/*_buildManifest.js$', '/*_middlewareManifest.js$', '/*_ssgManifest.js$'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: NEXT_SSG_FILES,
    },
    host: SITE_DOMAIN,
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
