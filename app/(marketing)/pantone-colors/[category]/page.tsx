import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowRightIcon } from 'lucide-react';

import { pantoneCategories } from '@/config/pantoneCategories';
import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { ColorGrid } from '@/components/pantone/color-grid';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Card, CardContent } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = (await params).category;
  const pantoneCategory = pantoneCategories.find((c) => c.slug === category);

  if (!pantoneCategory) {
    return {};
  }

  const config = {
    title: pantoneCategory.name,
    description: pantoneCategory.shortDescription,
    url: `/pantone-colors/${pantoneCategory.slug}`,
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

export async function generateStaticParams() {
  return pantoneCategories.map((color) => ({ category: color.slug }));
}

export default async function PantoneCategoryPage({ params }: PageProps) {
  const category = (await params).category;
  const pantoneCategory = pantoneCategories.find((c) => c.slug === category);

  if (!pantoneCategory) {
    notFound();
  }

  const JSONLDbreadcrumbs = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      name: 'Home',
    },
    {
      url: absoluteUrl(`/pantone-colors`),
      name: 'Pantone Colors',
    },
    {
      url: absoluteUrl(`/pantone-colors/${pantoneCategory.slug}`),
      name: pantoneCategory.name,
    },
  ];

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd
        id={absoluteUrl(`/pantone-colors/${pantoneCategory.slug}`)}
        description={`Find out more about ${pantoneCategory.name} and its meaning in the world of color.`}
      />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
          <h1>{pantoneCategory.name}</h1>
          <p>{pantoneCategory.description}</p>
        </Container>

        <Container className="pb-10 md:pb-14">
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            <ColorGrid
              color={{
                hex: pantoneCategory.hex,
                name: pantoneCategory.name,
                pantone: pantoneCategory.pantone,
                rgb: pantoneCategory.rgb,
                cmyk: pantoneCategory.cmyk,
                hsl: pantoneCategory.hsl,
                hsv: pantoneCategory.hsv,
              }}
            />
            <div className="flex flex-col gap-4">
              <Card>
                <CardContent>
                  <h2 className="text-2xl font-bold">Color Usage</h2>
                  <p className="mt-4">{pantoneCategory.usage}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h2 className="text-2xl font-bold">Color Psychology</h2>
                  <p className="mt-4">{pantoneCategory.psychology}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>

        {pantoneCategory.relatedColors.length > 0 && (
          <Container>
            <h2 className="text-2xl font-bold">Related Colors</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {pantoneCategory.relatedColors.map((color) => (
                <div key={color.slug} className="rounded-lg border p-4">
                  <Link
                    href={`/convert-hex-to-pantone-pms/${color.hex.replace('#', '')}`}
                    className="group">
                    <span
                      className="mb-2 block h-24 w-full rounded-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <h3 className="flex items-center text-sm font-medium">
                      {color.name}{' '}
                      <ArrowRightIcon className="ml-1 inline-block size-4 transition duration-150 group-hover:translate-x-1" />
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        )}
      </Wrapper>
    </>
  );
}
