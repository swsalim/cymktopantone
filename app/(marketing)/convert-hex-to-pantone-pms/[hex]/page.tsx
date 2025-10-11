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
  { hex: 'db7093', name: 'Pale Violet Red' },
  { hex: 'c71585', name: 'Medium Violet Red' },
  { hex: 'ff69b4', name: 'Hot Pink' },
  { hex: 'ffdab9', name: 'Peach Puff' },
  { hex: 'ffb7c5', name: 'Cherry Blossom' },

  // === ORANGES ===
  { hex: 'ffa500', name: 'Orange' },
  { hex: 'ff8c00', name: 'Dark Orange' },
  { hex: 'ff7f50', name: 'Coral' },
  { hex: 'ff6347', name: 'Tomato' },
  { hex: 'ffa07a', name: 'Light Salmon' },
  { hex: 'ff4500', name: 'Orange Red' },
  { hex: 'f39c12', name: 'Orange' },
  { hex: 'e67e22', name: 'Carrot' },
  { hex: 'd35400', name: 'Pumpkin' },

  // === YELLOWS ===
  { hex: 'ffff00', name: 'Yellow' },
  { hex: 'ffd700', name: 'Gold' },
  { hex: 'ffffe0', name: 'Light Yellow' },
  { hex: 'fffacd', name: 'Lemon Chiffon' },
  { hex: 'fafad2', name: 'Light Goldenrod' },
  { hex: 'ffefd5', name: 'Papaya Whip' },
  { hex: 'ffe4b5', name: 'Moccasin' },
  { hex: 'f1c40f', name: 'Sun Flower' },
  { hex: 'f39c12', name: 'Orange' },
  { hex: 'ffeb3b', name: 'Material Yellow' },

  // === GREENS ===
  { hex: '00ff00', name: 'Lime' },
  { hex: '008000', name: 'Green' },
  { hex: '00ff7f', name: 'Spring Green' },
  { hex: '00fa9a', name: 'Medium Spring Green' },
  { hex: '90ee90', name: 'Light Green' },
  { hex: '32cd32', name: 'Lime Green' },
  { hex: '228b22', name: 'Forest Green' },
  { hex: '006400', name: 'Dark Green' },
  { hex: '2ecc71', name: 'Emerald' },
  { hex: '27ae60', name: 'Nephritis' },
  { hex: '1abc9c', name: 'Turquoise' },
  { hex: '16a085', name: 'Green Sea' },
  { hex: '4caf50', name: 'Material Green' },
  { hex: '8bc34a', name: 'Material Light Green' },

  // === TEALS & CYANS ===
  { hex: '00ffff', name: 'Cyan/Aqua' },
  { hex: '00ced1', name: 'Dark Turquoise' },
  { hex: '40e0d0', name: 'Turquoise' },
  { hex: '48d1cc', name: 'Medium Turquoise' },
  { hex: '20b2aa', name: 'Light Sea Green' },
  { hex: '008b8b', name: 'Dark Cyan' },
  { hex: '008080', name: 'Teal' },
  { hex: '5f9ea0', name: 'Cadet Blue' },

  // === BLUES ===
  { hex: '0000ff', name: 'Blue' },
  { hex: '0000cd', name: 'Medium Blue' },
  { hex: '00008b', name: 'Dark Blue' },
  { hex: '000080', name: 'Navy' },
  { hex: '191970', name: 'Midnight Blue' },
  { hex: '4169e1', name: 'Royal Blue' },
  { hex: '6495ed', name: 'Cornflower Blue' },
  { hex: '4682b4', name: 'Steel Blue' },
  { hex: '1e90ff', name: 'Dodger Blue' },
  { hex: '00bfff', name: 'Deep Sky Blue' },
  { hex: '87ceeb', name: 'Sky Blue' },
  { hex: '87cefa', name: 'Light Sky Blue' },
  { hex: 'add8e6', name: 'Light Blue' },
  { hex: 'b0c4de', name: 'Light Steel Blue' },
  { hex: '3498db', name: 'Peter River' },
  { hex: '2980b9', name: 'Belize Hole' },
  { hex: '2196f3', name: 'Material Blue' },
  { hex: '03a9f4', name: 'Material Light Blue' },

  // === PURPLES ===
  { hex: '800080', name: 'Purple' },
  { hex: '9370db', name: 'Medium Purple' },
  { hex: '8b008b', name: 'Dark Magenta' },
  { hex: '9400d3', name: 'Dark Violet' },
  { hex: '9932cc', name: 'Dark Orchid' },
  { hex: 'ba55d3', name: 'Medium Orchid' },
  { hex: 'da70d6', name: 'Orchid' },
  { hex: 'ee82ee', name: 'Violet' },
  { hex: 'dda0dd', name: 'Plum' },
  { hex: 'd8bfd8', name: 'Thistle' },
  { hex: 'e6e6fa', name: 'Lavender' },
  { hex: '9b59b6', name: 'Amethyst' },
  { hex: '8e44ad', name: 'Wisteria' },
  { hex: '673ab7', name: 'Material Deep Purple' },
  { hex: '9c27b0', name: 'Material Purple' },

  // === MAGENTAS ===
  { hex: 'ff00ff', name: 'Magenta/Fuchsia' },
  { hex: 'ff00ff', name: 'Fuchsia' },
  { hex: 'c71585', name: 'Medium Violet Red' },
  { hex: 'e91e63', name: 'Material Pink' },

  // === BROWNS ===
  { hex: 'a52a2a', name: 'Brown' },
  { hex: '8b4513', name: 'Saddle Brown' },
  { hex: 'd2691e', name: 'Chocolate' },
  { hex: 'cd853f', name: 'Peru' },
  { hex: 'deb887', name: 'Burlywood' },
  { hex: 'f4a460', name: 'Sandy Brown' },
  { hex: 'd2b48c', name: 'Tan' },
  { hex: 'bc8f8f', name: 'Rosy Brown' },
  { hex: '795548', name: 'Material Brown' },

  // === GRAYS ===
  { hex: '000000', name: 'Black' },
  { hex: '808080', name: 'Gray' },
  { hex: 'a9a9a9', name: 'Dark Gray' },
  { hex: 'c0c0c0', name: 'Silver' },
  { hex: 'd3d3d3', name: 'Light Gray' },
  { hex: 'dcdcdc', name: 'Gainsboro' },
  { hex: 'f5f5f5', name: 'White Smoke' },
  { hex: 'ffffff', name: 'White' },
  { hex: '2c3e50', name: 'Midnight Blue Gray' },
  { hex: '34495e', name: 'Wet Asphalt' },
  { hex: '7f8c8d', name: 'Asbestos' },
  { hex: '95a5a6', name: 'Concrete' },
  { hex: 'bdc3c7', name: 'Silver' },
  { hex: 'ecf0f1', name: 'Clouds' },
  { hex: '607d8b', name: 'Material Blue Gray' },

  // === BRAND COLORS (highly searched) ===
  { hex: '1877f2', name: 'Facebook Blue' },
  { hex: '1da1f2', name: 'Twitter Blue' },
  { hex: '0077b5', name: 'LinkedIn Blue' },
  { hex: 'ff0000', name: 'YouTube Red' },
  { hex: 'e4405f', name: 'Instagram Pink' },
  { hex: '25d366', name: 'WhatsApp Green' },
  { hex: '5865f2', name: 'Discord Blurple' },
  { hex: 'ff4500', name: 'Reddit Orange' },
  { hex: '6441a5', name: 'Twitch Purple' },
  { hex: 'ea4335', name: 'Google Red' },
  { hex: '4285f4', name: 'Google Blue' },
  { hex: 'fbbc05', name: 'Google Yellow' },
  { hex: '34a853', name: 'Google Green' },

  // === MATERIAL DESIGN COLORS ===
  { hex: 'f44336', name: 'Material Red' },
  { hex: 'ff5722', name: 'Material Deep Orange' },
  { hex: 'ff9800', name: 'Material Orange' },
  { hex: 'ffc107', name: 'Material Amber' },
  { hex: 'cddc39', name: 'Material Lime' },
  { hex: '009688', name: 'Material Teal' },
  { hex: '00bcd4', name: 'Material Cyan' },
  { hex: '3f51b5', name: 'Material Indigo' },

  // === PASTEL COLORS ===
  { hex: 'ffb3ba', name: 'Pastel Red' },
  { hex: 'ffdfba', name: 'Pastel Orange' },
  { hex: 'ffffba', name: 'Pastel Yellow' },
  { hex: 'baffc9', name: 'Pastel Green' },
  { hex: 'bae1ff', name: 'Pastel Blue' },
  { hex: 'e0bbe4', name: 'Pastel Purple' },

  // === NEON COLORS ===
  { hex: '00ff00', name: 'Neon Green' },
  { hex: 'ff00ff', name: 'Neon Pink' },
  { hex: '00ffff', name: 'Neon Cyan' },
  { hex: 'ffff00', name: 'Neon Yellow' },
  { hex: 'ff6600', name: 'Neon Orange' },
];

