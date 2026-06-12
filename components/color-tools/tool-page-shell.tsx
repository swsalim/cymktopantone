import { ReactNode } from 'react';

import { ogImages, siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { ConverterPageIntro } from '@/components/converter-page-intro';
import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import Faqs from '@/components/faq';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';
import { Container } from '@/components/container';
import { Prose } from '@/components/prose';

export interface ToolPageConfig {
  title: string;
  description: string;
  url: string;
  h1?: string;
  intro?: string;
  faq?: { question: string; answer: string }[];
  faqDescription?: string;
  content?: ReactNode;
}

export function buildToolMetadata(config: ToolPageConfig) {
  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: config.url },
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url,
      images: ogImages(config.title),
      locale: 'en_US' as const,
      type: 'website' as const,
    },
    twitter: {
      title: config.title,
      description: config.description,
      card: 'summary_large_image' as const,
      creator: siteConfig.creator,
      images: ogImages(config.title),
    },
  };
}

export function ToolPageShell({
  config,
  children,
}: {
  config: ToolPageConfig;
  children: ReactNode;
}) {
  const breadcrumbs = [
    { url: absoluteUrl('/'), name: 'Home' },
    { url: absoluteUrl('/tools'), name: 'Color Tools' },
    { url: absoluteUrl(config.url), name: config.h1 ?? config.title },
  ];

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl(config.url)} description={config.description} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <ConverterPageIntro
        title={config.h1 ?? config.title}
        description={config.intro ?? config.description}
      />
      {children}
      <Wrapper className="mx-auto text-center">
        <div className="mx-auto">
          <LazyAdsLeaderboard />
        </div>
      </Wrapper>
      {config.content && (
        <Wrapper>
          <Container>
            <Prose>{config.content}</Prose>
          </Container>
        </Wrapper>
      )}
      {config.faq && config.faq.length > 0 && (
        <Wrapper>
          <Container>
            <Faqs
              tagline="FAQ"
              description={config.faqDescription ?? 'Common questions about this tool.'}
              data={config.faq}
            />
          </Container>
        </Wrapper>
      )}
    </>
  );
}
