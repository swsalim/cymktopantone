import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  distanceBand,
  nearestSpotColors,
  SPOT_GRID,
  SPOT_REFERENCE_SET,
  SPOT_SET_COUNT,
  SPOT_SET_EXAMPLE_CODE,
} from './spot-set';

describe('spot reference set', () => {
  it('fixes the entry count and keeps codes unique', () => {
    const codes = SPOT_REFERENCE_SET.map((entry) => entry.code);
    assert.equal(SPOT_SET_COUNT, codes.length);
    assert.equal(new Set(codes).size, codes.length);
    assert.ok(SPOT_SET_COUNT > SPOT_GRID.neutralCount);
  });

  it('uses systematic codes and stays inside sRGB', () => {
    assert.equal(SPOT_SET_EXAMPLE_CODE, 'CMS-H210-L74-C12');
    assert.ok(SPOT_REFERENCE_SET.some((entry) => entry.code === SPOT_SET_EXAMPLE_CODE));
    for (const entry of SPOT_REFERENCE_SET) {
      assert.match(entry.code, /^CMS-(H\d+|N\d+)-L\d+-C\d+$/);
      assert.doesNotMatch(entry.code, /pantone|pms/i);
      assert.match(entry.hex, /^#[0-9A-F]{6}$/);
      assert.ok(entry.rgb.r >= 0 && entry.rgb.r <= 255);
      assert.ok(entry.rgb.g >= 0 && entry.rgb.g <= 255);
      assert.ok(entry.rgb.b >= 0 && entry.rgb.b <= 255);
    }
    assert.equal(
      SPOT_REFERENCE_SET.filter((entry) => entry.code.startsWith('CMS-N')).length,
      SPOT_GRID.neutralCount,
    );
  });

  it('keeps the published grid parameters', () => {
    assert.equal(SPOT_GRID.hueCount, 36);
    assert.equal(SPOT_GRID.hueStep, 10);
    assert.equal(SPOT_GRID.lightnessMin, 0.25);
    assert.equal(SPOT_GRID.lightnessMax, 0.93);
    assert.equal(SPOT_GRID.lightnessSteps, 8);
    assert.equal(SPOT_GRID.chromaMin, 0.04);
    assert.equal(SPOT_GRID.chromaMax, 0.2);
    assert.equal(SPOT_GRID.chromaSteps, 5);
    assert.equal(SPOT_SET_COUNT, 799);
  });

  it('ranks a finite nearest list and labels distance bands', () => {
    const nearest = nearestSpotColors({ r: 124, g: 58, b: 237 });
    assert.ok(nearest.length >= 3 && nearest.length <= 6);
    for (let index = 1; index < nearest.length; index += 1) {
      assert.ok(nearest[index - 1].deltaE <= nearest[index].deltaE);
    }
    assert.equal(distanceBand(0), 'Very close');
    assert.equal(distanceBand(1.99), 'Very close');
    assert.equal(distanceBand(2), 'Close');
    assert.equal(distanceBand(4.99), 'Close');
    assert.equal(distanceBand(5), 'Noticeable');
    assert.equal(distanceBand(9.99), 'Noticeable');
    assert.equal(distanceBand(10), 'Far');
  });
});
