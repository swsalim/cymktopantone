import { siteConfig } from '@/config/site';

import { getContentComponent } from '@/lib/dynamic-content-components';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { ConverterPageIntro } from '@/components/converter-page-intro';
import { DynamicConverter } from '@/components/dynamic-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const HomeContent = getContentComponent('rgb/to-cmyk-content');

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />

      <ConverterPageIntro title={siteConfig.title} description={siteConfig.description} />
      <DynamicConverter componentName="rgb/to-cmyk" />
      <Wrapper className="mx-auto text-center">
        <LazyAdsLeaderboard />
      </Wrapper>
      {HomeContent ? <HomeContent /> : null}
    </>
  );
}
