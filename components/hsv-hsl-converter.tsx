'use client';

import { useState } from 'react';

import { CopyIcon } from 'lucide-react';

import { hsvToRgb, rgbToHex, rgbToHsl } from '@/lib/colors';
import { useToast } from '@/lib/hooks/use-toast';

import { AddToHistoryButton } from '@/components/add-to-history-button';
import { ColorHistory } from '@/components/color-history';
import { Container } from '@/components/container';
import { useColorHistoryContext } from '@/components/dynamic-converter';
import RelatedTools from '@/components/related-tools';
import { Button } from '@/components/ui/button';
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

  const handleInputChange = (key: keyof typeof hsv, value: string) => {
    const numValue = Math.min(key === 'h' ? 360 : 100, Math.max(0, Number(value) || 0));
    setHsv((prev) => ({ ...prev, [key]: numValue }));
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
              <div className="mb-4">
                <h2 className="mb-2 text-xl font-semibold">Color Preview</h2>
                <div className="h-24 w-full rounded-lg" style={{ backgroundColor: hex }} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p>
                    <span className="font-medium">HSL:</span>{' '}
                    <b>
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </b>
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL value')
                    }>
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>

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
