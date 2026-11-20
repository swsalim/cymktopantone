#!/usr/bin/env tsx
/**
 * HTTP verification for legacy paths against a deployed base URL.
 *
 * Usage:
 *   tsx scripts/check-legacy-redirects.ts --base-url https://colormapper.xyz
 *   tsx scripts/check-legacy-redirects.ts --base-url https://<preview>.vercel.app --host cmyktopantone.com
 */
import { readFileSync } from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import { join } from 'node:path';

import {
  CANONICAL_SITE_HOST,
  expectedLegacyCheck,
  normalizePathname,
  resolveLegacyPath,
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

/**
 * `fetch` drops the Host header (it is a forbidden header name), so a --host
 * check would silently hit the base host. Node's HTTP client sends Host as set.
 */
function fetchManual(
  url: string,
  hostHeader: string,
  cookieHeader?: string,
): Promise<{ status: number; headers: { get(name: string): string | null } }> {
  const parsed = new URL(url);
  const lib = parsed.protocol === 'https:' ? https : http;
  const headers: Record<string, string> = {};
  if (hostHeader) {
    headers.Host = hostHeader;
  }
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || undefined,
        path: `${parsed.pathname}${parsed.search}`,
        method: 'GET',
        headers,
      },
      (res) => {
        res.resume();
        resolve({
          status: res.statusCode ?? 0,
          headers: {
            get(name: string) {
              const value = res.headers[name.toLowerCase()];
              if (Array.isArray(value)) {
                return value[0] ?? null;
              }
              return value ?? null;
            },
          },
        });
      },
    );
    req.on('error', reject);
    req.end();
  });
}

type Hop = { code: number; url: string; location: string | null };

function expectedFinalPath(pathname: string): string | 'gone' {
  const resolved = resolveLegacyPath(pathname);
  if (resolved.kind === 'gone') return 'gone';
  if (resolved.kind === 'redirect') return resolved.pathname;
  const colorPath = pathname.match(/^\/color\/([0-9a-fA-F]{6})\/?$/);
  if (colorPath) return `/color/${colorPath[1].toUpperCase()}`;
  return normalizePathname(pathname);
}

async function checkPath(
  baseUrl: string,
  pathname: string,
  hostHeader: string,
  cookieHeader?: string,
): Promise<string | null> {
  const hops: Hop[] = [];
  let requestUrl = `${baseUrl}${pathname}`;
  let host = hostHeader;

  for (let step = 0; step < 6; step += 1) {
    const response = await fetchManual(requestUrl, host, cookieHeader);
    const location = response.headers.get('location');
    hops.push({ code: response.status, url: requestUrl, location });
    if (!REDIRECT_STATUSES.has(response.status)) break;
    if (!location) {
      return `${pathname}: redirect missing Location (hops=${hops.length})`;
    }
    const next = new URL(location, requestUrl);
    requestUrl = `${baseUrl}${next.pathname}${next.search}`;
    host = '';
  }

  const redirectHops = hops.filter((hop) => REDIRECT_STATUSES.has(hop.code)).length;
  const final = hops[hops.length - 1];
  const trace = hops.map((hop) => `${hop.code} ${hop.url}`).join(' -> ');

  if (redirectHops > 1) {
    return `${pathname}: hops=${redirectHops} (max 1) ${trace}`;
  }

  const expectedPath = expectedFinalPath(pathname);
  if (expectedPath === 'gone') {
    if (final.code !== 410 || redirectHops !== 0) {
      return `${pathname}: expected direct 410, hops=${redirectHops} final=${final.code} ${trace}`;
    }
    return null;
  }

  if (hostHeader) {
    const expected = expectedLegacyCheck(pathname);
    if (expected.status === 410) {
      return `${pathname}: resolver expected 410 but path check did not`;
    }
    const location = hops[0]?.location;
    if (!location) return `${pathname}: missing Location`;
    const resolved = new URL(location, `${baseUrl}${pathname}`).href;
    if (resolved !== expected.finalUrl) {
      return `${pathname}: expected Location ${expected.finalUrl}, got ${resolved}`;
    }
  } else if (redirectHops === 1) {
    const location = hops[0]?.location;
    if (!location) return `${pathname}: missing Location`;
    const resolvedPath = new URL(location, baseUrl).pathname;
    if (resolvedPath !== expectedPath) {
      return `${pathname}: expected path ${expectedPath}, got ${resolvedPath}`;
    }
  } else if (normalizePathname(pathname) !== pathname && pathname !== '/') {
    return `${pathname}: expected one redirect to ${expectedPath}, got ${final.code}`;
  }

  if (final.code !== 200) {
    return `${pathname}: hops=${redirectHops} final=${final.code} ${trace}`;
  }
  if (hostHeader && !hops[0]?.location?.includes(CANONICAL_SITE_HOST)) {
    return `${pathname}: legacy Location did not use ${CANONICAL_SITE_HOST}`;
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
    `OK: ${paths.length} paths, no chain over 1 hop — base ${baseUrl}${hostHeader ? ` (Host: ${hostHeader})` : ''}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
