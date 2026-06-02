import { NextRequest, NextResponse } from 'next/server';

const GONE_PREFIXES = [
  '/pantone-color-match/challenge/',
  '/pantone-color-match/classic/',
  '/pantone-colors/',
  '/pantone/',
];
const GONE_EXACT = new Set(['/pantone-color-match/daily']);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GONE_EXACT.has(pathname) || GONE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
        'Content-Type': 'text/plain; charset=utf-8',
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
