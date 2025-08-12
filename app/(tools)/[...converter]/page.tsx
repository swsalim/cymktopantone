import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { ConverterConfig, getAllConverters, getConverterByUrl } from '@/config/converters';
import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { DynamicConverter } from '@/components/dynamic-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

interface ConverterPageProps {
  params: Promise<{
    converter: string[];
  }>;
}

export async function generateStaticParams() {
  const converters = getAllConverters();

  return converters.map((converter: ConverterConfig) => ({
    converter: converter.url.split('/').filter(Boolean),
  }));
}

export async function generateMetadata({ params }: ConverterPageProps): Promise<Metadata> {
  const converter = (await params).converter;
  const path = `/${converter.join('/')}`;
  const converterConfig = getConverterByUrl(path);

  if (!converterConfig) {
    notFound();
  }

  return {
    title: converterConfig.title,
    description: converterConfig.description,
    alternates: {
      canonical: converterConfig.url,
    },
    openGraph: {
      title: converterConfig.title,
      description: converterConfig.description,
      url: converterConfig.url,
      images: [
        {
          url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${converterConfig.title}`),
          width: siteConfig.openGraph.width,
          height: siteConfig.openGraph.height,
          alt: converterConfig.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: converterConfig.title,
      description: converterConfig.description,
      card: 'summary_large_image',
      creator: siteConfig.creator,
      images: [
        {
          url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${converterConfig.title}`),
          width: siteConfig.openGraph.width,
          height: siteConfig.openGraph.height,
          alt: converterConfig.title,
        },
      ],
    },
  };
}

export default async function ConverterPage({ params }: ConverterPageProps) {
  const converter = (await params).converter;
  const path = `/${converter.join('/')}`;
  const converterConfig = getConverterByUrl(path);

  if (!converterConfig) {
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
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl(converterConfig.url)} />

      <DynamicConverter componentName={converterConfig.component} />
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
