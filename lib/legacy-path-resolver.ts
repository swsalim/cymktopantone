import type { Redirect } from 'next/dist/lib/load-custom-routes';

/** Canonical production host for colormapper.xyz (legacy domains redirect here). */
export const CANONICAL_SITE_HOST = 'colormapper.xyz';

export const LEGACY_HOSTS = new Set([
  'rgbtocmyk.com',
  'www.rgbtocmyk.com',
  'cmyktopantone.com',
  'www.cmyktopantone.com',
  'cymktopantone.com',
  'www.cymktopantone.com',
]);

export const GONE_PREFIXES = [
  '/pantone-color-match/challenge',
  '/pantone-color-match/classic',
  '/pantone-colors/',
  '/pantone/',
] as const;

export const GONE_EXACT = new Set(['/pantone-color-match/daily']);

const JUNK_PATH_SEGMENTS = new Set(['c-at_max', 'f-auto', 'q-85']);

const SCREEN_TO_PRESS = '/blog/the-complete-guide-to-managing-color-from-screen-to-press';

/** Legacy blog slugs that no longer exist — map to the closest trademark-safe guide. */
export const LEGACY_BLOG_REDIRECTS: Readonly<Record<string, string>> = {
  '/blog/canva-hex-pantone-match': '/convert-hex-to-cmyk',
  '/blog/cmyk-pantone-photoshop': SCREEN_TO_PRESS,
  '/blog/convert-cmyk-pantone': SCREEN_TO_PRESS,
  '/blog/figma-hex-to-pantone-print': SCREEN_TO_PRESS,
  '/blog/find-pantone-alternative': SCREEN_TO_PRESS,
  '/blog/illustrator-pantone-closest-match': SCREEN_TO_PRESS,
  '/blog/indesign-pantone-spot-color-pdf': '/blog/spot-color-process-color',
  '/blog/pantone-digital-branding': SCREEN_TO_PRESS,
  '/blog/photoshop-hex-to-pantone-match': '/convert-hex-to-cmyk',
  '/blog/c-at_max': '/blog',
  '/blog/f-auto': '/blog',
  '/blog/q-85': '/blog',
};

/** Static path redirects (also emitted for next.config.ts). */
export const STATIC_PATH_REDIRECTS: ReadonlyArray<{ source: string; destination: string }> = [
  { source: '/api/og', destination: '/images/og-default.png' },
  { source: '/privacy', destination: '/legal/privacy-policy' },
  { source: '/terms', destination: '/legal/terms-and-conditions' },
  { source: '/brand-palette-to-pantone', destination: '/print-gamut' },
  { source: '/convert-pantone-to-cmyk', destination: '/color-models/cmyk' },
  { source: '/convert-pantone-to-hex', destination: '/convert-hex-to-cmyk' },
  { source: '/convert-pantone-to-rgb', destination: '/convert-rgb-to-cmyk' },
  { source: '/convert-rgb-to-pantone-pms', destination: '/convert-rgb-to-cmyk' },
  { source: '/convert-cmyk-to-pantone-pms', destination: '/color-models/cmyk' },
  { source: '/convert-hex-to-pantone-pms', destination: '/convert-hex-to-cmyk' },
  { source: '/convert-hsl-to-pantone-pms', destination: '/convert-hsl-to-cmyk' },
  { source: '/convert-hsv-to-pantone-pms', destination: '/convert-hsv-to-cmyk' },
  { source: '/convert-pantone-pms-to-cmyk', destination: '/color-models/cmyk' },
  { source: '/convert-pantone-pms-to-hex', destination: '/convert-hex-to-cmyk' },
  { source: '/convert-pantone-pms-to-hsl', destination: '/convert-hsl-to-cmyk' },
  { source: '/convert-pantone-pms-to-hsv', destination: '/convert-hsv-to-cmyk' },
  { source: '/convert-pantone-pms-to-rgb', destination: '/convert-cmyk-to-rgb' },
  { source: '/pantone-color-match', destination: '/' },
  { source: '/pantone-color-match/', destination: '/' },
  { source: '/pantone-colors', destination: '/convert-color' },
  { source: '/pantone', destination: '/convert-color' },
  { source: '/color-models/test', destination: '/color-models' },
];

export type LegacyPathOutcome =
  | { kind: 'gone' }
  | { kind: 'redirect'; pathname: string }
  | { kind: 'same' };

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }
  const withoutTrailing = pathname.replace(/\/+$/, '');
  return withoutTrailing.length === 0 ? '/' : withoutTrailing;
}

export function isGonePath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (path === '/feed' || path.startsWith('/feed/')) {
    return true;
  }
  const segments = path.split('/').filter(Boolean);
  if (segments.some((segment) => JUNK_PATH_SEGMENTS.has(segment))) {
    return true;
  }
  if (GONE_EXACT.has(path)) {
    return true;
  }
  return GONE_PREFIXES.some((prefix) => path.startsWith(prefix));
}

