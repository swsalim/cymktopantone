'use client';

import { useEffect, useState } from 'react';

import { CopyIcon } from 'lucide-react';

import {
  findMatchingPMSColors,
  formatRgbString,
  getTextColor,
  hexToRgb,
  hslToRgb,
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
import { Wrapper } from '@/components/wrapper';

import { Slider } from './ui/slider';

const distances = ['16', '32', '48', '64', '80', '96'];

export default function HslPantoneConverter() {
  const { toast } = useToast();

  const [hsl, setHsl] = useState({ h: 210, s: 100, l: 69 });
  const [matchingColors, setMatchingColors] = useState<{ pantone: string; hex: string }[]>([]);
  const [distance, setDistance] = useState('32');

  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HSL';
  const TARGET_COLOR = 'PANTONE';
  const { trackCopy } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
    `${hsl.h},${hsl.s},${hsl.l}`,
  );

  const handleInputChange = (key: keyof typeof hsl, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setHsl((prev) => ({ ...prev, [key]: numValue }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Track copy event based on the label
      if (label === 'HSL value') {
        trackCopy('HSL');
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
  }, [hex, distance]);

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Easily transform your HSL values into Pantone perfection! Enter your HSL values below and
          get instant, accurate results.
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
