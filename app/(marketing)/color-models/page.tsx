import { Metadata } from 'next';
import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { colorModelFaqs, colorModels } from '@/config/colors';
import { siteConfig } from '@/config/site';

import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import Faqs from '@/components/faq';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Color Models Guide - CMYK, RGB, HEX & HSL Explained',
  description:
    'Learn the differences between CMYK, RGB, HEX, and HSL color models. Discover which model is best for print, web, and digital design, with examples of real-world use.',
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
    <>
      <Wrapper>
        <Container as="section" className="prose dark:prose-invert">
          <h1 className="mb-6">Color Models: CMYK, RGB, HEX, and HSL Explained</h1>
          <p className="mb-8">
            Learn about different color models and how they represent colors in various contexts.
            Each model has its unique characteristics and applications in design and development.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {colorModels.map((model) => (
              <Card
                key={model.title}
                className={cn('not-prose relative h-auto transition-colors hover:bg-gray-100/80')}>
                <CardContent className={cn('group relative text-base font-medium')}>
                  <Link
                    href={model.href}
                    className="absolute right-4 top-4 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                  <CardTitle className="mb-2 text-lg">What is {model.title}?</CardTitle>
                  <CardDescription className={cn('space-y-2 text-base')}>
                    <p className="mb-4">{model.description}</p>
                    {model.bestFor && (
                      <h3>
                        <span className="font-bold text-gray-700 dark:text-gray-50">Best for:</span>{' '}
                        {model.bestFor}
                      </h3>
                    )}
                    {model.coverage && (
                      <h3>
                        <span className="font-bold text-gray-700 dark:text-gray-50">Coverage:</span>{' '}
                        {model.coverage}
                      </h3>
                    )}
                    {model.benefits && (
                      <h3>
                        <span className="font-bold text-gray-700 dark:text-gray-50">
                          Key Benefits:
                        </span>{' '}
                        {model.benefits}
                      </h3>
                    )}
                    {model.useCases && (
                      <h3>
                        <span className="font-bold text-gray-700 dark:text-gray-50">
                          Most common use:
                        </span>{' '}
                        {model.useCases}
                      </h3>
                    )}
                    <Link
                      href={model.href}
                      className={cn(buttonVariants({ variant: 'outline' }), '!mt-6')}>
                      Learn more about {model.title} color model
                    </Link>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Wrapper>
      <Wrapper className="mx-auto text-center">
        <div className="mx-auto">
          <div ta-ad-container=""></div>
        </div>
      </Wrapper>
      <Wrapper className="pb-20 md:pb-24">
        <Container>
          <Faqs
            tagline="A list of questions we get asked often"
            description="Have questions about color models? We've got you covered."
            data={colorModelFaqs}
          />
        </Container>
      </Wrapper>
    </>
  );
}
