import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

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
      <Wrapper className="mx-auto text-center">
        <div className="mx-auto max-w-2xl">
          <iframe
            width="100%"
            height="250"
            frameBorder="0"
            className="ta-widget"
            data-min-height="250"
            id="67ee0a352dfc280f879388c3-4728"
            src="https://app.tinyadz.com/widgets/67ee0a352dfc280f879388c3?seed= 4728&previewMode=false&showInPopup=false&theme=light"></iframe>
        </div>
      </Wrapper>
      <CmykPantoneContent />
    </>
  );
}
