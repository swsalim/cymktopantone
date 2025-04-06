'use client';

import { useState } from 'react';

import { hsvToRgb, rgbToHex, rgbToHsl } from '@/lib/colors';
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

export default function HsvHSLConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();

  const [hsv, setHsv] = useState({ h: 199, s: 68, v: 38 });

  const rgb = hsvToRgb(hsv);
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const hsvString = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HSV';
  const TARGET_COLOR = 'HSL';
  const { trackCopy, trackAddToHistory, trackSelectFromHistory } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
    `${hsv.h},${hsv.s},${hsv.v}`,
  );

  const handleInputChange = (key: keyof typeof hsv, value: string) => {
    const numValue = Math.min(key === 'h' ? 360 : 100, Math.max(0, Number(value) || 0));
    setHsv((prev) => ({ ...prev, [key]: numValue }));
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
      sourceColor: 'HSV',
      targetColor: 'HSL',
      sourceValue: hsvString,
      targetValue: hslString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    const hsvMatches = sourceValue.match(/hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hsvMatches) {
      const [, h, s, v] = hsvMatches;
      setHsv({
        h: parseInt(h),
        s: parseInt(s),
        v: parseInt(v),
      });

      // Track selection from history
      trackSelectFromHistory();
      return;
    }
  };

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Easily transform your HSV values into HSL values! Enter your HSV values below and get
          instant, accurate results.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent>
              <div className="flex flex-col gap-y-6">
                {Object.entries({
                  Hue: 'h',
                  Saturation: 's',
                  Brightness: 'v',
                }).map(([label, key]) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between">
                      <Label>{label}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={hsv[key as keyof typeof hsv]}
                          onChange={(e) =>
                            handleInputChange(key as keyof typeof hsv, e.target.value)
                          }
                          className="w-20"
                          min={0}
                          max={key === 'h' ? 360 : 100}
                        />
                      </div>
                    </div>
                    <Slider
                      value={[hsv[key as keyof typeof hsv]]}
                      onValueChange={([value]) => setHsv((prev) => ({ ...prev, [key]: value }))}
                      max={key === 'h' ? 360 : 100}
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
                <ColorValueDisplay label="HSV" value={hsvString} onCopy={copyToClipboard} />
                <ColorValueDisplay label="HSL" value={hslString} onCopy={copyToClipboard} />

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
