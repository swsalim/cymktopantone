import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowRightIcon } from 'lucide-react';

import { pantoneCategories, PantoneCategory } from '@/config/pantoneCategories';
import { siteConfig } from '@/config/site';

import { findMatchingPMSColors, isValidHex } from '@/lib/colors';
import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { Container } from '@/components/container';
import { DynamicConverter } from '@/components/dynamic-converter';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

interface HexPantonePageProps {
  params: Promise<{
    hex: string;
  }>;
}

interface RelatedColor {
  name: string;
  slug: string;
  hex: string;
}

const popularHexColors = [
  // === REDS ===
  { hex: 'ff0000', name: 'Pure Red' },
  { hex: 'dc143c', name: 'Crimson' },
  { hex: 'b22222', name: 'Firebrick' },
  { hex: 'ff6347', name: 'Tomato' },
  { hex: 'ff4500', name: 'Orange Red' },
  { hex: 'cd5c5c', name: 'Indian Red' },
  { hex: '8b0000', name: 'Dark Red' },
  { hex: 'a52a2a', name: 'Brown' },
  { hex: 'e74c3c', name: 'Alizarin' },
  { hex: 'c0392b', name: 'Pomegranate' },

  // === PINKS ===
  { hex: 'ff69b4', name: 'Hot Pink' },
  { hex: 'ffc0cb', name: 'Pink' },
  { hex: 'ffb6c1', name: 'Light Pink' },
  { hex: 'ff1493', name: 'Deep Pink' },
  { hex: 'ff91a4', name: 'Baker-Miller Pink' },
  { hex: 'ffb3ba', name: 'Pastel Pink' },
  { hex: 'ffc1cc', name: 'Bubble Gum' },
  { hex: 'db7093', name: 'Pale Violet Red' },
  { hex: 'c71585', name: 'Medium Violet Red' },
  { hex: 'ffdab9', name: 'Peach Puff' },

  // === ORANGES ===
  { hex: 'ffa500', name: 'Orange' },
  { hex: 'ff8c00', name: 'Dark Orange' },
  { hex: 'ff7f50', name: 'Coral' },
  { hex: 'ff6600', name: 'Neon Orange' },
  { hex: 'ffa07a', name: 'Light Salmon' },
  { hex: 'ff8c69', name: 'Salmon' },
  { hex: 'ffb347', name: 'Peach' },
  { hex: 'ff7f00', name: 'Orange' },
  { hex: 'ff8c42', name: 'Dark Salmon' },
  { hex: 'ff6b35', name: 'Red Orange' },

  // === YELLOWS ===
  { hex: 'ffff00', name: 'Pure Yellow' },
  { hex: 'ffd700', name: 'Gold' },
  { hex: 'ffffe0', name: 'Light Yellow' },
  { hex: 'fff8dc', name: 'Cornsilk' },
  { hex: 'f0e68c', name: 'Khaki' },
  { hex: 'ffefd5', name: 'Papaya Whip' },
  { hex: 'ffe4b5', name: 'Moccasin' },
  { hex: 'ffdab9', name: 'Peach Puff' },
  { hex: 'f5deb3', name: 'Wheat' },
  { hex: 'daa520', name: 'Goldenrod' },

  // === GREENS ===
  { hex: '008000', name: 'Pure Green' },
  { hex: '228b22', name: 'Forest Green' },
  { hex: '32cd32', name: 'Lime Green' },
  { hex: '00ff00', name: 'Lime' },
  { hex: '00fa9a', name: 'Medium Spring Green' },
  { hex: '90ee90', name: 'Light Green' },
  { hex: '98fb98', name: 'Pale Green' },
  { hex: '8fbc8f', name: 'Dark Sea Green' },
  { hex: '2e8b57', name: 'Sea Green' },
  { hex: '3cb371', name: 'Medium Sea Green' },

  // === CYANS ===
  { hex: '00ffff', name: 'Pure Cyan' },
  { hex: '00ced1', name: 'Dark Turquoise' },
  { hex: '40e0d0', name: 'Turquoise' },
  { hex: '20b2aa', name: 'Light Sea Green' },
  { hex: '48d1cc', name: 'Medium Turquoise' },
  { hex: '00e5ee', name: 'Dark Turquoise' },
  { hex: 'afeeee', name: 'Pale Turquoise' },
  { hex: '7fffd4', name: 'Aquamarine' },
  { hex: '00ffff', name: 'Aqua' },
  { hex: 'e0ffff', name: 'Light Cyan' },

  // === BLUES ===
  { hex: '0000ff', name: 'Pure Blue' },
  { hex: '4169e1', name: 'Royal Blue' },
  { hex: '0000cd', name: 'Medium Blue' },
  { hex: '191970', name: 'Midnight Blue' },
  { hex: '000080', name: 'Navy' },
  { hex: '6495ed', name: 'Cornflower Blue' },
  { hex: '87ceeb', name: 'Sky Blue' },
  { hex: '87cefa', name: 'Light Sky Blue' },
  { hex: '4682b4', name: 'Steel Blue' },
  { hex: '1e90ff', name: 'Dodger Blue' },

  // === PURPLES ===
  { hex: '800080', name: 'Purple' },
  { hex: '4b0082', name: 'Indigo' },
  { hex: '8a2be2', name: 'Blue Violet' },
  { hex: '9400d3', name: 'Dark Violet' },
  { hex: '9932cc', name: 'Dark Orchid' },
  { hex: 'ba55d3', name: 'Medium Orchid' },
  { hex: 'da70d6', name: 'Orchid' },
  { hex: 'ee82ee', name: 'Violet' },
  { hex: 'dda0dd', name: 'Plum' },
  { hex: 'd8bfd8', name: 'Thistle' },

  // === MAGENTAS ===
  { hex: 'ff00ff', name: 'Pure Magenta' },
  { hex: 'ff1493', name: 'Deep Pink' },
  { hex: 'ff69b4', name: 'Hot Pink' },
  { hex: 'ffc0cb', name: 'Pink' },
  { hex: 'ffb6c1', name: 'Light Pink' },
  { hex: 'db7093', name: 'Pale Violet Red' },
  { hex: 'c71585', name: 'Medium Violet Red' },
  { hex: 'dda0dd', name: 'Plum' },
  { hex: 'ee82ee', name: 'Violet' },
  { hex: 'da70d6', name: 'Orchid' },

  // === GRAYS ===
  { hex: '808080', name: 'Gray' },
  { hex: 'a9a9a9', name: 'Dark Gray' },
  { hex: 'c0c0c0', name: 'Silver' },
  { hex: 'd3d3d3', name: 'Light Gray' },
  { hex: '696969', name: 'Dim Gray' },
  { hex: '778899', name: 'Light Slate Gray' },
  { hex: '708090', name: 'Slate Gray' },
  { hex: '2f4f4f', name: 'Dark Slate Gray' },
  { hex: '000000', name: 'Black' },
  { hex: 'ffffff', name: 'White' },

  // === NEON COLORS ===
  { hex: '00ff00', name: 'Neon Green' },
  { hex: 'ff00ff', name: 'Neon Pink' },
  { hex: '00ffff', name: 'Neon Cyan' },
  { hex: 'ffff00', name: 'Neon Yellow' },
  { hex: 'ff6600', name: 'Neon Orange' },
];

