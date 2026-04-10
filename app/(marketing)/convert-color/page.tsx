import { Metadata } from 'next';
import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { converters } from '@/config/converters';
import { siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

import { Container } from '@/components/container';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

function groupConvertersBySource() {
  const grouped = converters.reduce(
    (acc, converter) => {
      if (!acc[converter.sourceColor]) {
        acc[converter.sourceColor] = [];
      }
      acc[converter.sourceColor].push(converter);
      return acc;
    },
    {} as Record<string, typeof converters>,
  );

  return grouped;
}

const config = {
  title: 'Color Converters — CMYK, RGB, HEX, HSL, HSV & Pantone',
  description:
    'Browse every free converter on CMYK Pantone: CMYK, RGB, HEX, HSL, HSV, and Pantone (PMS). Jump straight to the pair you need for print, web, or brand work.',
  url: '/convert-color',
};

export const metadata: Metadata = {
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

const JSONLDbreadcrumbs = [
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/convert-color`),
    name: 'Color Converters',
  },
];

export default function ConvertColorsPage() {
  const groupedConverters = groupConvertersBySource();

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/convert-color')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper className="md:pb-12">
        <Container as="div" className="prose dark:prose-invert">
          <h1>Color Converters</h1>
          <p>
            Explore our comprehensive collection of color conversion tools. Convert between CMYK,
            RGB, HEX, HSL, HSV, and Pantone (PMS) in both directions—whether you are prepping print
            files, shipping CSS tokens, or matching a screen swatch to a spot color.
          </p>
          <p>
            Not sure which model to use? Start with the{' '}
            <Link href="/color-models">color models overview</Link>, then dive into{' '}
            <Link href="/color-models/cmyk">CMYK for print</Link> or{' '}
            <Link href="/color-models/hex">HEX for the web</Link>. For brand-critical matches, try
            the <Link href="/convert-cmyk-to-pantone-pms">CMYK to Pantone</Link> or{' '}
            <Link href="/convert-hex-to-pantone-pms">HEX to Pantone</Link> tools first. For a known
            PMS code, open the <Link href="/pantone">Pantone color lookup</Link> and copy HEX, RGB,
            and CMYK in one place. For several brand colors at once, use the{' '}
            <Link href="/brand-palette-to-pantone">brand palette to Pantone</Link> exporter.
          </p>
        </Container>
      </Wrapper>

      {Object.entries(groupedConverters).map(([sourceColor, converters], index) => (
        <>
          <Wrapper
            key={sourceColor}
            className={cn(
              'transition-colors md:py-12',
              sourceColor.toLowerCase() === 'cmyk' && 'bg-yellow-50/70 dark:bg-yellow-500/10',
              sourceColor.toLowerCase() === 'rgb' && 'bg-red-50/70 dark:bg-red-500/10',
              sourceColor.toLowerCase() === 'hex' && 'bg-violet-50/70 dark:bg-violet-500/10',
              sourceColor.toLowerCase() === 'hsl' && 'bg-blue-50/70 dark:bg-blue-500/10',
              sourceColor.toLowerCase() === 'hsv' && 'bg-green-50/70 dark:bg-green-500/10',
              sourceColor.toLowerCase() === 'pantone' && 'bg-gray-50/70 dark:bg-gray-500/10',
            )}>
            <Container as="div" className="prose dark:prose-invert">
              <h2
                className={cn(
                  'mb-6',
                  sourceColor.toLowerCase() === 'cmyk' && 'text-yellow-700 dark:text-yellow-300',
                  sourceColor.toLowerCase() === 'rgb' && 'text-red-700 dark:text-red-300',
                  sourceColor.toLowerCase() === 'hex' && 'text-violet-700 dark:text-violet-300',
                  sourceColor.toLowerCase() === 'hsl' && 'text-blue-700 dark:text-blue-300',
                  sourceColor.toLowerCase() === 'hsv' && 'text-green-700 dark:text-green-300',
                  sourceColor.toLowerCase() === 'pantone' && 'text-gray-700 dark:text-gray-300',
                )}>
                {sourceColor} Converters
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {converters.map((converter) => (
                  <Link key={converter.id} href={converter.url} className="not-prose">
                    <Card
                      className={cn(
                        'h-auto transition-colors',
                        sourceColor.toLowerCase() === 'cmyk' &&
                          'border-yellow-500/50 bg-yellow-100/80 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/30',
                        sourceColor.toLowerCase() === 'rgb' &&
                          'border-red-500/50 bg-red-100/80 hover:bg-red-100 dark:border-red-800 dark:bg-red-500/10 dark:hover:bg-red-500/30',
                        sourceColor.toLowerCase() === 'hex' &&
                          'border-violet-500/50 bg-violet-100/80 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-500/10 dark:hover:bg-violet-500/30',
                        sourceColor.toLowerCase() === 'hsl' &&
                          'border-blue-500/50 bg-blue-100/80 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-500/10 dark:hover:bg-blue-500/30',
                        sourceColor.toLowerCase() === 'hsv' &&
                          'border-green-500/50 bg-green-100/80 hover:bg-green-100 dark:border-green-800 dark:bg-green-500/10 dark:hover:bg-green-500/30',
                        sourceColor.toLowerCase() === 'pantone' &&
                          'border-gray-500/50 bg-gray-100/80 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-500/10 dark:hover:bg-gray-500/30',
                      )}>
                      <CardContent className="group relative">
                        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <ExternalLinkIcon
                            className={cn(
                              'h-4 w-4',
                              sourceColor.toLowerCase() === 'cmyk' &&
                                'text-yellow-700 dark:text-yellow-300',
                              sourceColor.toLowerCase() === 'rgb' &&
                                'text-red-700 dark:text-red-300',
                              sourceColor.toLowerCase() === 'hex' &&
                                'text-violet-700 dark:text-violet-300',
                              sourceColor.toLowerCase() === 'hsl' &&
                                'text-blue-700 dark:text-blue-300',
                              sourceColor.toLowerCase() === 'hsv' &&
                                'text-green-700 dark:text-green-300',
                              sourceColor.toLowerCase() === 'pantone' &&
                                'text-gray-700 dark:text-gray-300',
                            )}
                          />
                        </div>
                        <CardDescription
                          className={cn(
                            'text-base font-medium',
                            sourceColor.toLowerCase() === 'cmyk' &&
                              'text-yellow-700 dark:text-yellow-300',
                            sourceColor.toLowerCase() === 'rgb' && 'text-red-700 dark:text-red-300',
                            sourceColor.toLowerCase() === 'hex' &&
                              'text-violet-700 dark:text-violet-300',
                            sourceColor.toLowerCase() === 'hsl' &&
                              'text-blue-700 dark:text-blue-300',
                            sourceColor.toLowerCase() === 'hsv' &&
                              'text-green-700 dark:text-green-300',
                            sourceColor.toLowerCase() === 'pantone' &&
                              'text-gray-700 dark:text-gray-300',
                          )}>
                          {converter.title}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </Container>
          </Wrapper>
          {index === 1 && (
            <Wrapper className="mx-auto text-center">
              <div className="mx-auto max-w-2xl">
                <div ta-ad-container=""></div>
              </div>
            </Wrapper>
          )}
        </>
      ))}
    </>
  );
}
