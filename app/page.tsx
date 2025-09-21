import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import SponsoredSlot from '@/components/ads/sponsored-slot';
import CmykPantoneContent from '@/components/color-converters/content/cmyk/to-pantone-content';
import CmykPantoneConverter from '@/components/color-converters/converters/cmyk/to-pantone';
import { Container } from '@/components/container';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl()} />
      <Wrapper className="mx-auto my-0 py-0 pt-12 text-center md:py-0 md:pt-12">
        <Container className="mx-auto max-w-[320px] px-0 md:max-w-[728px]">
          <SponsoredSlot href="https://unicornplatform.com/?via=yuyu" />
        </Container>
      </Wrapper>
      <CmykPantoneConverter />
      <Wrapper className="mx-auto text-center">
        <LazyAdsLeaderboard />
      </Wrapper>
      <CmykPantoneContent />
    </>
  );
}
