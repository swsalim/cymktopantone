import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

import { converters } from '@/config/converters';
import { internalTools } from '@/config/tools-internal';
import { ogImages, siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

import { Container } from '@/components/container';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Free Color Tools — Palettes, Gradients, Contrast & More | Color Mapper',
  description:
    'Free online color tools for designers and developers: palette generator, CSS gradients, WCAG contrast checker, tint/shade scales, image extraction, and format converters.',
  url: '/tools',
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: config.url },
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

const categoryLabels: Record<string, string> = {
  generator: 'Generators',
  checker: 'Checkers',
  accessibility: 'Accessibility',
  converter: 'Converters',
};

export default function ToolsHubPage() {
  const byCategory = internalTools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, typeof internalTools>,
  );

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl(config.url)} description={config.description} />
      <BreadcrumbJsonLd
        itemListElements={[
          { url: absoluteUrl('/'), name: 'Home' },
          { url: absoluteUrl('/tools'), name: 'Color Tools' },
        ]}
      />
      <Wrapper className="pb-8 md:pb-12">
        <Container as="section">
          <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white/90 to-cyan-50 p-6 shadow-sm md:p-10 dark:border-violet-500/20 dark:from-violet-500/15 dark:via-gray-900 dark:to-cyan-500/10">
            <p className="mb-4 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
              Free color toolkit
            </p>
            <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight text-gray-900 md:text-5xl dark:text-gray-100">
              Color Tools for Design, Print & Code
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg dark:text-gray-300">
              Generate palettes, build CSS gradients, check WCAG contrast, extract colors from photos,
              and convert between CMYK, RGB, HEX, HSL, and HSV — all free, no account required.
            </p>
          </div>

          {Object.entries(byCategory).map(([category, tools]) => (
            <div key={category} className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {categoryLabels[category] ?? category}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <Link key={tool.id} href={tool.href} className="group block">
                    <Card className="h-full border-violet-200/70 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700">
                      <CardContent className="p-5">
                        <p className="flex items-center justify-between font-medium text-foreground">
                          {tool.title}
                          <ExternalLinkIcon className="size-4 opacity-40 group-hover:opacity-100" />
                        </p>
                        <CardDescription className="mt-2 text-sm leading-relaxed">
                          {tool.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Format converters
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/convert-color" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                View all 17 converters →
              </Link>
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {converters.slice(0, 8).map((c) => (
                <Link
                  key={c.id}
                  href={c.url}
                  className={cn(
                    'rounded-lg border border-violet-200/70 bg-white/80 px-4 py-3 text-sm font-medium text-gray-900 transition hover:border-violet-400 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100',
                  )}>
                  {c.title.replace(' Color Converter', '')}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
