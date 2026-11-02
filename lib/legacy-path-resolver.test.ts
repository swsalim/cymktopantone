import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

import {
  expectedLegacyCheck,
  resolveLegacyPath,
  summarizeLegacyPaths,
} from './legacy-path-resolver';

describe('resolveLegacyPath', () => {
  it('returns gone for Pantone detail paths', () => {
    assert.deepEqual(resolveLegacyPath('/pantone/1775-c'), { kind: 'gone' });
    assert.deepEqual(resolveLegacyPath('/pantone-colors/pantone-white-c'), { kind: 'gone' });
  });

  it('does not redirect removed Pantone URLs to colormapper first', () => {
    assert.deepEqual(expectedLegacyCheck('/pantone/1775-c'), { status: 410 });
  });

  it('redirects Pantone converter paths to print-relevant CMYK destinations in one hop', () => {
    assert.deepEqual(resolveLegacyPath('/convert-cmyk-to-pantone-pms'), {
      kind: 'redirect',
      pathname: '/color-models/cmyk',
    });
    assert.deepEqual(resolveLegacyPath('/convert-pantone-pms-to-cmyk'), {
      kind: 'redirect',
      pathname: '/color-models/cmyk',
    });
    assert.deepEqual(resolveLegacyPath('/convert-hex-to-pantone-pms/0000ff'), {
      kind: 'redirect',
      pathname: '/convert-hex-to-cmyk',
    });
  });

  it('redirects legacy Pantone blog slugs to safe guides', () => {
    assert.deepEqual(resolveLegacyPath('/blog/convert-cmyk-pantone'), {
      kind: 'redirect',
      pathname: '/blog/the-complete-guide-to-managing-color-from-screen-to-press',
    });
    assert.deepEqual(resolveLegacyPath('/blog/spot-color-process-color'), { kind: 'same' });
  });

  it('passes through ordinary tool paths unchanged', () => {
    assert.deepEqual(resolveLegacyPath('/convert-cmyk-to-hex'), { kind: 'same' });
    assert.deepEqual(expectedLegacyCheck('/convert-cmyk-to-hex'), {
      status: 308,
      finalUrl: 'https://colormapper.xyz/convert-cmyk-to-hex',
    });
  });

  it('maps hub paths that are not 410', () => {
    assert.deepEqual(resolveLegacyPath('/pantone-colors'), {
      kind: 'redirect',
      pathname: '/convert-color',
    });
  });
});

describe('summarizeLegacyPaths fixture', () => {
  it('classifies every line in data/legacy-old-paths.txt', () => {
    const fixture = readFileSync(join(process.cwd(), 'data/legacy-old-paths.txt'), 'utf8');
    const lines = fixture.split('\n').filter((line) => line.trim().length > 0);
    const summary = summarizeLegacyPaths(lines);
    const redirectTotal = Object.values(summary.redirects).reduce((a, b) => a + b, 0);
    assert.equal(summary.gone + summary.same + redirectTotal, lines.length);
  });
});
