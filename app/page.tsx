import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import CymkPantoneContent from '@/components/cymk-pantone-content';
import CymkPantoneConverter from '@/components/cymk-pantone-converter';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl()} />

      <CymkPantoneConverter />
      <CymkPantoneContent />
    </>
  );
}
