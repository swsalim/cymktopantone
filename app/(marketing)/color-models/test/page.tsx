import { hexToRgb, rgbToCmyk, rgbToHsv } from '@/lib/colors';
import { cmykToRgb } from '@/lib/colors';
import { rgbToHsl } from '@/lib/colors';
import { rgbToHex } from '@/lib/colors';

import { Container } from '@/components/container';

export default function ColorModelsTestPage() {
  const cmyk = { c: 18, m: 17, y: 84, k: 0 };
  const rgb = cmykToRgb(cmyk);
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);

  const hex2 = '#D1D429';
  const rgb2 = hexToRgb(hex2);
  const hsl2 = rgbToHsl(rgb2);
  const hsv2 = rgbToHsv(rgb2);
  const cmyk2 = rgbToCmyk(rgb2);

  return (
    <Container>
      <div>
        <h1>Color Models Test</h1>
        <p>
          {cmyk.c}, {cmyk.m}, {cmyk.y}, {cmyk.k}
        </p>
        <p>
          {rgb.r}, {rgb.g}, {rgb.b}
        </p>
        <p>{hex}</p>
        <p>
          {hsl.h}, {hsl.s}, {hsl.l}
        </p>
        <p>
          {hsv.h}, {hsv.s}, {hsv.v}
        </p>
      </div>
      <div>
        <h1>Color Models Test</h1>
        <p>
          {cmyk2.c}, {cmyk2.m}, {cmyk2.y}, {cmyk2.k}
        </p>
        <p>
          {rgb2.r}, {rgb2.g}, {rgb2.b}
        </p>
        <p>{hex2}</p>
        <p>
          {hsl2.h}, {hsl2.s}, {hsl2.l}
        </p>
        <p>
          {hsv2.h}, {hsv2.s}, {hsv2.v}
        </p>
      </div>
    </Container>
  );
}
