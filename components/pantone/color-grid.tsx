'use client';

import { CopyIcon } from 'lucide-react';

import { useToast } from '@/lib/hooks/use-toast';

import { Button } from '@/components/ui/button';

interface ColorGridProps {
  color: {
    hex: string;
    name: string;
    pantone: string;
    rgb: string;
    cmyk: string;
    hsl: string;
    hsv: string;
  };
}

export function ColorGrid({ color }: ColorGridProps) {
  const { toast } = useToast();

  const copyToClipboard = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    toast({
      title: `${label} Copied to clipboard`,
      description: `Color value ${value} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="rounded-lg border p-6">
      <div className="mb-4 h-48 w-full rounded-lg" style={{ backgroundColor: color.hex }} />
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-medium">{color.name}</h3>
          <p className="text-sm text-gray-700">{color.pantone}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">CMYK:</span> <b>{color.cmyk}</b>
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(`${color.cmyk}`, 'CMYK value')}>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">HEX:</span> <b>{color.hex}</b>
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(`${color.hex}`, 'HEX value')}>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">RGB:</span> <b>{color.rgb}</b>
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(`${color.rgb}`, 'RGB value')}>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">HSL:</span> <b>{color.hsl}</b>
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(`${color.hsl}`, 'HSL value')}>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">HSV:</span> <b>{color.hsv}</b>
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(`${color.hsv}`, 'HSV value')}>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
