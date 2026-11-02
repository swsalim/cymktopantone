#!/usr/bin/env tsx
/**
 * HTTP verification for legacy paths against a deployed base URL.
 *
 * Usage:
 *   tsx scripts/check-legacy-redirects.ts --base-url https://colormapper.xyz
 *   tsx scripts/check-legacy-redirects.ts --base-url https://<preview>.vercel.app --host cmyktopantone.com
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  expectedLegacyCheck,
  expectedSiteCheck,
  normalizePathname,
} from '../lib/legacy-path-resolver';

function parseArgs(argv: string[]) {
  let baseUrl = '';
  let hostHeader = '';
  let limit = 0;
  let cookieJar = '';
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--base-url') {
      baseUrl = argv[++i] ?? '';
    } else if (arg === '--host') {
      hostHeader = argv[++i] ?? '';
    } else if (arg === '--limit') {
      limit = Number(argv[++i] ?? '0');
    } else if (arg === '--cookie-jar') {
      cookieJar = argv[++i] ?? '';
    }
  }
  if (!baseUrl) {
    console.error('Missing --base-url');
    process.exit(1);
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ''), hostHeader, limit, cookieJar };
}

function readCookieHeader(jarPath: string): string | undefined {
  if (!jarPath) {
    return undefined;
  }
  try {
    const raw = readFileSync(jarPath, 'utf8');
    const cookies = raw
      .split('\n')
      .flatMap((line) => {
        if (!line) {
          return [];
        }
        if (line.startsWith('#') && !line.startsWith('#HttpOnly_')) {
          return [];
        }
        const normalized = line.startsWith('#HttpOnly_') ? line.slice('#HttpOnly_'.length) : line;
        return [normalized];
      })
      .map((line) => line.split('\t'))
      .filter((parts) => parts.length >= 7)
      .map((parts) => `${parts[5]}=${parts[6]}`)
      .join('; ');
    return cookies || undefined;
  } catch {
    return undefined;
  }
}

const REDIRECT_STATUSES = new Set([301, 302, 307, 308]);

async function fetchManual(url: string, hostHeader: string, cookieHeader?: string) {
  const headers: Record<string, string> = {};
  if (hostHeader) {
    headers.host = hostHeader;
  }
  if (cookieHeader) {
    headers.cookie = cookieHeader;
  }
  return fetch(url, { redirect: 'manual', headers });
}

async function checkPath(
  baseUrl: string,
  pathname: string,
  hostHeader: string,
  cookieHeader?: string,
): Promise<string | null> {
  let requestUrl = `${baseUrl}${pathname}`;

  if (!hostHeader) {
    let expected = expectedSiteCheck(pathname);
    let first = await fetchManual(requestUrl, '', cookieHeader);

    if (
      pathname.endsWith('/') &&
      pathname.length > 1 &&
      REDIRECT_STATUSES.has(first.status) &&
      expected.status === 410
    ) {
      const location = first.headers.get('location');
      if (location) {
        const stripped = new URL(location, baseUrl).pathname;
        if (normalizePathname(pathname) === normalizePathname(stripped)) {
          requestUrl = `${baseUrl}${stripped}`;
          expected = expectedSiteCheck(stripped);
          first = await fetchManual(requestUrl, '', cookieHeader);
        }
      }
    }

    if (expected.status === 410) {
      if (first.status !== 410) {
        return `${pathname}: expected 410 on site, got ${first.status}`;
      }
      return null;
    }

    if (expected.status === 308) {
      if (!REDIRECT_STATUSES.has(first.status)) {
        return `${pathname}: expected redirect on site, got ${first.status}`;
      }
      let location = first.headers.get('location');
      if (!location) {
        return `${pathname}: redirect missing Location`;
      }
      let resolvedLocation = new URL(location, baseUrl);
      if (
        pathname.endsWith('/') &&
        pathname.length > 1 &&
        resolvedLocation.pathname === normalizePathname(pathname)
      ) {
        const second = await fetchManual(`${baseUrl}${resolvedLocation.pathname}`, '', cookieHeader);
        if (!REDIRECT_STATUSES.has(second.status)) {
          return `${pathname}: expected second redirect after trailing slash, got ${second.status}`;
        }
        location = second.headers.get('location');
        if (!location) {
          return `${pathname}: second redirect missing Location`;
        }
        resolvedLocation = new URL(location, baseUrl);
      }
      if (resolvedLocation.pathname !== expected.pathname) {
        return `${pathname}: expected path ${expected.pathname}, got ${resolvedLocation.pathname}`;
      }
      const final = await fetch(resolvedLocation.href, {
        redirect: 'manual',
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      });
      if (final.status !== 200) {
        return `${pathname}: final ${resolvedLocation.href} returned ${final.status}`;
      }
      return null;
    }

    if (first.status !== 200) {
      return `${pathname}: expected 200 on site, got ${first.status}`;
    }
    return null;
  }

  const expected = expectedLegacyCheck(pathname);
  const first = await fetchManual(requestUrl, hostHeader, cookieHeader);

  if (expected.status === 410) {
    if (first.status !== 410) {
      return `${pathname}: expected 410, got ${first.status}`;
    }
    return null;
  }

  if (!REDIRECT_STATUSES.has(first.status)) {
    return `${pathname}: expected redirect, got ${first.status}`;
  }

  const location = first.headers.get('location');
  if (!location) {
    return `${pathname}: redirect missing Location header`;
  }

  const resolvedLocation = new URL(location, baseUrl).href;
  if (resolvedLocation !== expected.finalUrl) {
    return `${pathname}: expected Location ${expected.finalUrl}, got ${resolvedLocation}`;
  }

  const final = await fetch(resolvedLocation, { redirect: 'manual' });
  if (final.status !== 200) {
    return `${pathname}: final URL ${resolvedLocation} returned ${final.status}`;
  }

  return null;
}

async function main() {
  const { baseUrl, hostHeader, limit, cookieJar } = parseArgs(process.argv);
  const cookieHeader = readCookieHeader(cookieJar);
  const fixture = readFileSync(join(process.cwd(), 'data/legacy-old-paths.txt'), 'utf8');
  let paths = fixture
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (limit > 0) {
    paths = paths.slice(0, limit);
  }

  const failures: string[] = [];
  for (const pathname of paths) {
    const err = await checkPath(baseUrl, pathname, hostHeader, cookieHeader);
    if (err) {
      failures.push(err);
    }
  }

  if (failures.length > 0) {
    console.error(`Failed ${failures.length}/${paths.length} paths:`);
    for (const line of failures.slice(0, 50)) {
      console.error(line);
    }
    if (failures.length > 50) {
      console.error(`… and ${failures.length - 50} more`);
    }
    process.exit(1);
  }

  console.log(
    `OK: ${paths.length} paths — base ${baseUrl}${hostHeader ? ` (Host: ${hostHeader})` : ''}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
