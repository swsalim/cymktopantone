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
    target: '_blank',
  },
  {
    url: '/convert-cmyk-to-hex',
    name: 'Convert CMYK to HEX',
    target: '_blank',
  },
  {
    url: '/',
    name: 'Convert CMYK to Pantone',
    target: '_blank',
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
    target: '_blank',
  },
  {
    url: '/convert-hsv-to-pantone-pms',
    name: 'Convert HSV to Pantone',
    target: '_blank',
  },
  {
    url: '/convert-hex-to-rgb',
    name: 'Convert HEX to RGB',
    target: '_blank',
  },
  {
    url: '/convert-hex-to-cmyk',
    name: 'Convert HEX to CMYK',
    target: '_blank',
  },
  {
    url: '/convert-cmyk-to-rgb',
    name: 'Convert CMYK to RGB',
    target: '_blank',
  },
  {
    url: '/convert-hex-to-hsv',
    name: 'Convert HEX to HSV',
    target: '_blank',
  },
  {
    url: '/convert-pantone-to-cmyk',
    name: 'Convert Pantone to CMYK',
    target: '_blank',
  },
  {
    url: '/convert-pantone-to-hex',
    name: 'Convert Pantone to HEX',
    target: '_blank',
  },
  {
    url: '/convert-pantone-to-rgb',
    name: 'Convert Pantone to RGB',
    target: '_blank',
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
