import { NextRequest, NextResponse } from 'next/server';

import { GONE_RESPONSE_CACHE_CONTROL } from '@/lib/http-cache';
import {
  CANONICAL_SITE_HOST,
  isGonePath,
  LEGACY_HOSTS,
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

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? '';
  const { pathname } = request.nextUrl;

  if (LEGACY_HOSTS.has(host)) {
    const resolved = resolveLegacyPath(pathname);
    if (resolved.kind === 'gone') {
      return goneResponse();
    }

    const url = request.nextUrl.clone();
    url.hostname = CANONICAL_SITE_HOST;
    url.port = '';
    url.protocol = 'https';
    if (resolved.kind === 'redirect') {
      url.pathname = resolved.pathname;
    }
    return NextResponse.redirect(url, 308);
  }

  const colorPath = pathname.match(/^\/color\/([0-9a-fA-F]{6})\/?$/);
  if (colorPath) {
    const hex = colorPath[1];
    if (hex !== hex.toUpperCase() || pathname.endsWith('/')) {
      const url = request.nextUrl.clone();
      url.pathname = `/color/${hex.toUpperCase()}`;
      return NextResponse.redirect(url, 308);
    }
  }

  if (isGonePath(pathname)) {
    return goneResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|manifest.webmanifest|robots.txt|sitemap.xml|sitemap-0.xml|ads.txt|yandex_.*\\.html).*)',
  ],
};
