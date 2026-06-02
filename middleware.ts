import { NextRequest, NextResponse } from 'next/server';

import { GONE_RESPONSE_CACHE_CONTROL } from '@/lib/http-cache';

const GONE_PREFIXES = [
  '/pantone-color-match/challenge/',
  '/pantone-color-match/classic/',
  '/pantone-colors/',
  '/pantone/',
];
const GONE_EXACT = new Set(['/pantone-color-match/daily']);

const LEGACY_HOSTS = new Set(['rgbtocmyk.com', 'www.rgbtocmyk.com']);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? '';

  if (LEGACY_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.hostname = 'colormapper.xyz';
    url.port = '';
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  if (GONE_EXACT.has(pathname) || GONE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': GONE_RESPONSE_CACHE_CONTROL,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|manifest.webmanifest|robots.txt|sitemap.xml|sitemap-0.xml|ads.txt|yandex_.*\\.html).*)',
  ],
};
