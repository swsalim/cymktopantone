import type { MetadataRoute } from 'next';

import { isMaintenanceMode } from '@/lib/maintenance';

const NEXT_SSG_FILES = ['/*_buildManifest.js$', '/*_middlewareManifest.js$', '/*_ssgManifest.js$'];

export default function robots(): MetadataRoute.Robots {
  if (isMaintenanceMode()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      disallow: NEXT_SSG_FILES,
    },
  };
}
