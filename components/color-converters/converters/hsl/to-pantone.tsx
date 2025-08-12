'use client';

import { useEffect, useState } from 'react';

import { Info } from 'lucide-react';

import { findMatchingPMSColors, hslToRgb, rgbToCmyk, rgbToHex, rgbToHsv } from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import BannerMatching from '@/components/ads/banner-matching';
import { ColorPreview } from '@/components/color-converters/shared/color-preview';
import { ColorValueDisplay } from '@/components/color-converters/shared/color-value-display';
import { PantoneColorCard } from '@/components/color-converters/shared/pantone-color-card';
import { PantoneComparisonCard } from '@/components/color-converters/shared/pantone-comparison-card';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Wrapper } from '@/components/wrapper';

const distances = ['5', '10', '15', '20', '25', '30'];

export default function HslPantoneConverter() {
  const { toast } = useToast();

  const [hsl, setHsl] = useState({ h: 210, s: 100, l: 69 });
  const [matchingColors, setMatchingColors] = useState<
    { pantone: string; hex: string; matchPercentage: number }[]
  >([]);
  const [distance, setDistance] = useState('15');
  const [sortOrder, setSortOrder] = useState<'high-to-low' | 'low-to-high'>('high-to-low');
  const [visibleCount, setVisibleCount] = useState(15);

  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);
  const cmyk = rgbToCmyk(rgb);
  const hsv = rgbToHsv(rgb);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  const hsvString = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;

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
    setVisibleCount(15);
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
    const sortedColors = [...tempMatchingColors].sort((a, b) => {
      return sortOrder === 'high-to-low'
        ? b.matchPercentage - a.matchPercentage
        : a.matchPercentage - b.matchPercentage;
    });

    setMatchingColors(sortedColors);
  }, [hex, distance, sortOrder]);

  return (
    <Wrapper size="lg" className="pb-0 md:pb-0">
      <Container>
        <p>
          Transform your HSL values into Pantone perfection with instant, accurate results. Find the
          closest Pantone matches for your HSL color.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
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
                        onValueChange={([value]) => {
                          setHsl((prev) => ({ ...prev, [key]: value }));
                          setVisibleCount(15);
                        }}
                        max={label === 'Hue' ? 360 : 100}
                        step={1}
                        className="mt-2"
                        color={label.toLowerCase()}
                      />
                    </div>
                  ))}
                  <div>
                    <div className="mb-2 flex flex-row gap-x-2">
                      <Label>Distance</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="size-4"></Info>
                          </TooltipTrigger>
                          <TooltipContent className="p-5">
                            <ul className="font-medium">
                              <li>
                                <strong>5</strong>: Very close matches only (high quality matches).
                                Match percentages: 85-100%.
                              </li>
                              <li>
                                <strong>10</strong>: Good matches. Match percentages: 70-100%.
                              </li>
                              <li>
                                <strong>15</strong>: Default value - Acceptable matches. Match
                                percentages: 50-100%.
                              </li>
                              <li>
                                <strong>20</strong>: More permissive. Match percentages: 35-100%.
                              </li>
                              <li>
                                <strong>25</strong>: Very permissive. Match percentages: 20-100%.
                              </li>
                              <li>
                                <strong>30</strong>: Maximum range. Match percentages: 10-100%.
                              </li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                      <ColorValueDisplay label="HSL" value={hslString} onCopy={copyToClipboard} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <BannerMatching
              title="Play the Pantone Color Match Game!"
              description="Test your memory. Train your eye. Can you match the colors?"
              href="/pantone-color-match/classic/medium"
              buttonText="Start Matching"
            />
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
      {matchingColors.length > 0 && (
        <Container className="prose mt-16 dark:prose-invert">
          <h2 className="text-center">Color Comparison</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <PantoneComparisonCard
              title="Original HSL Color"
              cmyk={cmykString}
              rgb={rgbString}
              hex={hex}
              hsl={hslString}
              hsv={hsvString}
            />

            <PantoneComparisonCard
              title={`Best Pantone Match (${matchingColors[0].pantone})`}
              pantone={matchingColors[0].pantone}
              hex={matchingColors[0].hex}
              deltaE={`${(((100 - matchingColors[0].matchPercentage) / 100) * 2.1).toFixed(3)} (Excellent match)`}
            />
          </div>
        </Container>
      )}
      <Container>
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
