'use client';

import { CopyIcon } from 'lucide-react';

import { PMS } from '@/config/colors';

import { convertPantoneToHex } from '@/lib/colors';
import { useToast } from '@/lib/hooks/use-toast';

import { Card, CardContent } from '@/components/ui/card';

export default function PantoneColorsList() {
  const { toast } = useToast();
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: `${label} copied!`,
        duration: 2000,
      });
    });
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Pantone Colors</h2>
      <p className="mb-4 text-base">Click the color to copy the HEX color value.</p>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-6 lg:grid-cols-6">
        {PMS.map((pantoneColor) => {
          const hex = convertPantoneToHex(pantoneColor);
          return (
            <Card
              key={pantoneColor}
              className="group cursor-pointer overflow-hidden"
              onClick={() => copyToClipboard(`#${hex}`, 'HEX value')}>
              <CardContent className="p-0">
                <div
                  className="flex h-24 w-full items-center justify-center"
                  style={{ backgroundColor: `#${hex}` }}>
                  <div className="rounded-full bg-gray-50/50 p-3 transition-colors duration-300 group-hover:bg-gray-50">
                    <CopyIcon className="size-4" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-base font-medium">{pantoneColor}</p>
                  <p className="text-xs font-bold">#{hex}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
