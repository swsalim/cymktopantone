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
    url: '/',
    name: 'Convert CYMK to Pantone',
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
];

export default function RelatedTools() {
  const pathname = usePathname();

  return (
    <>
      <div>
        <span className="text-sm font-medium uppercase text-gray-500 dark:text-gray-100">
          Related tools:
        </span>
      </div>
      <div className="flex flex-col gap-x-4 gap-y-5 md:flex-row">
        {tools.map((tool) => {
          const Comp = tool.isExternal ? 'a' : Link;
          return tool.url !== pathname ? (
            <>
              <Comp
                key={tool.url}
                href={tool.url}
                target={tool.target}
                className="font-medium text-gray-700 transition hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400">
                {tool.name}
              </Comp>
            </>
          ) : null;
        })}
      </div>
    </>
  );
}
