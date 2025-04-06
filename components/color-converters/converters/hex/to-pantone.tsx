'use client';

import { useEffect, useState } from 'react';

import { CopyIcon } from 'lucide-react';

import { findMatchingPMSColors, formatRgbString, getTextColor, hexToRgb } from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

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
import { Wrapper } from '@/components/wrapper';

const distances = ['5', '10', '15', '20', '25', '30'];

export default function HexPantoneConverter() {
  const { toast } = useToast();

  const [hex, setHex] = useState('#6D39AC');
  const [matchingColors, setMatchingColors] = useState<
    { pantone: string; hex: string; matchPercentage: number }[]
  >([]);
  const [distance, setDistance] = useState('15');
  const [sortOrder, setSortOrder] = useState<'high-to-low' | 'low-to-high'>('high-to-low');
  const [visibleCount, setVisibleCount] = useState(15);

  const rgb = hexToRgb(hex);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HEX';
  const TARGET_COLOR = 'PANTONE';
  const { trackCopy } = useConverterTracking(SOURCE_COLOR, TARGET_COLOR, hex);

  const handleInputChange = (value: string) => {
    setHex(value);
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
          Transform your HEX values into Pantone perfection with instant, accurate results. Find the
          closest Pantone matches for your HEX color.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
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
                    <div className="h-24 w-full rounded-lg" style={{ backgroundColor: hex }} />
                  </div>

                  <div className="flex flex-col gap-y-0.5 text-sm">
                    <ColorValueDisplay label="RGB" value={rgbString} onCopy={copyToClipboard} />
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
