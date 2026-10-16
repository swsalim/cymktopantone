import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/utils';

const NEXT_SSG_FILES = ['/*_buildManifest.js$', '/*_middlewareManifest.js$', '/*_ssgManifest.js$'];

/** Explicit allow so these crawlers are not treated as blocked when a wildcard rule changes. */
const AI_CRAWLERS = [
  'GPTBot',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'FacebookBot',
  'meta-externalagent',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: NEXT_SSG_FILES,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
