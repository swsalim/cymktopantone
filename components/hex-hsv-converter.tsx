'use client';

import { useState } from 'react';

import { CopyIcon } from 'lucide-react';

import { hexToRgb, rgbToHsv } from '@/lib/colors';
import { useToast } from '@/lib/hooks/use-toast';

import { AddToHistoryButton } from '@/components/add-to-history-button';
import { ColorHistory } from '@/components/color-history';
import { Container } from '@/components/container';
import { useColorHistoryContext } from '@/components/dynamic-converter';
import RelatedTools from '@/components/related-tools';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wrapper } from '@/components/wrapper';

export default function HexHsvConverter() {
  const { toast } = useToast();
  const { colorHistory } = useColorHistoryContext();

  const [hex, setHex] = useState('#6D39AC');

  const rgb = hexToRgb(hex);
  const hsv = rgbToHsv(rgb);
  const hexString = hex;
  const hsvString = `hsv(${hsv.h}, ${hsv.s}, ${hsv.v})`;

  const handleInputChange = (value: string) => {
    setHex(value);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: `${label} copied!`,
        duration: 2000,
      });
    });
  };

  const addToHistory = () => {
    colorHistory.addToHistory({
      sourceColor: 'HEX',
      targetColor: 'HSV',
      sourceValue: hexString,
      targetValue: hsvString,
    });
  };

  const handleColorSelect = (sourceValue: string) => {
    const hexMatch = sourceValue.match(/#([0-9a-f]{6})/i);
    console.log(hexMatch);
    if (hexMatch) {
      const [hex] = hexMatch;
      setHex(hex);
      return;
    }
  };

  return (
    <Wrapper size="lg">
      <Container>
        <p>
          Easily transform your HEX values into HSV values! Enter your HEX values below and get
          instant, accurate results.
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
              </div>

              <ColorHistory history={colorHistory} onColorSelect={handleColorSelect} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="mb-4">
                <h2 className="mb-2 text-xl font-semibold">Color Preview</h2>
                <div className="h-24 w-full rounded-lg" style={{ backgroundColor: hex }} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p>
                    <span className="font-medium">HSV:</span>{' '}
                    <b>
                      hsv({hsv.h}, {hsv.s}, {hsv.v})
                    </b>
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(`hsv(${hsv.h}, ${hsv.s}, ${hsv.v})`, 'HSV value')
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

                <AddToHistoryButton
                  onClick={addToHistory}
                  disabled={colorHistory.items.length >= 5}
                />
              </div>
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
