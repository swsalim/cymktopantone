import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import GeneralFaqs from '@/components/pages/homepage/faq';
import Features from '@/components/pages/homepage/features';
import Hero from '@/components/pages/homepage/hero';
import Steps from '@/components/pages/homepage/steps';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl()} />
      <Hero />
      <Wrapper>
        <Container>
          <Steps />
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <Features />
        </Container>
      </Wrapper>
      <Wrapper className="bg-gray-50 dark:bg-gray-900" size="lg">
        <Container>
          <GeneralFaqs />
        </Container>
      </Wrapper>
    </>
  );
}
