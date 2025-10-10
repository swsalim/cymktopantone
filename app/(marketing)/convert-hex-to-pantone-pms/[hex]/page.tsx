import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { pantoneCategories, PantoneCategory } from '@/config/pantoneCategories';
import { siteConfig } from '@/config/site';

import { findMatchingPMSColors, isValidHex } from '@/lib/colors';
import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { DynamicConverter } from '@/components/dynamic-converter';
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

export async function generateStaticParams() {
  const relatedColors = pantoneCategories.flatMap((category: PantoneCategory) =>
    getRelatedColors(category.hex.replace('#', ''), category.pantone),
  );

  return relatedColors.map((color) => ({
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

  // Dynamically import the content component if it exists
  const ContentComponent = converterConfig.content
    ? dynamic(() => import(`@/components/color-converters/content/${converterConfig.content}`), {
        ssr: true,
      })
    : null;

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd
        id={absoluteUrl(`/convert-hex-to-pantone-pms/${hex}`)}
        description={converterConfig.description}
      />

      <DynamicConverter componentName={converterConfig.component} defaultValue={hex} />
      {converterConfig.sourceColor !== 'PANTONE' && (
        <Wrapper className="mx-auto text-center">
          <div className="mx-auto">
            <LazyAdsLeaderboard />
          </div>
        </Wrapper>
      )}
      {ContentComponent && <ContentComponent />}
    </>
  );
}
