import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import CmykPantoneContent from '@/components/color-converters/content/cmyk/to-pantone-content';
import CmykPantoneConverter from '@/components/color-converters/converters/cmyk/to-pantone';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />

      <CmykPantoneConverter />
      <Wrapper className="mx-auto text-center">
        <LazyAdsLeaderboard />
      </Wrapper>
      <CmykPantoneContent />
    </>
  );
}
