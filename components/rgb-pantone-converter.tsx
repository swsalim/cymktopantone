'use client';

import { useEffect, useState } from 'react';

import { CopyIcon } from 'lucide-react';

import {
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
import { Card, CardContent } from '@/components/ui/card';
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

export default function RgbPantoneConverter() {
  const { toast } = useToast();

  const [rgb, setRgb] = useState({ r: 199, g: 63, b: 103 });
  const [matchingColors, setMatchingColors] = useState<{ pantone: string; hex: string }[]>([]);
  const [distance, setDistance] = useState('32');

  const hex = rgbToHex(rgb);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'RGB';
  const TARGET_COLOR = 'PANTONE';
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
  }, [rgb, distance, hex]);

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Easily transform your RGB values into Pantone perfection! Enter your RGB values below and
          get instant, accurate results.
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
              </div>
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
                    <span className="font-medium">RGB:</span> <b>{rgbString}</b>
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(rgbString, 'RGB value')}>
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
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
            </CardContent>
          </Card>
        </div>
        {matchingColors.length > 1 && (
          <div className="mt-10 grid gap-8">
            <Card>
              <CardContent>
                <div className="relative grid grid-cols-2 gap-4 rounded-lg sm:grid-cols-3 md:grid-cols-5 md:gap-4 lg:grid-cols-6">
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
                          <div className="text-center text-base font-medium">{color.pantone}</div>
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
              </CardContent>
            </Card>
          </div>
        )}
      </Container>
      <Container className="flex flex-col items-start gap-4 py-8 md:flex-row md:items-start">
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
