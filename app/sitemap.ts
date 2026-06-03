import type { MetadataRoute } from 'next';

import { allPosts } from 'content-collections';

import { getAllConverters } from '@/config/converters';

import { absoluteUrl } from '@/lib/utils';

const STATIC_PATHS = [
  '/',
  '/color-models',
  '/color-models/rgb',
  '/color-models/cmyk',
  '/color-models/hsl',
  '/color-models/hsv',
  '/color-models/hex',
  '/convert-color',
  '/legal/privacy-policy',
  '/legal/terms-and-conditions',
  '/advertise',
  '/blog',
] as const;

function sitemapEntry(path: string): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map(sitemapEntry);
  const converterEntries = getAllConverters().map((c) => sitemapEntry(c.url));
  const blogEntries = allPosts.map((post) => sitemapEntry(`/blog/${post._meta.path}`));

  return [...staticEntries, ...converterEntries, ...blogEntries];
}
