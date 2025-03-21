'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { converters } from '@/config/converters';

type Tool = {
  url: string;
  name: string;
  target: '_blank' | '_self';
  isExternal?: boolean;
};

// External tools that are not part of our converter configuration
const externalTools: Tool[] = [
  {
    url: '/pantone-colors',
    name: 'Pantone Colors Chart',
    target: '_self',
  },
  {
    url: 'https://www.rgbtopantone.com/',
    name: 'Convert RGB to Pantone',
    target: '_blank',
    isExternal: true,
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hsv-to-rgb',
    name: 'Convert HSV to RGB',
    target: '_blank',
    isExternal: true,
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hex-to-rgb',
    name: 'Convert HEX to RGB',
    target: '_self',
  },
];

// Combine converter tools with external tools
const tools: Tool[] = [
  ...externalTools,
  ...converters.map((converter) => ({
    url: converter.url,
    name: converter.title.replace(' Converter', ''),
    target: '_self' as const,
  })),
];

export default function RelatedTools() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex-shrink-0">
        <span className="text-sm font-medium uppercase text-gray-500 dark:text-gray-100">
          Related tools:
        </span>
      </div>
      <div className="grid w-full flex-grow grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {tools.map((tool, index) => {
          const Comp = tool.isExternal ? 'a' : Link;
          return tool.url !== pathname ? (
            <Comp
              key={index}
              href={tool.url}
              target={tool.target}
              className="font-medium text-gray-700 transition hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400">
              {tool.name}
            </Comp>
          ) : null;
        })}
      </div>
    </>
  );
}
