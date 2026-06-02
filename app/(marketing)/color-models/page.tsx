import { Metadata } from 'next';
import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { colorModelFaqs, colorModels } from '@/config/colors';
import { siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

import { Container } from '@/components/container';
import Faqs from '@/components/faq';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Color Models Guide - CMYK, RGB, HEX, HSL & HSV Explained',
  description:
    'Learn the differences between CMYK, RGB, HEX, HSL, and HSV color models. Discover which model is best for print, web, digital design, and color pickers.',
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

const JSONLDbreadcrumbs = [
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/color-models`),
    name: 'Color Models',
  },
];

export default function ColorModelsPage() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/color-models')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container
          as="section"
          className="prose rounded-3xl border border-violet-200/70 bg-white/80 p-6 shadow-sm dark:prose-invert md:p-10 dark:border-gray-700 dark:bg-gray-900/75">
          <h1 className="mb-6">Color Models: CMYK, RGB, HEX, HSL, and HSV Explained</h1>
          <p className="mb-4 text-lg">
            Color models are the foundation of how we represent and work with colors in digital and
            print media. Whether you're designing a website, preparing print materials, or creating
            digital art, understanding these color systems is essential for achieving accurate,
            consistent results.
          </p>
          <p className="mb-8">
            Each color model—CMYK, RGB, HEX, HSL, and HSV—serves specific purposes and excels in
            different contexts. From the subtractive CMYK system that powers professional printing
            to the additive RGB model that creates vibrant screen displays, and from HEX codes in
            CSS to hue-based models in pickers, each approach offers unique advantages. This guide
            helps you understand when and how to use each model effectively.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {colorModels.map((model) => (
              <Card
                key={model.title}
                className={cn(
                  'not-prose relative h-auto border-violet-200/70 bg-white/85 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50/60 dark:border-gray-700 dark:bg-gray-900/70 dark:hover:bg-violet-500/15',
                )}>
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
                      <h3 className="font-sans">
                        <span className="font-bold text-gray-700 dark:text-gray-50">Best for:</span>{' '}
                        {model.bestFor}
                      </h3>
                    )}
                    {model.coverage && (
                      <h3 className="font-sans">
                        <span className="font-bold text-gray-700 dark:text-gray-50">Coverage:</span>{' '}
                        {model.coverage}
                      </h3>
                    )}
                    {model.benefits && (
                      <h3 className="font-sans">
                        <span className="font-bold text-gray-700 dark:text-gray-50">
                          Key Benefits:
                        </span>{' '}
                        {model.benefits}
                      </h3>
                    )}
                    {model.useCases && (
                      <h3 className="font-sans">
                        <span className="font-bold text-gray-700 dark:text-gray-50">
                          Most common use:
                        </span>{' '}
                        {model.useCases}
                      </h3>
                    )}
                    <Link
                      href={model.href}
                      className={cn(buttonVariants({ variant: 'outline' }), '!mt-6 text-base')}>
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
        <Container>
          <div ta-ad-container=""></div>
        </Container>
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
