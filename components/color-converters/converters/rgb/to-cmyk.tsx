'use client';

import { useState } from 'react';

import { rgbToCmyk, rgbToHex } from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import { ColorPreview } from '@/components/color-converters/shared/color-preview';
import { ColorValueDisplay } from '@/components/color-converters/shared/color-value-display';
import { Container } from '@/components/container';
import RelatedTools from '@/components/related-tools';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Wrapper } from '@/components/wrapper';

export default function RgbCmykConverter() {
  const { toast } = useToast();

  const [rgb, setRgb] = useState({ r: 199, g: 63, b: 103 });
  const hex = rgbToHex(rgb);
  const cmyk = rgbToCmyk(rgb);
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'RGB';
  const TARGET_COLOR = 'CMYK';
  const { trackCopy } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
    `${rgb.r},${rgb.g},${rgb.b}`,
  );

  const handleInputChange = (key: keyof typeof rgb, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setRgb((prev) => ({ ...prev, [key]: numValue }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Track copy event
      trackCopy(TARGET_COLOR);

      toast({
        description: `${label} copied!`,
        duration: 2000,
      });
    });
  };

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Easily transform your RGB values into CMYK value! Enter your HSL values below and get
          instant, accurate results.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent>
              <div className="flex flex-col gap-y-6">
                {Object.entries({
                  Red: 'r',
                  Green: 'g',
                  Blue: 'b',
                }).map(([label, key]) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between">
                      <Label>{label}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={rgb[key as keyof typeof rgb]}
                          onChange={(e) =>
                            handleInputChange(key as keyof typeof rgb, e.target.value)
                          }
                          className="w-20"
                          min={0}
                          max={100}
                        />
                      </div>
                    </div>
                    <Slider
                      value={[rgb[key as keyof typeof rgb]]}
                      onValueChange={([value]) => setRgb((prev) => ({ ...prev, [key]: value }))}
                      max={255}
                      step={1}
                      className="mt-2"
                      color={label.toLowerCase()}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <ColorPreview color={hex} />

              <div className="space-y-3">
                {/* TODO: Add history */}
                <ColorValueDisplay label="CMYK" value={cmykString} onCopy={copyToClipboard} />
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
      <Container className="flex flex-col items-start gap-4 py-8 md:flex-row md:items-start">
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
