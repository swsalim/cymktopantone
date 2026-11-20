import { NextRequest, NextResponse } from 'next/server';

import { GONE_RESPONSE_CACHE_CONTROL } from '@/lib/http-cache';
import {
  CANONICAL_SITE_HOST,
  isGonePath,
  LEGACY_HOSTS,
  normalizePathname,
  resolveLegacyPath,
} from '@/lib/legacy-path-resolver';

function goneResponse(): NextResponse {
  return new NextResponse('Gone', {
    status: 410,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': GONE_RESPONSE_CACHE_CONTROL,
    },
  });
}

function finalPathFor(pathname: string): string {
  const resolved = resolveLegacyPath(pathname);
  if (resolved.kind === 'redirect') {
    return resolved.pathname;
  }
  const colorPath = pathname.match(/^\/color\/([0-9a-fA-F]{6})\/?$/);
  if (colorPath) {
    return `/color/${colorPath[1].toUpperCase()}`;
  }
  return normalizePathname(pathname);
}

/**
 * Build the redirect with a plain URL. NextURL keeps the request's trailing-slash
 * flag and will put the slash back on `pathname` when the response is formatted.
 */
function redirectTo(request: NextRequest, pathname: string, legacyHost: boolean): NextResponse {
  const destination = legacyHost
    ? new URL(`https://${CANONICAL_SITE_HOST}${pathname}`)
    : new URL(request.url);
  if (!legacyHost) {
    destination.pathname = pathname;
  }
  destination.search = request.nextUrl.search;
  return NextResponse.redirect(destination, 308);
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? '';
  const { pathname } = request.nextUrl;

  if (isGonePath(pathname)) {
    return goneResponse();
  }

  const nextPath = finalPathFor(pathname);

  if (LEGACY_HOSTS.has(host)) {
    return redirectTo(request, nextPath, true);
  }

  if (nextPath !== pathname) {
    return redirectTo(request, nextPath, false);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|manifest.webmanifest|robots.txt|sitemap.xml|sitemap-0.xml|ads.txt|yandex_.*\\.html).*)',
  ],
};
