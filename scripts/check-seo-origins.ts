/**
 * Validates robots + sitemap metadata use the canonical colormapper.xyz origin.
 * Requires content-collections output (run after `next build` or dev generate).
 *
 *   NEXT_PUBLIC_VERCEL_ENV=production \
 *   NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=cmyktopantone.com \
 *   npm run check-seo-origins
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import robots from '../app/robots';
import sitemap from '../app/sitemap';

import { SITE_DOMAIN } from '../lib/utils';

const LEGACY_HOST = 'cmyktopantone.com';
const CANONICAL_ORIGIN = `https://${SITE_DOMAIN}`;
const collectionsDir = join(process.cwd(), '.content-collections', 'generated');

if (!existsSync(collectionsDir)) {
  console.error(
    `Missing ${collectionsDir}. Run \`npm run build\` (or dev) to generate content-collections first.`,
  );
  process.exit(1);
}

if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
  process.env.NEXT_PUBLIC_VERCEL_ENV = 'production';
}
process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL = LEGACY_HOST;

const robotsMeta = robots();
assert.equal(
  robotsMeta.sitemap,
  `${CANONICAL_ORIGIN}/sitemap.xml`,
  'robots sitemap must use colormapper.xyz',
);

const entries = sitemap();
assert.ok(entries.length > 0, 'sitemap must not be empty');

let legacyCount = 0;
for (const entry of entries) {
  if (!entry.url.startsWith(CANONICAL_ORIGIN)) {
    legacyCount += 1;
    console.error(`non-canonical sitemap URL: ${entry.url}`);
  }
  if (entry.url.includes(LEGACY_HOST)) {
    legacyCount += 1;
    console.error(`legacy host in sitemap: ${entry.url}`);
  }
}

assert.equal(legacyCount, 0, 'all sitemap URLs must use colormapper.xyz');
console.log(`check-seo-origins OK (${entries.length} sitemap URLs)`);
