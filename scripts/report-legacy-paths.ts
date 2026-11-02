#!/usr/bin/env tsx
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { summarizeLegacyPaths } from '../lib/legacy-path-resolver';

const fixture = readFileSync(join(process.cwd(), 'data/legacy-old-paths.txt'), 'utf8');
const lines = fixture.split('\n').filter((line) => line.trim().length > 0);
const summary = summarizeLegacyPaths(lines);

console.log('Legacy path resolver outcomes for data/legacy-old-paths.txt');
console.log(`Total paths: ${lines.length}`);
console.log(`410 Gone: ${summary.gone}`);
console.log(`308 same path on colormapper.xyz: ${summary.same}`);
console.log('308 redirect targets:');
const sorted = Object.entries(summary.redirects).sort((a, b) => b[1] - a[1]);
for (const [dest, count] of sorted) {
  console.log(`  ${count}\t→ ${dest}`);
}
