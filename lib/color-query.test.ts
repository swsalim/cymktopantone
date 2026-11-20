import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  channelsFromHex,
  decodeColorSearch,
  encodeColorSearch,
  hexFromChannels,
  syncChannels,
} from './color-query';

describe('color query encode and decode', () => {
  it('round-trips an RGB query', () => {
    const encoded = encodeColorSearch('rgb', { r: '255', g: '0', b: '0' });
    assert.equal(encoded, 'rgb=255,0,0');
    assert.deepEqual(decodeColorSearch(`?${encoded}`), {
      mode: 'rgb',
      channels: { r: '255', g: '0', b: '0' },
    });
  });

  it('round-trips HEX, HSL, HSV and CMYK queries', () => {
    assert.equal(encodeColorSearch('hex', { hex: '#7c3aed' }), 'hex=7C3AED');
    assert.deepEqual(decodeColorSearch('hex=7C3AED')?.channels, { hex: '#7C3AED' });

    const hsl = encodeColorSearch('hsl', { h: '210', s: '50', l: '40' });
    assert.equal(hsl, 'hsl=210,50,40');
    assert.deepEqual(decodeColorSearch(hsl ?? '')?.mode, 'hsl');

    const hsv = encodeColorSearch('hsv', { h: '20', s: '80', v: '90' });
    assert.match(hsv ?? '', /^hsv=\d+,\d+,\d+$/);
    assert.equal(decodeColorSearch('hsv=360,0,100')?.channels.h, '360');

    const cmyk = encodeColorSearch('cmyk', { c: '0', m: '100', y: '100', k: '0' });
    assert.equal(cmyk, 'cmyk=0,100,100,0');
    assert.equal(decodeColorSearch('cmyk=0,100,100,0')?.mode, 'cmyk');
  });

  it('rejects partial and out-of-range values', () => {
    assert.equal(encodeColorSearch('rgb', { r: '12', g: '', b: '3' }), null);
    assert.equal(decodeColorSearch('rgb=256,0,0'), null);
    assert.equal(decodeColorSearch('hex=zzzzzz'), null);
    assert.equal(decodeColorSearch(''), null);
  });
});

describe('color channel sync', () => {
  it('keeps picker, text and sliders on the same HEX', () => {
    const fromPicker = channelsFromHex('rgb', '#00ff00');
    assert.deepEqual(fromPicker, { r: '0', g: '255', b: '0' });
    assert.equal(hexFromChannels('rgb', fromPicker ?? {}), '#00FF00');
    assert.deepEqual(syncChannels('rgb', { r: '0', g: '255', b: '0' }), fromPicker);
  });

  it('maps pure red into RGB, HSL, HSV and HEX and back', () => {
    for (const mode of ['rgb', 'hsl', 'hsv', 'hex'] as const) {
      const channels = channelsFromHex(mode, '#FF0000');
      assert.ok(channels);
      assert.equal(hexFromChannels(mode, channels), '#FF0000');
      assert.deepEqual(syncChannels(mode, channels), channels);
    }
  });

  it('settles HSL and HSV after one integer round trip', () => {
    for (const mode of ['hsl', 'hsv'] as const) {
      const channels = channelsFromHex(mode, '#7C3AED');
      assert.ok(channels);
      const hex = hexFromChannels(mode, channels);
      assert.ok(hex);
      const settled = channelsFromHex(mode, hex);
      assert.deepEqual(syncChannels(mode, channels), settled);
      assert.equal(hexFromChannels(mode, settled ?? {}), hex);
    }
  });

  it('keeps a CMYK conversion stable after one pass through RGB', () => {
    const channels = channelsFromHex('cmyk', '#7C3AED');
    assert.ok(channels);
    const hex = hexFromChannels('cmyk', channels);
    assert.ok(hex);
    const settled = channelsFromHex('cmyk', hex);
    assert.deepEqual(syncChannels('cmyk', channels), settled);
    assert.equal(hexFromChannels('cmyk', settled ?? {}), hex);
  });

  it('treats HSV hue 360 as the same screen color as hue 0', () => {
    assert.equal(hexFromChannels('hsv', { h: '360', s: '0', v: '100' }), '#FFFFFF');
    assert.equal(hexFromChannels('hsv', { h: '0', s: '0', v: '100' }), '#FFFFFF');
  });
});
