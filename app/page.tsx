import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import IndieBoostingAds from '@/components/ads/indie-boosting';
import CmykPantoneContent from '@/components/color-converters/content/cmyk/to-pantone-content';
import CmykPantoneConverter from '@/components/color-converters/converters/cmyk/to-pantone';
import { Container } from '@/components/container';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl()} />

      <CmykPantoneConverter />
      <Wrapper>
        <Container>
          <iframe
            width="100%"
            height="250"
            frameBorder="0"
            className="ta-widget"
            data-min-height="250"
            id="67ee0a352dfc280f879388c3-6603"
            src="https://app.tinyadz.com/widgets/67ee0a352dfc280f879388c3?seed=6603&previewMode=false&showInPopup=false&theme=light"></iframe>
        </Container>
      </Wrapper>
      <CmykPantoneContent />
      <IndieBoostingAds />
    </>
  );
}
