import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

import { getAllConverters } from '../config/converters';
import {
  colorWheelSubpages,
  gradientSubpages,
  harmonySubpages,
  internalTools,
} from '../config/tools-internal';

import {
  expectedLegacyCheck,
  getNextConfigRedirects,
  GONE_EXACT,
  resolveLegacyPath,
  REVERSE_TARGET,
  SPOT_TARGET,
  summarizeLegacyPaths,
} from './legacy-path-resolver';

const STATIC_PAGES = new Set([
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
  '/colors',
  '/images/og-default.png',
]);

function publishedBlogSlugs(): Set<string> {
  return new Set(
    readdirSync(join(process.cwd(), 'posts'))
      .filter((name) => name.endsWith('.mdx'))
      .filter((name) =>
        readFileSync(join(process.cwd(), 'posts', name), 'utf8').includes("status: 'published'"),
      )
      .map((name) => name.replace(/\.mdx$/, '')),
  );
}

function isRealRoute(pathname: string): boolean {
  if (STATIC_PAGES.has(pathname)) {
    if (pathname === '/images/og-default.png') {
      return existsSync(join(process.cwd(), 'public/images/og-default.png'));
    }
    return true;
  }
  if (internalTools.some((tool) => tool.href === pathname)) return true;
  if (getAllConverters().some((converter) => converter.url === pathname)) return true;
  if (harmonySubpages.some((page) => pathname === `/palettes/${page.slug}`)) return true;
  if (gradientSubpages.some((page) => pathname === `/gradients/${page.slug}`)) return true;
  if (colorWheelSubpages.some((page) => pathname === `/color-wheel/${page.slug}`)) return true;
  if (pathname.startsWith('/blog/')) {
    return publishedBlogSlugs().has(pathname.slice('/blog/'.length));
  }
  return false;
}

function destinationPath(destination: string): string {
  if (destination.startsWith('http://') || destination.startsWith('https://')) {
    return new URL(destination).pathname;
  }
  return destination;
}

describe('resolveLegacyPath', () => {
  it('returns gone for removed detail paths and the match root', () => {
    assert.deepEqual(resolveLegacyPath('/pantone/1775-c'), { kind: 'gone' });
    assert.deepEqual(resolveLegacyPath('/pantone-colors/pantone-white-c'), { kind: 'gone' });
    assert.deepEqual(resolveLegacyPath('/pantone-color-match'), { kind: 'gone' });
    assert.deepEqual(resolveLegacyPath('/pantone-color-match/'), { kind: 'gone' });
    assert.equal(GONE_EXACT.has('/pantone-color-match'), true);
  });

  it('does not redirect removed paths', () => {
    assert.deepEqual(expectedLegacyCheck('/pantone/1775-c'), { status: 410 });
    assert.deepEqual(expectedLegacyCheck('/pantone-color-match'), { status: 410 });
  });

  it('sends forward converters to the spot matcher and reverse converters to the guide', () => {
    assert.deepEqual(resolveLegacyPath('/convert-cmyk-to-pantone-pms'), {
      kind: 'redirect',
      pathname: SPOT_TARGET,
    });
    assert.deepEqual(resolveLegacyPath('/convert-cmyk-to-pantone-pms/'), {
      kind: 'redirect',
      pathname: SPOT_TARGET,
    });
    assert.deepEqual(resolveLegacyPath('/convert-hex-to-pantone-pms/0000ff'), {
      kind: 'redirect',
      pathname: SPOT_TARGET,
    });
    assert.deepEqual(resolveLegacyPath('/convert-hex-to-pantone-pms/:hex'), {
      kind: 'redirect',
      pathname: SPOT_TARGET,
    });
    assert.deepEqual(resolveLegacyPath('/convert-pantone-pms-to-rgb'), {
      kind: 'redirect',
      pathname: REVERSE_TARGET,
    });
    assert.deepEqual(resolveLegacyPath('/blog/pantone-to-hex-rgb'), {
      kind: 'redirect',
      pathname: REVERSE_TARGET,
    });
  });

  it('redirects legacy blog slugs that are not the rewritten guide', () => {
    assert.deepEqual(resolveLegacyPath('/blog/convert-cmyk-pantone'), {
      kind: 'redirect',
      pathname: '/blog/the-complete-guide-to-managing-color-from-screen-to-press',
    });
    assert.deepEqual(resolveLegacyPath('/blog/spot-color-process-color'), { kind: 'same' });
  });

  it('passes through ordinary tool paths unchanged', () => {
    assert.deepEqual(resolveLegacyPath('/convert-cmyk-to-hex'), { kind: 'same' });
    assert.deepEqual(expectedLegacyCheck('/convert-cmyk-to-hex'), {
      status: 308,
      finalUrl: 'https://colormapper.xyz/convert-cmyk-to-hex',
    });
    assert.deepEqual(resolveLegacyPath('/convert-color/'), { kind: 'same' });
  });

  it('maps the old colour index to /colors', () => {
    assert.deepEqual(resolveLegacyPath('/pantone-colors'), {
      kind: 'redirect',
      pathname: '/colors',
    });
    assert.deepEqual(resolveLegacyPath('/pantone'), {
      kind: 'redirect',
      pathname: '/colors',
    });
  });
});