// Pre-compute shuffled popular colors for better performance
const shuffledPopularColors = [...popularHexColors].sort(() => Math.random() - 0.5);

// Static converter configuration
const CONVERTER_CONFIG = {
  id: 'hex-to-pantone-pms',
  sourceColor: 'HEX',
  targetColor: 'PANTONE',
  title: 'HEX to Pantone Color Converter',
  description:
    'Convert HEX color codes to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
  url: '/convert-hex-to-pantone-pms',
  component: 'hex/to-pantone',
  content: 'hex/to-pantone-content',
} as const;

async function getRelatedColors(hex: string, pantone: string): Promise<RelatedColor[]> {
  // Remove the # from hex if present
  const cleanHex = hex.replace('#', '');
  const matches = await findMatchingPMSColors(cleanHex, 32);

  // Filter out the main color and limit to 4 results
  return matches
    .filter(({ pantone: matchPantone }) => matchPantone !== pantone)
    .slice(0, 4)
    .map(({ pantone, hex }) => ({
      name: pantone,
      slug: pantone.toLowerCase().replace(/\s+/g, '-'),
      hex: `#${hex}`,
    }));
}

async function getUniqueColors() {
  const relatedColorsPromises = pantoneCategories.map((category: PantoneCategory) =>
    getRelatedColors(category.hex.replace('#', ''), category.pantone),
  );

  const relatedColorsArrays = await Promise.all(relatedColorsPromises);
  const relatedColors = relatedColorsArrays.flat();

  const hexValuesOnly = popularHexColors.map((color) => ({
    hex: color.hex.toLowerCase(),
  }));

  const allColors = [...relatedColors, ...hexValuesOnly];

  // Remove duplicates
  const uniqueColors = Array.from(
    new Map(allColors.map((item) => [item.hex.toLowerCase(), item])).values(),
  );

  return uniqueColors;
}

