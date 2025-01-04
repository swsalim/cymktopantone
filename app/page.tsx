import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import CmykPantoneContent from '@/components/cmyk-pantone-content';
import CmykPantoneConverter from '@/components/cmyk-pantone-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl()} />

      <CmykPantoneConverter />
      <CmykPantoneContent />
    </>
  );
}
