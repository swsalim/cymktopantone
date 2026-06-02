import type { MetadataRoute } from 'next';

const NEXT_SSG_FILES = ['/*_buildManifest.js$', '/*_middlewareManifest.js$', '/*_ssgManifest.js$'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: NEXT_SSG_FILES,
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
