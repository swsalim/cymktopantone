'use client';

import { useEffect, useState } from 'react';

import { CopyIcon } from 'lucide-react';

import {
  cmykToRgb,
  findMatchingPMSColors,
  formatRgbString,
  getTextColor,
  hexToRgb,
  rgbToHex,
} from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import { Container } from '@/components/container';
import RelatedTools from '@/components/related-tools';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Wrapper } from '@/components/wrapper';

const distances = ['16', '32', '48', '64', '80', '96'];

export default function CmykPantoneConverter() {
  const { toast } = useToast();

  const [cmyk, setCmyk] = useState({ c: 18, m: 17, y: 84, k: 0 });
  const [matchingColors, setMatchingColors] = useState<{ pantone: string; hex: string }[]>([]);
  const [distance, setDistance] = useState('32');

  const rgb = cmykToRgb(cmyk);
  const hex = rgbToHex(rgb);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'CMYK';
  const TARGET_COLOR = 'PANTONE';
  const { trackCopy } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
    `${cmyk.c},${cmyk.m},${cmyk.y},${cmyk.k}`,
  );

  const handleInputChange = (key: keyof typeof cmyk, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setCmyk((prev) => ({ ...prev, [key]: numValue }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Track copy event based on the label
      if (label === 'RGB value') {
        trackCopy('RGB');
      } else if (label === 'HEX value') {
        trackCopy('HEX');
      } else if (label === 'Pantone') {
        trackCopy('PANTONE');
      } else if (label === 'HEX') {
        trackCopy('HEX');
      }

      toast({
        description: `${label} copied!`,
        duration: 2000,
      });
    });
  };

  useEffect(() => {
    const tempMatchingColors = findMatchingPMSColors(hex.substring(1), Number(distance));
    setMatchingColors(tempMatchingColors);
  }, [cmyk, distance, hex]);

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Easily transform your CMYK values into Pantone perfection! Enter your CMYK values below
          and get instant, accurate results.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent>
              <div className="flex flex-col gap-y-6">
                {Object.entries({
                  Cyan: 'c',
                  Magenta: 'm',
                  Yellow: 'y',
                  'Black Key': 'k',
                }).map(([label, key]) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center justify-between">
                      <Label>{label}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={cmyk[key as keyof typeof cmyk]}
                          onChange={(e) =>
                            handleInputChange(key as keyof typeof cmyk, e.target.value)
                          }
                          className="w-20"
                          min={0}
                          max={100}
                        />
                        <span className="w-4 text-sm text-gray-500 dark:text-gray-100">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[cmyk[key as keyof typeof cmyk]]}
                      onValueChange={([value]) => setCmyk((prev) => ({ ...prev, [key]: value }))}
                      max={100}
                      step={1}
                      className="mt-2"
                      color={label.toLowerCase()}
                    />
                  </div>
                ))}
                <div>
                  <div className="mb-2">
                    <Label>Distance</Label>
                  </div>
                  <Select
                    defaultValue={distance}
                    value={distance}
                    onValueChange={(value) => setDistance(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {distances.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="mb-4">
                    <h2 className="mb-2 text-lg font-semibold">Color Preview</h2>
                    <div className="h-24 w-full rounded-lg" style={{ backgroundColor: hex }} />
                  </div>

                  <div className="flex flex-col gap-y-0.5 text-sm">
                    <div className="flex items-center justify-start gap-x-2">
                      <p>
                        <span className="font-medium">RGB:</span> <b>{rgbString}</b>
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(rgbString, 'RGB value')}>
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-start gap-x-2">
                      <p>
                        <span className="font-medium">HEX:</span> <b>{hex}</b>
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(hex, 'HEX value')}>
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">
                Closest Pantone {matchingColors.length > 1 ? 'Colors' : 'Color'}
              </h2>
            </CardHeader>
            <CardContent>
              {!matchingColors.length && (
                <p className="text-start text-base text-gray-500">No matching colors found</p>
              )}
              {matchingColors.length >= 1 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {matchingColors.map((color, index) => (
                    <div
                      key={index}
                      className="relative flex h-32 w-full flex-col justify-center rounded-lg p-2 md:h-40 md:py-4"
                      style={{
                        backgroundColor: formatRgbString(hexToRgb(color.hex)),
                        color: getTextColor(color.hex),
                      }}>
                      <div className="flex cursor-pointer flex-col items-center justify-between">
                        <div className="flex flex-row items-center justify-center gap-x-2">
                          <div className="text-center text-sm font-medium">{color.pantone}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(color.pantone, 'Pantone')}>
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-x-2">
                          <div className="text-center text-sm uppercase opacity-90">
                            #{color.hex}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(`#${color.hex}`, 'HEX')}>
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
