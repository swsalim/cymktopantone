'use client';

import { useEffect, useState } from 'react';

import { CopyIcon, Info } from 'lucide-react';

import { findMatchingPMSColors, rgbToHex } from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import BannerMatching from '@/components/ads/banner-matching';
import { LazyAdsArticle } from '@/components/ads/lazy-ads-article';
import { ColorPreview } from '@/components/color-converters/shared/color-preview';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Wrapper } from '@/components/wrapper';

const distances = ['5', '10', '15', '20', '25', '30'];

export default function RgbPantoneConverter() {
  const { toast } = useToast();

  const [rgb, setRgb] = useState({ r: 199, g: 63, b: 103 });
  const [matchingColors, setMatchingColors] = useState<
    { pantone: string; hex: string; matchPercentage: number }[]
  >([]);
  const [distance, setDistance] = useState('15');
  const [sortOrder, setSortOrder] = useState<'high-to-low' | 'low-to-high'>('high-to-low');
  const [visibleCount, setVisibleCount] = useState(15);

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
    const numValue = Math.min(255, Math.max(0, Number(value) || 0));
    setRgb((prev) => ({ ...prev, [key]: numValue }));
    setVisibleCount(15);
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
        <p>
          Transform your RGB values into Pantone perfection with instant, accurate results. Find the
          closest Pantone matches for your RGB color.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <Card>
              <CardContent>
                <ColorPreview color={hex} />
                <div className="space-y-3">
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
                            max={255}
                          />
                        </div>
                      </div>
                      <Slider
                        value={[rgb[key as keyof typeof rgb]]}
                        onValueChange={([value]) => {
                          setRgb((prev) => ({ ...prev, [key]: value }));
                          setVisibleCount(15);
                        }}
                        max={255}
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

            <BannerMatching
              title="Play the Pantone Color Match Game!"
              description="Test your memory. Train your eye. Can you match the colors?"
              href="/pantone-color-match/classic/medium"
              buttonText="Play Game"
            />

            <div className="mx-auto my-4">
              <LazyAdsArticle />
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
      <Container>
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
