'use client';

import { useState } from 'react';

import Link from 'next/link';

import { rgbToCmyk, rgbToHex } from '@/lib/colors';
import { useConverterTracking } from '@/lib/hooks/use-converter-tracking';
import { useToast } from '@/lib/hooks/use-toast';

import { AddToHistoryButton } from '@/components/color-converters/shared/add-to-history-button';
import { ColorHistory } from '@/components/color-converters/shared/color-history';
import { ColorPreview } from '@/components/color-converters/shared/color-preview';
import { ColorValueDisplay } from '@/components/color-converters/shared/color-value-display';
import { ColorInputControls } from '@/components/color-tools/color-input-controls';
import { ShareColorLink } from '@/components/color-tools/share-color-link';
import { useColorQuery } from '@/components/color-tools/use-color-query';
import { Container } from '@/components/container';
import { useColorHistoryContext } from '@/components/dynamic-converter';
import RelatedTools from '@/components/related-tools';
import { Card, CardContent } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

export default function RgbCmykConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();

  const [rgb, setRgb] = useState({ r: 199, g: 63, b: 103 });
  const channels = { r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) };
  const { markDirty } = useColorQuery('rgb', channels, (next) => {
    if (next.mode !== 'rgb') return;
    setRgb({
      r: Number(next.channels.r),
      g: Number(next.channels.g),
      b: Number(next.channels.b),
    });
  });
  const hex = rgbToHex(rgb);
  const cmyk = rgbToCmyk(rgb);
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'RGB';
  const TARGET_COLOR = 'CMYK';
  const { trackCopy, trackAddToHistory, trackSelectFromHistory } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Track copy event
      trackCopy(TARGET_COLOR, text);

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
      sourceColor: 'RGB',
      targetColor: 'CMYK',
      sourceValue: rgbString,
      targetValue: cmykString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    const rgbMatches = sourceValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatches) {
      const [, r, g, b] = rgbMatches;
      markDirty();
      setRgb({
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b),
      });

      // Track selection from history
      trackSelectFromHistory();
      return;
    }
  };

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6 pb-0 md:pb-0">
      <Container>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="sr-only">Enter RGB Value</h2>
            <CardContent>
              <ColorInputControls
                idPrefix="rgb-to-cmyk"
                mode="rgb"
                channels={channels}
                onChannelsChange={(next) => {
                  markDirty();
                  setRgb({
                    r: Math.min(255, Math.max(0, Number(next.r) || 0)),
                    g: Math.min(255, Math.max(0, Number(next.g) || 0)),
                    b: Math.min(255, Math.max(0, Number(next.b) || 0)),
                  });
                }}
              />
              <div className="mt-4">
                <ShareColorLink mode="rgb" channels={channels} />
              </div>

              <ColorHistory history={colorHistory} onColorSelect={handleColorSelect} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <ColorPreview color={hex} />

              <div className="space-y-3">
                <ColorValueDisplay label="CMYK" value={cmykString} onCopy={copyToClipboard} />

                <AddToHistoryButton
                  onClick={addToHistory}
                  disabled={colorHistory.items.length >= 5}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
      <Container>
        <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">
          <Link href="/convert-rgb-to-spot-color" className="font-semibold text-violet-700 hover:underline dark:text-violet-300">
            RGB to Spot Color Converter.
          </Link>{' '}
          Find the closest colors in our own reference set, with ΔE and a CMYK build.
        </p>
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
