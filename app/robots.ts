import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/utils';

const NEXT_SSG_FILES = ['/*_buildManifest.js$', '/*_middlewareManifest.js$', '/*_ssgManifest.js$'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: NEXT_SSG_FILES,
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