function matchStaticRedirect(pathname: string): string | null {
  const path = normalizePathname(pathname);
  const exact = STATIC_PATH_REDIRECTS.find((rule) => rule.source === path);
  if (exact) {
    return exact.destination;
  }
  return null;
}

function matchHexToPantoneRedirect(pathname: string): string | null {
  const path = normalizePathname(pathname);
  if (path === '/convert-hex-to-pantone-pms') {
    return '/convert-hex-to-cmyk';
  }
  const hexMatch = path.match(/^\/convert-hex-to-pantone-pms\/([0-9a-fA-F]{3,8})$/);
  if (hexMatch) {
    return '/convert-hex-to-cmyk';
  }
  return null;
}

function matchBlogRedirect(pathname: string): string | null {
  const path = normalizePathname(pathname);
  return LEGACY_BLOG_REDIRECTS[path] ?? null;
}

/**
 * Resolves a legacy pathname to its final colormapper.xyz path, 410, or unchanged path.
 * Used by middleware (legacy hosts) and by redirect verification tooling.
 */
export function resolveLegacyPath(pathname: string): LegacyPathOutcome {
  const path = normalizePathname(pathname);

  if (isGonePath(path)) {
    return { kind: 'gone' };
  }

  const blog = matchBlogRedirect(path);
  if (blog) {
    return { kind: 'redirect', pathname: blog };
  }

  const hexPantone = matchHexToPantoneRedirect(path);
  if (hexPantone) {
    return { kind: 'redirect', pathname: hexPantone };
  }

  const staticRedirect = matchStaticRedirect(path);
  if (staticRedirect) {
    return { kind: 'redirect', pathname: staticRedirect };
  }

  return { kind: 'same' };
}

export function buildFinalColormapperUrl(pathname: string, search = ''): string {
  const resolved = resolveLegacyPath(pathname);
  const finalPath =
    resolved.kind === 'redirect'
      ? resolved.pathname
      : resolved.kind === 'same'
        ? normalizePathname(pathname)
        : pathname;
  const query = search.startsWith('?') ? search : search ? `?${search}` : '';
  return `https://${CANONICAL_SITE_HOST}${finalPath}${query}`;
}

export type ExpectedLegacyCheck =
  | { status: 410 }
  | { status: 308; finalUrl: string };

export function expectedLegacyCheck(pathname: string, search = ''): ExpectedLegacyCheck {
  const resolved = resolveLegacyPath(pathname);
  if (resolved.kind === 'gone') {
    return { status: 410 };
  }
  const finalPath =
    resolved.kind === 'redirect' ? resolved.pathname : normalizePathname(pathname);
  const query = search.startsWith('?') ? search : search ? `?${search}` : '';
  return {
    status: 308,
    finalUrl: `https://${CANONICAL_SITE_HOST}${finalPath}${query}`,
  };
}

export type ExpectedSiteCheck =
  | { status: 410 }
  | { status: 308; pathname: string }
  | { status: 200 };

/** Expected response when hitting colormapper.xyz (or a preview) directly — not via a legacy host. */
export function expectedSiteCheck(pathname: string): ExpectedSiteCheck {
  const resolved = resolveLegacyPath(pathname);
  if (resolved.kind === 'gone') {
    return { status: 410 };
  }
  if (resolved.kind === 'redirect') {
    return { status: 308, pathname: resolved.pathname };
  }
  return { status: 200 };
}

export type LegacyPathSummaryBucket = {
  gone: number;
  same: number;
  redirects: Record<string, number>;
};

export function summarizeLegacyPaths(paths: string[]): LegacyPathSummaryBucket {
  const summary: LegacyPathSummaryBucket = {
    gone: 0,
    same: 0,
    redirects: {},
  };

  for (const raw of paths) {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const pathname = trimmed.split('?')[0] ?? trimmed;
    const resolved = resolveLegacyPath(pathname);
    if (resolved.kind === 'gone') {
      summary.gone += 1;
    } else if (resolved.kind === 'same') {
      summary.same += 1;
    } else {
      summary.redirects[resolved.pathname] = (summary.redirects[resolved.pathname] ?? 0) + 1;
    }
  }

  return summary;
}

/** Redirect rules for next.config.ts — keep in sync via this module only. */
export function getNextConfigRedirects(): Redirect[] {
  const fromStatic: Redirect[] = STATIC_PATH_REDIRECTS.map((rule) => ({
    source: rule.source,
    destination: rule.destination,
    permanent: true,
  }));

  const hexPantone: Redirect = {
    source: '/convert-hex-to-pantone-pms/:hex',
    destination: '/convert-hex-to-cmyk',
    permanent: true,
  };

  const blogRedirects: Redirect[] = Object.entries(LEGACY_BLOG_REDIRECTS).map(
    ([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }),
  );

  return [...fromStatic, hexPantone, ...blogRedirects];
}
