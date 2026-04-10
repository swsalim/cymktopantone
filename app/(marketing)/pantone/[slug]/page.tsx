import { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PMS } from '@/config/colors';
import { siteConfig } from '@/config/site';

import { convertPantoneToHex } from '@/lib/colors';
import {
  getPantoneLookupDisplay,
  getPantoneNameFromSlug,
  pantoneNameToSlug,
} from '@/lib/pantone-lookup';
import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { ConverterPageIntro } from '@/components/converter-page-intro';
import { Container } from '@/components/container';
import { ColorGrid } from '@/components/pantone/color-grid';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Card, CardContent } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

interface PantoneSlugPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return PMS.map((name) => ({ slug: pantoneNameToSlug(name) }));
}

export async function generateMetadata({ params }: PantoneSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pantoneName = getPantoneNameFromSlug(slug);
  if (!pantoneName) {
    return { title: 'Not found' };
  }

  const rawHex = convertPantoneToHex(pantoneName);
  const hexLabel = rawHex ? `#${rawHex}` : '';
  const title = `Pantone ${pantoneName} — HEX ${hexLabel} & RGB lookup`;
  const description = `Pantone ${pantoneName} digital values: HEX ${hexLabel}, RGB, approximate CMYK, HSL, and HSV. sRGB approximation for screens; confirm print with a Pantone guide.`;

  const url = `/pantone/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent(title)}`),
          width: siteConfig.openGraph.width,
          height: siteConfig.openGraph.height,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      creator: siteConfig.creator,
      images: [
        {
          url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent(title)}`),
          width: siteConfig.openGraph.width,
          height: siteConfig.openGraph.height,
          alt: title,
        },
      ],
    },
  };
}

export default async function PantoneSlugPage({ params }: PantoneSlugPageProps) {
  const { slug } = await params;
  const pantoneName = getPantoneNameFromSlug(slug);
  if (!pantoneName) {
    notFound();
  }

  const color = getPantoneLookupDisplay(pantoneName);
  if (!color) {
    notFound();
  }

  const rawHex = convertPantoneToHex(pantoneName);
  const hexForMatcher = rawHex ?? '';

  const description = `sRGB-based values for Pantone ${pantoneName}. Use copy buttons for handoffs; validate spot color on press with official swatches.`;

  const JSONLDbreadcrumbs = [
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}`, name: 'Home' },
    { url: absoluteUrl('/pantone'), name: 'Pantone color lookup' },
    { url: absoluteUrl(`/pantone/${slug}`), name: `Pantone ${pantoneName}` },
  ];

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl(`/pantone/${slug}`)} description={description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <ConverterPageIntro
        title={`Pantone ${pantoneName}`}
        description={`HEX ${color.hex}, RGB (${color.rgb}), and related spaces—ready to copy for CSS, Figma, or spec sheets.`}
      />
      <Wrapper className="pb-12 md:pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <ColorGrid color={color} />
            <div className="flex flex-col gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Print and web
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    On-screen hex and RGB are approximations of coated Pantone solids. Ink, paper,
                    and lighting change how color reads in production.
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      <Link href="/convert-pantone-pms-to-cmyk" className="text-violet-600 underline-offset-2 hover:underline dark:text-violet-400">
                        Pantone to CMYK
                      </Link>{' '}
                      for process builds
                    </li>
                    <li>
                      <Link href="/convert-pantone-pms-to-hex" className="text-violet-600 underline-offset-2 hover:underline dark:text-violet-400">
                        Pantone to HEX
                      </Link>{' '}
                      (full grid)
                    </li>
                    {hexForMatcher ? (
                      <li>
                        <Link
                          href={`/convert-hex-to-pantone-pms/${hexForMatcher}`}
                          className="text-violet-600 underline-offset-2 hover:underline dark:text-violet-400">
                          Closest Pantone from this HEX
                        </Link>
                      </li>
                    ) : null}
                    <li>
                      <Link href="/pantone" className="text-violet-600 underline-offset-2 hover:underline dark:text-violet-400">
                        Look up another swatch
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Wrapper>
      <LazyAdsLeaderboard />
    </>
  );
}
