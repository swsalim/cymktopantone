'use client';

import { useEffect, useState } from 'react';

import { Info } from 'lucide-react';

import {
  findMatchingPMSColors,
  hexToRgb,
  isValidHex,
  rgbToCmyk,
  rgbToHsl,
  rgbToHsv,
} from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import BannerMatching from '@/components/ads/banner-matching';
import SponsoredSlot from '@/components/ads/sponsored-slot';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Wrapper } from '@/components/wrapper';

const distances = ['5', '10', '15', '20', '25', '30'];

export default function HexPantoneConverter({ defaultValue }: { defaultValue?: string }) {
  const { toast } = useToast();

  const defaultColor = defaultValue ? `#${defaultValue}` : '#6D39AC';

  const [hex, setHex] = useState(defaultColor);
  const [matchingColors, setMatchingColors] = useState<
    { pantone: string; hex: string; matchPercentage: number }[]
  >([]);
  const [distance, setDistance] = useState('15');
  const [sortOrder, setSortOrder] = useState<'high-to-low' | 'low-to-high'>('high-to-low');
  const [visibleCount, setVisibleCount] = useState(15);

  const rgb = hexToRgb(hex);
  const cmyk = rgbToCmyk(rgb);
  const hsv = rgbToHsv(rgb);
  const hsl = rgbToHsl(rgb);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  const hsvString = `hsv(${hsv.h}, ${hsv.s}, ${hsv.v})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HEX';
  const TARGET_COLOR = 'PANTONE';
  const { trackCopy } = useConverterTracking(SOURCE_COLOR, TARGET_COLOR, hex);

  const handleInputChange = (value: string) => {
    // Only update if the input is a valid hex color
    if (isValidHex(value)) {
      setHex(value);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Track copy event based on the label
      if (label === 'RGB value') {
        trackCopy('RGB');
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
    const fetchMatchingColors = async () => {
      const tempMatchingColors = await findMatchingPMSColors(hex.substring(1), Number(distance));
      const sortedColors = [...tempMatchingColors].sort((a, b) => {
        return sortOrder === 'high-to-low'
          ? b.matchPercentage - a.matchPercentage
          : a.matchPercentage - b.matchPercentage;
      });
      setMatchingColors(sortedColors);
    };

    fetchMatchingColors();
  }, [hex, distance, sortOrder]);

  return (
    <Wrapper size="lg" className="pb-0 md:pb-0">
      <Container>
        {defaultValue && (
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
            #{defaultValue}
          </h1>
        )}
        {defaultValue && (
          <p>
            Transform #{defaultValue} into Pantone perfection with instant, accurate results. Find
            the closest Pantone matches for #{defaultValue}.
          </p>
        )}
        {!defaultValue && (
          <p>
            Transform your HEX values into Pantone perfection with instant, accurate results. Find
            the closest Pantone matches for your HEX color.
          </p>
        )}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <Card>
              <h2 className="sr-only">Enter HEX Value</h2>
              <CardContent>
                <div className="flex flex-col gap-y-6">
                  <div>
                    <Label>HEX</Label>
                    <div className="mb-2 flex items-center justify-between">
                      <Input
                        type="color"
                        id="colorPicker"
                        value={hex}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="h-20 w-full cursor-pointer"
                      />
                    </div>
                    <Input
                      type="text"
                      value={hex.toUpperCase()}
                      onChange={(e) => handleInputChange(e.target.value)}
                    />
                  </div>
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
                      <div className="h-24 w-full rounded-lg" style={{ backgroundColor: hex }} />
                    </div>
                    <div className="flex flex-col gap-y-0.5 text-sm">
                      <ColorValueDisplay label="RGB" value={rgbString} onCopy={copyToClipboard} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <BannerMatching
              title="Play the Pantone Color Match Game!"
              description="Test your memory. Train your eye. Can you match the colors?"
              href="/pantone-color-match/classic/medium"
              buttonText="Play Game"
            />

            <div className="mx-auto my-4">
              <SponsoredSlot />
            </div>
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
                  <h3 className="sr-only">Pantone Matches</h3>
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
              title="Original Hex Color"
              cmyk={cmykString}
              hsv={hsvString}
              rgb={rgbString}
              hex={hex}
              hsl={hslString}
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

      {!defaultValue && (
        <Container>
          <RelatedTools />
        </Container>
      )}
    </Wrapper>
  );
}
