'use client';

import { useEffect, useState } from 'react';

import { CopyIcon } from 'lucide-react';

import {
  findMatchingPMSColors,
  formatRgbString,
  getTextColor,
  hexToRgb,
  hsvToRgb,
  rgbToHex,
} from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import { ColorPreview } from '@/components/color-converters/shared/color-preview';
import { ColorValueDisplay } from '@/components/color-converters/shared/color-value-display';
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

const distances = ['5', '10', '15', '20', '25', '30'];

export default function HsvPantoneConverter() {
  const { toast } = useToast();

  const [hsv, setHsv] = useState({ h: 199, s: 68, v: 38 });
  const [matchingColors, setMatchingColors] = useState<
    { pantone: string; hex: string; matchPercentage: number }[]
  >([]);
  const [distance, setDistance] = useState('15');
  const [sortOrder, setSortOrder] = useState<'high-to-low' | 'low-to-high'>('high-to-low');
  const [visibleCount, setVisibleCount] = useState(15);

  const rgb = hsvToRgb(hsv);
  const hex = rgbToHex(rgb);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hsvString = `hsv(${hsv.h}, ${hsv.s}, ${hsv.v})`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HSV';
  const TARGET_COLOR = 'PANTONE';
  const { trackCopy } = useConverterTracking(
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
    const sortedColors = [...tempMatchingColors].sort((a, b) => {
      return sortOrder === 'high-to-low'
        ? b.matchPercentage - a.matchPercentage
        : a.matchPercentage - b.matchPercentage;
    });
    setMatchingColors(sortedColors);
  }, [hex, distance, sortOrder]);

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Transform your HSV values into Pantone perfection with instant, accurate results. Find the
          closest Pantone matches for your HSV color.
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
                    <ColorPreview color={hex} />
                  </div>

                  <div className="flex flex-col gap-y-0.5 text-sm">
                    <ColorValueDisplay label="RGB" value={rgbString} onCopy={copyToClipboard} />
                    <ColorValueDisplay label="HSV" value={hsvString} onCopy={copyToClipboard} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Closest Pantone {matchingColors.length > 1 ? 'Colors' : 'Color'} (
                  {matchingColors.length})
                </h2>
                <Select
                  defaultValue="high-to-low"
                  onValueChange={(value: 'high-to-low' | 'low-to-high') => setSortOrder(value)}>
                  <SelectTrigger className="w-[180px] dark:text-gray-900">
                    <SelectValue placeholder="Sort by match %" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="high-to-low">Highest match first</SelectItem>
                      <SelectItem value="low-to-high">Lowest match first</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {!matchingColors.length && (
                <p className="text-start text-base text-gray-500">No matching colors found</p>
              )}
              {matchingColors.length >= 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {matchingColors.slice(0, visibleCount).map((color, index) => (
                      <div
                        key={index}
                        className="relative flex h-32 w-full flex-col justify-center rounded-lg p-2 md:h-40 md:py-4"
                        style={{
                          backgroundColor: formatRgbString(hexToRgb(color.hex)),
                          color: getTextColor(color.hex),
                        }}>
                        <div className="absolute right-2 top-2 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 drop-shadow-md">
                          {color.matchPercentage}% Match
                        </div>
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
                  {matchingColors.length > visibleCount && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setVisibleCount((prev) => prev + 15)}>
                        Load More
                      </Button>
                    </div>
                  )}
                </>
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
