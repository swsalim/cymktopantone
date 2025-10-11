'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ConverterConfig, converters } from '@/config/converters';

import { cn } from '@/lib/utils';

type Tool = {
  url: string;
  name: string;
  target: '_blank' | '_self';
  isExternal?: boolean;
};

// External tools that are not part of our converter configuration
const externalTools: Partial<ConverterConfig & { target: '_blank' | '_self' }>[] = [
  {
    url: '/pantone-colors',
    sourceColor: 'PANTONE',
    title: 'Pantone Colors Chart',
    target: '_self',
  },
  {
    url: 'https://www.rgbtopantone.com/',
    sourceColor: 'RGB',
    title: 'Convert RGB to Pantone',
    target: '_blank',
    isExternal: true,
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hsv-to-rgb',
    sourceColor: 'HSV',
    title: 'Convert HSV to RGB',
    target: '_blank',
    isExternal: true,
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hex-to-rgb',
    sourceColor: 'HEX',
    title: 'Convert HEX to RGB',
    target: '_self',
  },
];

// Group converter tools by sourceColor
const groupedConverterTools = [...converters, ...externalTools].reduce(
  (acc, converter) => {
    const sourceColor = converter.sourceColor;
    if (sourceColor && converter.url && converter.title) {
      if (!acc[sourceColor]) {
        acc[sourceColor] = [];
      }
      acc[sourceColor].push({
        url: converter.url,
        name: converter.title.replace(' Converter', ''),
        target: '_self' as const,
      });
    }
    return acc;
  },
  {} as Record<string, Tool[]>,
);

export default function RelatedTools() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        '-mx-6 mt-12 flex flex-col items-start gap-4 bg-yellow-50 px-6 py-8 drop-shadow-sm md:-mx-12 md:rounded-xl md:px-12 md:py-12 md:drop-shadow-xl dark:bg-yellow-500/10',
      )}>
      <div className="flex-shrink-0">
        <h2 className="text-base font-medium capitalize text-yellow-800 dark:text-yellow-300">
          More Color Converters
        </h2>
      </div>

      <div className="flex w-full flex-col items-start divide-y divide-yellow-800/20">
        {Object.entries(groupedConverterTools).map(([sourceColor, tools]) => (
          <div key={sourceColor} className="w-full py-5">
            <h3 className="mb-3 text-lg font-semibold capitalize text-yellow-900 dark:text-yellow-300">
              <span className="uppercase">{sourceColor}</span> Color Converter
            </h3>
            <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {tools.map((tool, index) => {
                return tool.url !== pathname ? (
                  <Link
                    key={index}
                    href={tool.url}
                    target={tool.target}
                    className="font-medium text-yellow-800 transition hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-400">
                    {tool.name}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
