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

import { expectedLegacyCheck } from '../lib/legacy-path-resolver';

function parseArgs(argv: string[]) {
  let baseUrl = '';
  let hostHeader = '';
  let limit = 0;
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--base-url') {
      baseUrl = argv[++i] ?? '';
    } else if (arg === '--host') {
      hostHeader = argv[++i] ?? '';
    } else if (arg === '--limit') {
      limit = Number(argv[++i] ?? '0');
    }
  }
  if (!baseUrl) {
    console.error('Missing --base-url');
    process.exit(1);
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ''), hostHeader, limit };
}

async function fetchManual(url: string, hostHeader: string) {
  const headers: Record<string, string> = {};
  if (hostHeader) {
    headers.host = hostHeader;
  }
  return fetch(url, { redirect: 'manual', headers });
}

async function checkPath(
  baseUrl: string,
  pathname: string,
  hostHeader: string,
): Promise<string | null> {
  const expected = expectedLegacyCheck(pathname);
  const requestUrl = `${baseUrl}${pathname}`;

  if (!hostHeader) {
    const first = await fetchManual(requestUrl, '');
    if (expected.status === 410) {
      if (first.status !== 410) {
        return `${pathname}: expected 410 on site, got ${first.status}`;
      }
      return null;
    }

    if (expected.status === 308) {
      if (first.status !== 308 && first.status !== 301 && first.status !== 307) {
        return `${pathname}: expected redirect on site, got ${first.status}`;
      }
      const location = first.headers.get('location');
      if (!location) {
        return `${pathname}: redirect missing Location`;
      }
      const resolvedLocation = new URL(location, baseUrl).href;
      if (resolvedLocation !== expected.finalUrl) {
        return `${pathname}: expected Location ${expected.finalUrl}, got ${resolvedLocation}`;
      }
      const final = await fetch(resolvedLocation, { redirect: 'manual' });
      if (final.status !== 200) {
        return `${pathname}: final ${resolvedLocation} returned ${final.status}`;
      }
      return null;
    }

    if (first.status !== 200) {
      return `${pathname}: expected 200 on site, got ${first.status}`;
    }
    return null;
  }

  const first = await fetchManual(requestUrl, hostHeader);

  if (expected.status === 410) {
    if (first.status !== 410) {
      return `${pathname}: expected 410, got ${first.status}`;
    }
    return null;
  }

  if (first.status !== 308 && first.status !== 301 && first.status !== 307) {
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
  const { baseUrl, hostHeader, limit } = parseArgs(process.argv);
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
    const err = await checkPath(baseUrl, pathname, hostHeader);
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
