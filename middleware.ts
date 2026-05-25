import { NextRequest, NextResponse } from 'next/server';

import { isMaintenanceMode, maintenanceHeaders } from '@/lib/maintenance';

function withMaintenanceHeaders(response: NextResponse): NextResponse {
  Object.entries(maintenanceHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function middleware(request: NextRequest) {
  if (!isMaintenanceMode()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === '/maintenance' || pathname === '/gone') {
    return withMaintenanceHeaders(NextResponse.next());
  }

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return withMaintenanceHeaders(NextResponse.rewrite(url));
  }

  const url = request.nextUrl.clone();
  url.pathname = '/gone';
  return withMaintenanceHeaders(NextResponse.rewrite(url, { status: 410 }));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|manifest.webmanifest|robots.txt|sitemap.xml|sitemap-0.xml|ads.txt|yandex_.*\\.html).*)',
  ],
};
