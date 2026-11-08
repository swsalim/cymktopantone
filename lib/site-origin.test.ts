import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import robots from '../app/robots';

import { SITE_DOMAIN, absoluteUrl, canonicalUrl } from './utils';

const LEGACY_HOST = 'cmyktopantone.com';
const CANONICAL_ORIGIN = `https://${SITE_DOMAIN}`;

function withEnv(overrides: NodeJS.ProcessEnv, fn: () => void) {
  const previous = process.env;
  process.env = { ...previous, ...overrides };
  try {
    fn();
  } finally {
    process.env = previous;
  }
}

describe('absoluteUrl / canonicalUrl in production', () => {
  it('ignores NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL when it is a legacy host', () => {
    withEnv(
      {
        NEXT_PUBLIC_VERCEL_ENV: 'production',
        NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: LEGACY_HOST,
      },
      () => {
        assert.equal(absoluteUrl(), CANONICAL_ORIGIN);
        assert.equal(absoluteUrl('/sitemap.xml'), `${CANONICAL_ORIGIN}/sitemap.xml`);
        assert.equal(canonicalUrl('/blog/color-theory-101'), `${CANONICAL_ORIGIN}/blog/color-theory-101`);
        assert.doesNotMatch(absoluteUrl('/robots.txt'), new RegExp(LEGACY_HOST));
      },
    );
  });
});

describe('robots() metadata', () => {
  it('points Sitemap at colormapper.xyz in production', () => {
    withEnv(
      {
        NEXT_PUBLIC_VERCEL_ENV: 'production',
        NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: LEGACY_HOST,
      },
      () => {
        const meta = robots();
        assert.equal(meta.sitemap, `${CANONICAL_ORIGIN}/sitemap.xml`);
      },
    );
  });
});

describe('representative canonical paths', () => {
  it('uses colormapper.xyz for homepage and sample routes', () => {
    withEnv(
      {
        NEXT_PUBLIC_VERCEL_ENV: 'production',
        NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: LEGACY_HOST,
      },
      () => {
        assert.equal(canonicalUrl('/'), CANONICAL_ORIGIN);
        assert.equal(canonicalUrl('/convert-hex-to-cmyk'), `${CANONICAL_ORIGIN}/convert-hex-to-cmyk`);
        assert.equal(canonicalUrl('/color/ff0000'), `${CANONICAL_ORIGIN}/color/ff0000`);
      },
    );
  });
});
