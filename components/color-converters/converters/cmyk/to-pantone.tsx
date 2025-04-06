'use client';

import { useEffect, useState } from 'react';

import { cmykToRgb, findMatchingPMSColors, rgbToHex } from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import { ColorPreview } from '@/components/color-converters/shared/color-preview';
import { ColorValueDisplay } from '@/components/color-converters/shared/color-value-display';
import { PantoneColorCard } from '@/components/color-converters/shared/pantone-color-card';
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

export default function CmykPantoneConverter() {
  const { toast } = useToast();

  const [cmyk, setCmyk] = useState({ c: 18, m: 17, y: 84, k: 0 });
  const [matchingColors, setMatchingColors] = useState<
    { pantone: string; hex: string; matchPercentage: number }[]
  >([]);
  const [distance, setDistance] = useState('15');
  const [sortOrder, setSortOrder] = useState<'high-to-low' | 'low-to-high'>('high-to-low');
  const [visibleCount, setVisibleCount] = useState(15);

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
    const sortedColors = [...tempMatchingColors].sort((a, b) => {
      return sortOrder === 'high-to-low'
        ? b.matchPercentage - a.matchPercentage
        : a.matchPercentage - b.matchPercentage;
    });
    setMatchingColors(sortedColors);
  }, [cmyk, distance, hex, sortOrder]);

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Transform your CMYK values into Pantone perfection with instant, accurate results. Find
          the closest Pantone matches for your CMYK color.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
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
                      <ColorPreview color={hex} />
                    </div>

                    <div className="flex flex-col gap-y-0.5 text-sm">
                      <ColorValueDisplay label="CMYK" value={cmykString} onCopy={copyToClipboard} />
                      <ColorValueDisplay label="RGB" value={rgbString} onCopy={copyToClipboard} />
                      <ColorValueDisplay label="HEX" value={hex} onCopy={copyToClipboard} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                      <PantoneColorCard
                        key={index}
                        pantone={color.pantone}
                        hex={color.hex}
                        matchPercentage={color.matchPercentage}
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </div>
                  {matchingColors.length > visibleCount && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setVisibleCount((prev) => prev + 15)}>
                        Load More Matches
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
