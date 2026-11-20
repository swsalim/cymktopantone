'use client';

import { useState } from 'react';

import Link from 'next/link';

import { hsvToRgb, rgbToCmyk, rgbToHex } from '@/lib/colors';
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

export default function HsvCmykConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();
  const [hsv, setHsv] = useState({ h: 199, s: 68, v: 38 });
  const channels = { h: String(hsv.h), s: String(hsv.s), v: String(hsv.v) };
  const { markDirty } = useColorQuery('hsv', channels, (next) => {
    if (next.mode !== 'hsv') return;
    setHsv({
      h: Number(next.channels.h),
      s: Number(next.channels.s),
      v: Number(next.channels.v),
    });
  });

  const rgb = hsvToRgb(hsv);
  const hex = rgbToHex(rgb);
  const cmyk = rgbToCmyk(rgb);
  const hsvString = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HSV';
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
      sourceColor: 'HSV',
      targetColor: 'CMYK',
      sourceValue: hsvString,
      targetValue: cmykString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    const hsvMatches = sourceValue.match(/hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hsvMatches) {
      const [, h, s, v] = hsvMatches;
      markDirty();
      setHsv({
        h: parseInt(h),
        s: parseInt(s),
        v: parseInt(v),
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
            <h2 className="sr-only">Enter HSV Value</h2>
            <CardContent>
              <ColorInputControls
                idPrefix="hsv-to-cmyk"
                mode="hsv"
                channels={channels}
                onChannelsChange={(next) => {
                  markDirty();
                  setHsv({
                    h: Math.min(360, Math.max(0, Number(next.h) || 0)),
                    s: Math.min(100, Math.max(0, Number(next.s) || 0)),
                    v: Math.min(100, Math.max(0, Number(next.v) || 0)),
                  });
                }}
              />
              <div className="mt-4">
                <ShareColorLink mode="hsv" channels={channels} />
              </div>

              <ColorHistory history={colorHistory} onColorSelect={handleColorSelect} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <ColorPreview color={hex} />

              <div className="space-y-3">
                <ColorValueDisplay label="HSV" value={hsvString} onCopy={copyToClipboard} />
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
