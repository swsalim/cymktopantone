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

function CategoryUsageLinks({
  hex,
}: {
  hex: string;
}) {
  const hexSlug = hex.replace('#', '');
  return (
    <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-50">
      Pair this swatch with production workflows using our{' '}
      <Link
        className="font-medium text-foreground underline-offset-4 hover:underline"
        href="/convert-color">
        color converters
      </Link>{' '}
      when you need HEX, RGB, CMYK, HSL, or HSV equivalents. For a closest Pantone match from a web code, jump to{' '}
      <Link
        className="font-medium text-foreground underline-offset-4 hover:underline"
        href={`/convert-hex-to-pantone-pms/${hexSlug}`}>
        HEX to Pantone for this color
      </Link>
      . If you are briefing a printer, it helps to know whether the job uses{' '}
      <Link
        className="font-medium text-foreground underline-offset-4 hover:underline"
        href="/blog/spot-color-process-color">
        spot (PMS) ink or process (CMYK) builds
      </Link>
      —specifications and proofs differ between the two.
    </p>
  );
}

function CategoryPsychologyLinks() {
  return (
    <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-50">
      Perception shifts with lighting, adjacent colors, and culture—use psychology as a guide, not a rule. For how hue,
      saturation, and brightness behave in design systems, read our{' '}
      <Link
        className="font-medium text-foreground underline-offset-4 hover:underline"
        href="/blog/color-theory-101">
        color theory basics
      </Link>
      . When you need the same Pantone story on screens and in print, see{' '}
      <Link
        className="font-medium text-foreground underline-offset-4 hover:underline"
        href="/blog/pantone-digital-branding">
        Pantone in digital branding
      </Link>
      , and our overview of{' '}
      <Link
        className="font-medium text-foreground underline-offset-4 hover:underline"
        href="/color-models">
        RGB, CMYK, HEX, HSL, and HSV
      </Link>
      .
    </p>
  );
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
        description={`${pantoneCategory.shortDescription} See HEX, RGB, CMYK, HSL, and HSV values, usage ideas, and related Pantone hues.`}
      />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
          <h1>{pantoneCategory.name}</h1>
          <p>{pantoneCategory.description}</p>
          <p>
            Use these values alongside our{' '}
            <Link href="/convert-pantone-pms-to-hex">Pantone to HEX</Link>,{' '}
            <Link href="/convert-pantone-pms-to-cmyk">Pantone to CMYK</Link>, and{' '}
            <Link href="/convert-pantone-pms-to-rgb">Pantone to RGB</Link> converters when you need
            to hand off exact numbers to developers or printers. Browse the full{' '}
            <Link href="/pantone-colors">Pantone color library</Link> for more families.
          </p>
          <h2>Quick answers</h2>
          <p>
            <strong>Is this the same as my physical swatch?</strong> On-screen approximations depend
            on your display calibration. Always confirm critical jobs with a printed Pantone guide or
            press proof.
          </p>
          <p>
            <strong>Which suffix do I use?</strong> &quot;C&quot; (coated) and &quot;U&quot;
            (uncoated) refer to different ink films—follow your brand standards when specifying PMS
            for vendors.
          </p>
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
                  <h2 className="text-2xl font-bold">Color usage</h2>
                  <p className="mt-4 leading-relaxed">{pantoneCategory.usage}</p>
                  <CategoryUsageLinks hex={pantoneCategory.hex} />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h2 className="text-2xl font-bold">Color psychology</h2>
                  <p className="mt-4 leading-relaxed">{pantoneCategory.psychology}</p>
                  <CategoryPsychologyLinks />
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
                <div key={color.slug} className="rounded-lg border p-4 dark:border-gray-700">
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
