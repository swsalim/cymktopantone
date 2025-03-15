'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Tool = {
  url: string;
  name: string;
  target: '_blank' | '_self';
  isExternal?: boolean;
};
const tools: Tool[] = [
  {
    url: '/pantone-colors',
    name: 'Pantone Colors Chart',
    target: '_self',
  },
  {
    url: '/convert-cmyk-to-hex',
    name: 'Convert CMYK to HEX',
    target: '_self',
  },
  {
    url: '/',
    name: 'Convert CMYK to Pantone',
    target: '_self',
  },
  {
    url: 'https://www.rgbtopantone.com/',
    name: 'Convert RGB to Pantone',
    target: '_blank',
    isExternal: true,
  },
  {
    url: '/convert-hex-to-pantone-pms',
    name: 'Convert HEX to Pantone',
    target: '_self',
  },
  {
    url: '/convert-hsv-to-pantone-pms',
    name: 'Convert HSV to Pantone',
    target: '_self',
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hsv-to-rgb',
    name: 'Convert HSV to RGB',
    target: '_blank',
    isExternal: true,
  },
  {
    url: '/convert-hsv-to-hex',
    name: 'Convert HSV to HEX',
    target: '_blank',
    isExternal: true,
  },
  {
    url: 'https://www.rgbtopantone.com/convert-hex-to-rgb',
    name: 'Convert HEX to RGB',
    target: '_self',
  },
  {
    url: '/convert-hex-to-cmyk',
    name: 'Convert HEX to CMYK',
    target: '_self',
  },
  {
    url: 'https://www.rgbtopantone.com/convert-cmyk-to-rgb',
    name: 'Convert CMYK to RGB',
    target: '_blank',
    isExternal: true,
  },
  {
    url: '/convert-hex-to-hsv',
    name: 'Convert HEX to HSV',
    target: '_self',
  },
  {
    url: '/convert-pantone-to-cmyk',
    name: 'Convert Pantone to CMYK',
    target: '_self',
  },
  {
    url: '/convert-pantone-to-hex',
    name: 'Convert Pantone to HEX',
    target: '_self',
  },
  {
    url: 'https://www.rgbtopantone.com/convert-pantone-to-rgb',
    name: 'Convert Pantone to RGB',
    target: '_blank',
    isExternal: true,
  },
  {
    url: '/convert-hex-to-hsl',
    name: 'Convert HEX to HSL',
    target: '_self',
  },
  {
    url: '/convert-cmyk-to-hsl',
    name: 'Convert CMYK to HSL',
    target: '_self',
  },
  {
    url: '/convert-hsv-to-hsl',
    name: 'Convert HSV to HSL',
    target: '_self',
  },
  {
    url: '/convert-hsl-to-hex',
    name: 'Convert HSL to HEX',
    target: '_self',
  },
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
