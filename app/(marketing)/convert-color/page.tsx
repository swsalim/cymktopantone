import { Metadata } from 'next';
import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { converters } from '@/config/converters';
import { ogImages, siteConfig } from '@/config/site';

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
  title: 'Color Converter Hub — CMYK, RGB, HEX, HSL & HSV',
  description:
    'Convert between CMYK, RGB, HEX, HSL, and HSV with free, fast tools for print production, web design, and brand color work.',
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
    images: ogImages(config.title),
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: config.title,
    description: config.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: ogImages(config.title),
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

const popularWorkflows = [
  {
    href: '/convert-rgb-to-cmyk',
    label: 'RGB to CMYK',
    description: 'Best for preparing digital colors for print.',
  },
  {
    href: '/convert-cmyk-to-rgb',
    label: 'CMYK to RGB',
    description: 'Move print values into screen-ready RGB.',
  },
  {
    href: '/convert-hex-to-cmyk',
    label: 'HEX to CMYK',
    description: 'Turn web brand colors into print percentages.',
  },
  {
    href: '/convert-rgb-to-hex',
    label: 'RGB to HEX',
    description: 'Convert channel values to copy-ready hex codes.',
  },
];

export default function ConvertColorsPage() {
  const groupedConverters = groupConvertersBySource();
  const sourceStyles: Record<
    string,
    {
      sectionBg: string;
      headingText: string;
      cardClass: string;
      iconText: string;
      badgeClass: string;
    }
  > = {
    cmyk: {
      sectionBg: 'bg-yellow-50/60 dark:bg-yellow-500/10',
      headingText: 'text-yellow-800 dark:text-yellow-300',
      cardClass:
        'border-yellow-300/70 bg-white/80 hover:border-yellow-500 hover:bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/20',
      iconText: 'text-yellow-700 dark:text-yellow-300',
      badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-200',
    },
    rgb: {
      sectionBg: 'bg-red-50/60 dark:bg-red-500/10',
      headingText: 'text-red-800 dark:text-red-300',
      cardClass:
        'border-red-300/70 bg-white/80 hover:border-red-500 hover:bg-red-50/50 dark:border-red-800 dark:bg-red-500/10 dark:hover:bg-red-500/20',
      iconText: 'text-red-700 dark:text-red-300',
      badgeClass: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200',
    },
    hex: {
      sectionBg: 'bg-violet-50/60 dark:bg-violet-500/10',
      headingText: 'text-violet-800 dark:text-violet-300',
      cardClass:
        'border-violet-300/70 bg-white/80 hover:border-violet-500 hover:bg-violet-50/50 dark:border-violet-800 dark:bg-violet-500/10 dark:hover:bg-violet-500/20',
      iconText: 'text-violet-700 dark:text-violet-300',
      badgeClass: 'bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200',
    },
    hsl: {
      sectionBg: 'bg-blue-50/60 dark:bg-blue-500/10',
      headingText: 'text-blue-800 dark:text-blue-300',
      cardClass:
        'border-blue-300/70 bg-white/80 hover:border-blue-500 hover:bg-blue-50/50 dark:border-blue-800 dark:bg-blue-500/10 dark:hover:bg-blue-500/20',
      iconText: 'text-blue-700 dark:text-blue-300',
      badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200',
    },
    hsv: {
      sectionBg: 'bg-green-50/60 dark:bg-green-500/10',
      headingText: 'text-green-800 dark:text-green-300',
      cardClass:
        'border-green-300/70 bg-white/80 hover:border-green-500 hover:bg-green-50/50 dark:border-green-800 dark:bg-green-500/10 dark:hover:bg-green-500/20',
      iconText: 'text-green-700 dark:text-green-300',
      badgeClass: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200',
    },
  };

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/convert-color')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper className="pb-8 md:pb-12">
        <Container as="section">
          <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white/90 to-blue-50 p-6 shadow-sm md:p-10 dark:border-violet-500/20 dark:from-violet-500/15 dark:via-gray-900 dark:to-blue-500/10">
            <p className="mb-4 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
              Free Color Conversion Toolkit
            </p>
            <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight text-gray-900 md:text-5xl dark:text-gray-100">
              Convert Colors Across Print and Digital, Fast
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg dark:text-gray-300">
              Use accurate, no-login tools to convert CMYK, RGB, HEX, HSL, and HSV. Whether you are
              building a website, approving packaging proofs, or standardizing brand palettes, start
              with the exact converter you need.
            </p>
            <p className="mt-3 max-w-3xl text-sm text-gray-600 md:text-base dark:text-gray-400">
              New to color systems? Read the <Link href="/color-models">color models guide</Link>,
              then jump into <Link href="/color-models/cmyk">CMYK for print</Link> or{' '}
              <Link href="/color-models/hex">HEX for web design</Link>.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Popular workflows</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Start with these high-traffic tools for brand, packaging, and web handoff work.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {popularWorkflows.map((workflow) => (
                <Link key={workflow.href} href={workflow.href} className="group block">
                  <Card className="border-border/70 hover:border-primary/40 h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="p-5">
                      <p className="flex items-center justify-between text-base font-medium text-foreground">
                        {workflow.label}
                        <ExternalLinkIcon className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
                      </p>
                      <CardDescription className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {workflow.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {Object.entries(groupedConverters).map(([sourceColor, converters], index) => (
        <div key={sourceColor}>
          <Wrapper
            className={cn(
              'border-y border-transparent py-8 transition-colors md:py-12',
              sourceStyles[sourceColor.toLowerCase()]?.sectionBg,
            )}>
            <Container as="section">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                    Start with {sourceColor}
                  </p>
                  <h2
                    className={cn(
                      'mt-2 text-2xl font-semibold md:text-3xl',
                      sourceStyles[sourceColor.toLowerCase()]?.headingText,
                    )}>
                    {sourceColor} converters
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base dark:text-gray-400">
                    Convert {sourceColor} values into the format you need for your next design or
                    production step.
                  </p>
                </div>
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium',
                    sourceStyles[sourceColor.toLowerCase()]?.badgeClass,
                  )}>
                  {converters.length} tools
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {converters.map((converter) => (
                  <Link key={converter.id} href={converter.url}>
                    <Card
                      className={cn(
                        'h-full border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                        sourceStyles[sourceColor.toLowerCase()]?.cardClass,
                      )}>
                      <CardContent className="group relative h-full p-5">
                        <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                          <ExternalLinkIcon
                            className={cn(
                              'h-4 w-4',
                              sourceStyles[sourceColor.toLowerCase()]?.iconText,
                            )}
                          />
                        </div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                          Color converter
                        </p>
                        <CardDescription
                          className={cn(
                            'line-clamp-2 text-base font-semibold',
                            sourceStyles[sourceColor.toLowerCase()]?.iconText,
                          )}>
                          {converter.title}
                        </CardDescription>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {converter.description}
                        </p>
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
        </div>
      ))}
    </>
  );
}