describe('redirect rules', () => {
  it('points SPOT_TARGET and REVERSE_TARGET at real pages and never chains', () => {
    assert.equal(isRealRoute(SPOT_TARGET), true);
    assert.equal(isRealRoute(REVERSE_TARGET), true);
    assert.deepEqual(resolveLegacyPath(SPOT_TARGET), { kind: 'same' });
    assert.deepEqual(resolveLegacyPath(REVERSE_TARGET), { kind: 'same' });

    const rules = getNextConfigRedirects();
    assert.ok(rules.length > 0);
    const paths = new Set<string>();
    for (const rule of rules) {
      const path = destinationPath(rule.destination);
      paths.add(path);
      assert.notEqual(path, '/');
      assert.doesNotMatch(path, /pantone|pms/i);
      assert.equal(isRealRoute(path), true, path);
      assert.deepEqual(resolveLegacyPath(path), { kind: 'same' });
    }
    assert.equal(paths.has(SPOT_TARGET), true);
    assert.equal(paths.has(REVERSE_TARGET), true);
  });

  it('emits the legacy host rule before the host-less rule', () => {
    const rules = getNextConfigRedirects();
    const spot = rules.filter((rule) => rule.source === '/convert-rgb-to-pantone-pms');
    assert.equal(spot.length, 2);
    assert.equal(spot[0].has?.[0]?.type, 'host');
    assert.equal(spot[0].destination, `https://colormapper.xyz${SPOT_TARGET}`);
    assert.equal(spot[1].has, undefined);
    assert.equal(spot[1].destination, SPOT_TARGET);
  });

  it('skips the built-in trailing-slash redirect', () => {
    const source = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    assert.match(source, /skipTrailingSlashRedirect:\s*true/);
  });

  it('does not add request-time rendering to the new page', () => {
    const source = readFileSync(
      join(process.cwd(), 'app/(marketing)/convert-rgb-to-spot-color/page.tsx'),
      'utf8',
    );
    assert.doesNotMatch(source, /revalidate|unstable_cache|cookies\(|headers\(|searchParams|dynamicParams/);
    assert.match(source, /index:\s*true/);
    assert.match(source, /follow:\s*true/);
  });
});

describe('trademark guard on new copy', () => {
  it('keeps Pantone and PMS out of the new page and the rewritten post', () => {
    const files = [
      'app/(marketing)/convert-rgb-to-spot-color/page.tsx',
      'components/color-tools/spot-color-matcher.tsx',
      'posts/spot-color-to-hex-rgb.mdx',
      'public/.well-known/okf/articles/spot-color-to-hex-rgb.md',
    ];
    for (const file of files) {
      const source = readFileSync(join(process.cwd(), file), 'utf8');
      assert.doesNotMatch(source, /pantone|\bPMS\b/i, file);
    }
    const matcher = readFileSync(
      join(process.cwd(), 'components/color-tools/spot-color-matcher.tsx'),
      'utf8',
    );
    assert.doesNotMatch(matcher, /coated/i);
  });
});

describe('summarizeLegacyPaths fixture', () => {
  it('classifies every line in data/legacy-old-paths.txt', () => {
    const fixture = readFileSync(join(process.cwd(), 'data/legacy-old-paths.txt'), 'utf8');
    const lines = fixture.split('\n').filter((line) => line.trim().length > 0);
    const summary = summarizeLegacyPaths(lines);
    const redirectTotal = Object.values(summary.redirects).reduce((a, b) => a + b, 0);
    assert.equal(summary.gone + summary.same + redirectTotal, lines.length);
    assert.equal(summary.redirects['/'], undefined);
  });
});
