'use client';

import { useState } from 'react';

import Link from 'next/link';

import { hexToRgb, isValidHex, rgbToCmyk } from '@/lib/colors';
import { normalizeHex } from '@/lib/color-query';
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

export default function HexCmykConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();

  const [hex, setHex] = useState('#6D39AC');
  const channels = { hex: hex.toUpperCase() };
  const { markDirty } = useColorQuery('hex', channels, (next) => {
    if (next.mode !== 'hex') return;
    const normalized = normalizeHex(next.channels.hex ?? '');
    if (normalized) setHex(normalized);
  });

  const rgb = hexToRgb(hex);
  const cmyk = rgbToCmyk(rgb);
  const hexString = hex;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  // Initialize tracking with source and target color formats
  const SOURCE_COLOR = 'HEX';
  const TARGET_COLOR = 'CMYK';
  const { trackCopy, trackAddToHistory, trackSelectFromHistory } = useConverterTracking(
    SOURCE_COLOR,
    TARGET_COLOR,
  );

  const handleInputChange = (value: string) => {
    // Only update if the input is a valid hex color
    if (isValidHex(value)) {
      markDirty();
      setHex(normalizeHex(value) ?? value);
    }
  };

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
      sourceColor: 'HEX',
      targetColor: 'CMYK',
      sourceValue: hexString,
      targetValue: cmykString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    const hexMatch = sourceValue.match(/#([0-9a-f]{6})/i);
    if (hexMatch) {
      const [matched] = hexMatch;
      markDirty();
      setHex(matched);

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
            <h2 className="sr-only">Enter HEX Value</h2>
            <CardContent>
              <ColorInputControls
                idPrefix="hex-to-cmyk"
                mode="hex"
                channels={channels}
                onChannelsChange={(next) => handleInputChange(next.hex ?? '')}
              />
              <div className="mt-4">
                <ShareColorLink mode="hex" channels={channels} />
              </div>

              <ColorHistory history={colorHistory} onColorSelect={handleColorSelect} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <ColorPreview color={hex} />

              <div className="space-y-3">
                <ColorValueDisplay label="CMYK" value={cmykString} onCopy={copyToClipboard} />
                <ColorValueDisplay label="HEX" value={hexString} onCopy={copyToClipboard} />

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
