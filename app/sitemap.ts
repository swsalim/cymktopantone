import type { MetadataRoute } from 'next';

import { allPosts } from 'content-collections';

import { getAllConverters } from '@/config/converters';
import {
  colorWheelSubpages,
  gradientSubpages,
  harmonySubpages,
  internalTools,
} from '@/config/tools-internal';

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
  '/tools',
  '/legal/privacy-policy',
  '/legal/terms-and-conditions',
  '/advertise',
  '/blog',
] as const;

function sitemapEntry(path: string, priority = 0.7): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((p) => sitemapEntry(p));
  const toolEntries = internalTools.map((t) => sitemapEntry(t.href, 0.8));
  const harmonyEntries = harmonySubpages.map((p) => sitemapEntry(`/palettes/${p.slug}`, 0.75));
  const gradientEntries = gradientSubpages.map((p) => sitemapEntry(`/gradients/${p.slug}`, 0.75));
  const wheelEntries = colorWheelSubpages.map((p) => sitemapEntry(`/color-wheel/${p.slug}`, 0.75));
  const converterEntries = getAllConverters().map((c) => sitemapEntry(c.url));
  const blogEntries = allPosts.map((post) => sitemapEntry(`/blog/${post._meta.path}`));

  return [
    ...staticEntries,
    ...toolEntries,
    ...harmonyEntries,
    ...gradientEntries,
    ...wheelEntries,
    ...converterEntries,
    ...blogEntries,
  ];
}