function getRelatedColors(hex: string, pantone: string): RelatedColor[] {
  // Remove the # from hex if present
  const cleanHex = hex.replace('#', '');
  const matches = findMatchingPMSColors(cleanHex, 32);

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

function getUniqueColors() {
  const relatedColors = pantoneCategories.flatMap((category: PantoneCategory) =>
    getRelatedColors(category.hex.replace('#', ''), category.pantone),
  );

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
  const uniqueColors = getUniqueColors();

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
    description: `Convert #${hex} to Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.`,
    url: absoluteUrl(`/convert-hex-to-pantone-pms/${hex}`),
  };

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: config.url,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url,
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

  const converterConfig = {
    id: 'hex-to-pantone-pms',
    sourceColor: 'HEX',
    targetColor: 'PANTONE',
    title: 'HEX to Pantone Color Converter',
    description:
      'Convert HEX color codes to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-hex-to-pantone-pms',
    component: 'hex/to-pantone',
    content: 'hex/to-pantone-content',
  };

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
        description={converterConfig.description}
      />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <DynamicConverter componentName={converterConfig.component} defaultValue={hex} />
      {converterConfig.sourceColor !== 'PANTONE' && (
        <Wrapper className="mx-auto text-center">
          <div className="mx-auto">
            <LazyAdsLeaderboard />
          </div>
        </Wrapper>
      )}
      <Wrapper className="mx-auto text-start">
        <Container className="prose mt-16 dark:prose-invert">
          <h2>Other Popular HEX Colors</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-4">
            {popularHexColors
              .sort(() => Math.random() - 0.5)
              .slice(0, 20)
              .map((color) => (
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