export async function generateStaticParams() {
  const uniqueColors = await getUniqueColors();

  return uniqueColors.map((color) => ({
    hex: color.hex.replace('#', '').toLowerCase(),
  }));
}

export async function generateMetadata({ params }: HexPantonePageProps): Promise<Metadata> {
  const hex = (await params).hex;

  if (!isValidHex(hex)) {
    notFound();
  }

  const config = {
    title: `Convert #${hex} to Pantone Color`,
    description: `Convert HEX color #${hex} to its closest Pantone color match. Find the perfect Pantone equivalent for your HEX color code.`,
    keywords: [
      'hex to pantone',
      'color converter',
      'pantone color',
      'hex color',
      'color matching',
      'design colors',
      'brand colors',
      'print colors',
      'digital colors',
      'color palette',
    ],
  };

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: absoluteUrl(`/convert-hex-to-pantone-pms/${hex}`),
    },
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      url: absoluteUrl(`/convert-hex-to-pantone-pms/${hex}`),
      images: [
        {
          url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
          width: siteConfig.openGraph.width,
          height: siteConfig.openGraph.height,
          alt: config.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: config.title,
      description: config.description,
      card: 'summary_large_image',
      creator: siteConfig.creator,
      images: [
        {
          url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
          width: siteConfig.openGraph.width,
          height: siteConfig.openGraph.height,
          alt: config.title,
        },
      ],
    },
  };
}

export default async function HexPantonePage({ params }: HexPantonePageProps) {
  const hex = (await params).hex;

  const isHexValid = isValidHex(hex);

  if (!isHexValid) {
    notFound();
  }

  const JSONLDbreadcrumbs = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      name: 'Home',
    },
    {
      url: absoluteUrl(`/convert-hex-to-pantone-pms`),
      name: 'HEX to Pantone Color Converter',
    },
    {
      url: absoluteUrl(`/convert-hex-to-pantone-pms/${hex}`),
      name: `Convert #${hex} to Pantone Color`,
    },
  ];

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd
        id={absoluteUrl(`/convert-hex-to-pantone-pms/${hex}`)}
        description={CONVERTER_CONFIG.description}
      />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <DynamicConverter componentName={CONVERTER_CONFIG.component} defaultValue={hex} />
      <Wrapper className="mx-auto text-center">
        <div className="mx-auto">
          <LazyAdsLeaderboard />
        </div>
      </Wrapper>
      <Wrapper className="mx-auto text-start">
        <Container className="prose mt-16 dark:prose-invert">
          <h2>Other Popular HEX Colors</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-4">
            {shuffledPopularColors.slice(0, 20).map((color) => (
              <div key={color.hex} className="rounded-lg border p-4">
                <Link
                  href={`/convert-hex-to-pantone-pms/${color.hex}`}
                  className="group no-underline">
                  <span
                    className="mb-2 block h-24 w-full rounded-lg"
                    style={{ backgroundColor: `#${color.hex}` }}
                  />
                  <h3 className="flex items-center text-sm font-medium">
                    {color.name} - #{color.hex}{' '}
                    <ArrowRightIcon className="ml-1 inline-block size-4 transition duration-150 group-hover:translate-x-1" />
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
