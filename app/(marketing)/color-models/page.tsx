import { Metadata } from 'next';
import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { colorModels } from '@/config/colors';
import { siteConfig } from '@/config/site';

import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Color Models Guide - CMYK, RGB, HEX & HSL Explained',
  description:
    'Complete guide to color models - CMYK, RGB, HEX, and HSL. Learn how each model works and their applications in design and development.',
  url: '/color-models',
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

export default function ColorModelsPage() {
  return (
    <Wrapper>
      <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
        <h1 className="mb-6">Color Models</h1>
        <p className="mb-8">
          Learn about different color models and how they represent colors in various contexts. Each
          model has its unique characteristics and applications in design and development.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {colorModels.map((model) => (
            <Link key={model.title} href={model.href} className="not-prose">
              <Card className={cn('h-augo transition-colors hover:bg-gray-100/80')}>
                <CardContent className={cn('group relative text-base font-medium')}>
                  <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </div>
                  <CardTitle className="mb-2 text-lg">{model.title}</CardTitle>
                  <CardDescription className={cn('space-y-2 text-base')}>
                    {model.bestFor && (
                      <p>
                        <span className="font-bold text-gray-700 dark:text-gray-50">Best for:</span>{' '}
                        {model.bestFor}
                      </p>
                    )}
                    {model.coverage && (
                      <p>
                        <span className="font-bold text-gray-700 dark:text-gray-50">Coverage:</span>{' '}
                        {model.coverage}
                      </p>
                    )}
                    {model.benefits && (
                      <p>
                        <span className="font-bold text-gray-700 dark:text-gray-50">
                          Key Benefits:
                        </span>{' '}
                        {model.benefits}
                      </p>
                    )}
                    {model.useCases && (
                      <p>
                        <span className="font-bold text-gray-700 dark:text-gray-50">
                          Most common use:
                        </span>{' '}
                        {model.useCases}
                      </p>
                    )}
                    <Link
                      href={model.href}
                      className={cn(buttonVariants({ variant: 'outline' }), '!mt-6')}>
                      Learn {model.title}
                    </Link>
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
      <Wrapper className="mx-auto text-center">
        <div className="mx-auto">
          <div ta-ad-container=""></div>
        </div>
      </Wrapper>
    </Wrapper>
  );
}
