import { cmykToRgb, rgbToCmyk } from '@/lib/colors';
import { cmykToRgbAlt, rgbToCmykAlt, testCmykConversion } from '@/lib/colors-alternative';

import { Container } from '@/components/container';

export default function ColorModelsTestAltPage() {
  // Test with your original color
  const cmyk = { c: 18, m: 17, y: 84, k: 0 };

  // Original conversion
  const rgb = cmykToRgb(cmyk);
  const cmyk2 = rgbToCmyk(rgb);

  // Alternative conversion
  const rgbAlt = cmykToRgbAlt(cmyk);
  const cmykAlt = rgbToCmykAlt(rgbAlt);

  // Test conversion
  const testResult = testCmykConversion(cmyk);

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-bold">Original Conversion</h2>
          <div className="space-y-2">
            <p>Original CMYK: {JSON.stringify(cmyk)}</p>
            <p>RGB: {JSON.stringify(rgb)}</p>
            <p>Converted CMYK: {JSON.stringify(cmyk2)}</p>
            <p>Matches: {JSON.stringify(cmyk) === JSON.stringify(cmyk2) ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">Alternative Conversion</h2>
          <div className="space-y-2">
            <p>Original CMYK: {JSON.stringify(cmyk)}</p>
            <p>RGB: {JSON.stringify(rgbAlt)}</p>
            <p>Converted CMYK: {JSON.stringify(cmykAlt)}</p>
            <p>Matches: {JSON.stringify(cmyk) === JSON.stringify(cmykAlt) ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">Test Results</h2>
          <pre className="rounded bg-gray-100 p-4">{JSON.stringify(testResult, null, 2)}</pre>
        </div>
      </div>
    </Container>
  );
}
