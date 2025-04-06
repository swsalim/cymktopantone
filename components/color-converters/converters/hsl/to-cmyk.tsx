'use client';

import { useState } from 'react';

import { hslToRgb, rgbToCmyk, rgbToHex } from '@/lib/colors';
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

export default function HslCmykConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();

  const [hsl, setHsl] = useState({ h: 210, s: 100, l: 69 });

  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);
  const cmyk = rgbToCmyk(rgb);
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  const handleInputChange = (key: keyof typeof hsl, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setHsl((prev) => ({ ...prev, [key]: numValue }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: `${label} copied!`,
        duration: 2000,
      });
    });
  };

  const addToHistory = () => {
    colorHistory.addToHistory({
      sourceColor: 'HSL',
      targetColor: 'CMYK',
      sourceValue: hslString,
      targetValue: cmykString,
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
      return;
    }
  };

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Easily transform your HSL values into CMYK value! Enter your HSL values below and get
          instant, accurate results.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
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
      <Container className="flex flex-col items-start gap-4 py-8 md:flex-row md:items-start">
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
