'use client';

import { useRef, useState } from 'react';

import { CopyIcon } from 'lucide-react';

import { PMS } from '@/config/colors';

import {
  convertPantoneToHex,
  getTextColor,
  hexToRgb,
  rgbToCmyk,
  rgbToHsl,
  rgbToHsv,
} from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { useToast } from '@/lib/hooks/use-toast';

import { AddToHistoryButton } from '@/components/add-to-history-button';
import { ColorHistory } from '@/components/color-history';
import { Container } from '@/components/container';
import { useColorHistoryContext } from '@/components/dynamic-converter';
import RelatedTools from '@/components/related-tools';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

export default function PantoneHsvConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();
  const previewRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [pantone, setPantone] = useState(PMS[0]);

  const hex = `#${convertPantoneToHex(pantone)}`;
  const rgb = hexToRgb(hex);
  const cmyk = rgbToCmyk(rgb);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);

  const hsvString = `hsv(${hsv.h}, ${hsv.s}, ${hsv.v})`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'PANTONE';
  const TARGET_COLOR = 'HSV';
  const { trackCopy, trackAddToHistory, trackSelectFromHistory } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
    pantone,
  );

  const handleClick = (value: string) => {
    setPantone(value);

    if (isMobile && previewRef.current) {
      setTimeout(() => {
        const headerOffset = 70;
        const elementPosition = previewRef.current?.getBoundingClientRect().top;
        const offsetPosition = (elementPosition || 0) + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Track copy event based on label
      if (label === 'HSV value') {
        trackCopy('HSV');
      } else if (label === 'HSL value') {
        trackCopy('HSL');
      } else if (label === 'CMYK value') {
        trackCopy('CMYK');
      } else if (label === 'RGB value') {
        trackCopy('RGB');
      } else if (label === 'HEX value') {
        trackCopy('HEX');
      }

      toast({
        description: `${label} copied!`,
        duration: 2000,
      });
    });
  };

  const addToHistory = () => {
    // Track history addition
    trackAddToHistory();

    colorHistory.addToHistory({
      sourceColor: 'PANTONE',
      targetColor: 'HSV',
      sourceValue: pantone,
      targetValue: hsvString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    setPantone(sourceValue);

    // Track selection from history
    trackSelectFromHistory();
  };

  return (
    <Wrapper size="lg">
      <Container>
        <div className="prose dark:prose-invert">
          <h1>Pantone to HSV Converter</h1>
          <p>
            Our free converter gives you instant HSV, CMYK, RGB, HEX, and HSL values for any Pantone
            color – no Pantone color chart needed. Just browse, click, and get precise color values
            for all your design needs.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                {PMS.map((pantoneColor) => {
                  const hex = convertPantoneToHex(pantoneColor);

                  return (
                    <div
                      key={pantoneColor}
                      className="block size-14 shrink-0 cursor-pointer rounded-md"
                      style={{ backgroundColor: `#${hex}` }}
                      onClick={() => handleClick(pantoneColor)}></div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div ref={previewRef}>
            <Card className="sticky top-[70px] min-h-[300px]">
              <CardContent>
                <div className="mb-4">
                  <h2 className="mb-2 text-xl font-semibold">Color Preview</h2>
                  <div
                    className="flex h-24 w-full items-center justify-center rounded-lg"
                    style={{ backgroundColor: hex, color: getTextColor(hex) }}>
                    <div className="text-center text-base font-medium">{pantone}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p>
                      <span className="font-medium">HSV:</span> <b>{hsvString}</b>
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(hsvString, 'HSV value')}>
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
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
                  <div className="flex items-center justify-between">
                    <p>
                      <span className="font-medium">CMYK:</span>{' '}
                      <b>
                        cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                      </b>
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(
                          `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
                          'CMYK value',
                        )
                      }>
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>
                      <span className="font-medium">RGB:</span>{' '}
                      <b>
                        rgb({rgb.r}, {rgb.g}, {rgb.b})
                      </b>
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB value')
                      }>
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

                  <AddToHistoryButton
                    onClick={addToHistory}
                    disabled={colorHistory.items.length >= 5}
                  />

                  <ColorHistory history={colorHistory} onColorSelect={handleColorSelect} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col items-start gap-4 py-8 md:flex-row md:items-start">
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
