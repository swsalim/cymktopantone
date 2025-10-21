'use client';

import { useState } from 'react';

import { hslToRgb, rgbToHex } from '@/lib/colors';
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

export default function HslHexConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();

  const [hsl, setHsl] = useState({ h: 48, s: 100, l: 69 });

  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hexString = `${hex}`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HSL';
  const TARGET_COLOR = 'HEX';
  const { trackCopy, trackAddToHistory, trackSelectFromHistory } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
  );

  const handleInputChange = (key: keyof typeof hsl, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setHsl((prev) => ({ ...prev, [key]: numValue }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Track copy event
      trackCopy(TARGET_COLOR, text);

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
      sourceColor: 'HSL',
      targetColor: 'HEX',
      sourceValue: hslString,
      targetValue: hexString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    const hslMatches = sourceValue.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatches) {
      const [, h, s, l] = hslMatches;
      setHsl({
        h: parseInt(h),
        s: parseInt(s),
        l: parseInt(l),
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
          Easily transform your HSL values into HEX value! Enter your HSL values below and get
          instant, accurate results.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="sr-only">Enter HSL Value</h2>
            <CardContent>
              <div className="flex flex-col gap-y-6">
                {Object.entries({
                  Hue: 'h',
                  Saturation: 's',
                  Lightness: 'l',
                }).map(([label, key]) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between">
                      <Label>{label}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={hsl[key as keyof typeof hsl]}
                          onChange={(e) =>
                            handleInputChange(key as keyof typeof hsl, e.target.value)
                          }
                          className="w-20"
                          min={0}
                          max={label === 'Hue' ? 360 : 100}
                        />
                        {label !== 'Hue' && (
                          <span className="w-4 text-sm text-gray-500 dark:text-gray-100">%</span>
                        )}
                      </div>
                    </div>
                    <Slider
                      value={[hsl[key as keyof typeof hsl]]}
                      onValueChange={([value]) => setHsl((prev) => ({ ...prev, [key]: value }))}
                      max={label === 'Hue' ? 360 : 100}
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
                <ColorValueDisplay label="HSL" value={hslString} onCopy={copyToClipboard} />
                <ColorValueDisplay label="HEX" value={hexString} onCopy={copyToClipboard} />

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
