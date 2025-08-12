'use client';

import { useState } from 'react';

import { rgbToCmyk, rgbToHex } from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import { AddToHistoryButton } from '@/components/color-converters/shared/add-to-history-button';
import { ColorHistory } from '@/components/color-converters/shared/color-history';
import { ColorPreview } from '@/components/color-converters/shared/color-preview';
import { ColorValueDisplay } from '@/components/color-converters/shared/color-value-display';
import { Container } from '@/components/container';
import { useColorHistoryContext } from '@/components/dynamic-converter';
import RelatedTools from '@/components/related-tools';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Wrapper } from '@/components/wrapper';

export default function RgbCmykConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();

  const [rgb, setRgb] = useState({ r: 199, g: 63, b: 103 });
  const hex = rgbToHex(rgb);
  const cmyk = rgbToCmyk(rgb);
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'RGB';
  const TARGET_COLOR = 'CMYK';
  const { trackCopy, trackAddToHistory, trackSelectFromHistory } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
    `${rgb.r},${rgb.g},${rgb.b}`,
  );

  const handleInputChange = (key: keyof typeof rgb, value: string) => {
    const numValue = Math.min(255, Math.max(0, Number(value) || 0));
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

  const addToHistory = () => {
    // Track history addition
    trackAddToHistory();

    colorHistory.addToHistory({
      sourceColor: 'RGB',
      targetColor: 'CMYK',
      sourceValue: rgbString,
      targetValue: cmykString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    const rgbMatches = sourceValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatches) {
      const [, r, g, b] = rgbMatches;
      setRgb({
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b),
      });

      // Track selection from history
      trackSelectFromHistory();
      return;
    }
  };

  return (
    <Wrapper size="lg" className="pb-0 md:pb-0">
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
                          max={255}
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

              <ColorHistory history={colorHistory} onColorSelect={handleColorSelect} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <ColorPreview color={hex} />

              <div className="space-y-3">
                <ColorValueDisplay label="CMYK" value={cmykString} onCopy={copyToClipboard} />

                <AddToHistoryButton
                  onClick={addToHistory}
                  disabled={colorHistory.items.length >= 5}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
      <Container>
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
