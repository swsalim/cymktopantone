import { siteConfig } from '@/config/site';

import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { Container } from '@/components/container';
import { HomeBento, HomeFeatures, HomeGuides } from '@/components/pages/homepage/home-bento';
import { HomeHero } from '@/components/pages/homepage/home-hero';
import GeneralFaqs from '@/components/pages/homepage/faq';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />

      <HomeHero />

      <Container>
        <Wrapper size="sm" className="space-y-16 md:space-y-24">
          <HomeBento />
          <HomeFeatures />
        </Wrapper>
      </Container>

      <Container className="text-center">
        <LazyAdsLeaderboard />
      </Container>

      <Container>
        <Wrapper size="sm" className="space-y-16 md:space-y-24">
          <HomeGuides />
          <GeneralFaqs />
        </Wrapper>
      </Container>
    </>
  );
}
