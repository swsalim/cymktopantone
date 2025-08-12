'use client';

import { CopyIcon, ExternalLink } from 'lucide-react';

import { PMS } from '@/config/colors';
import { pantoneCategories } from '@/config/pantoneCategories';

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
            <Card key={pantoneColor} className="group overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="flex h-24 w-full cursor-pointer items-center justify-center"
                  style={{ backgroundColor: `#${hex}` }}
                  onClick={() => copyToClipboard(`#${hex}`, 'HEX value')}>
                  <div className="rounded-full bg-gray-50/50 p-3 text-gray-50 transition-colors duration-300 group-hover:bg-gray-50 group-hover:text-gray-500 dark:text-gray-800 dark:group-hover:text-gray-900">
                    <CopyIcon className="size-4" />
                  </div>
                </div>
                <div
                  className="group relative cursor-pointer p-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    const category = pantoneCategories.find(
                      (c) => c.hex.toLowerCase() === `#${hex}`.toLowerCase(),
                    );
                    if (category) {
                      window.location.href = `/pantone-colors/${category.slug}`;
                    }
                  }}>
                  {pantoneCategories.find(
                    (c) => c.hex.toLowerCase() === `#${hex}`.toLowerCase(),
                  ) && (
                    <div className="absolute right-2 top-2 text-gray-500 transition-colors group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-400">
                      <ExternalLink className="size-4" />
                    </div>
                  )}
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
