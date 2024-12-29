import { siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

import ColorConverter from '@/components/color-converter';
import Content from '@/components/pages/homepage/content';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

export default function Home() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl()} />

      <ColorConverter />
      <Content />
    </>
  );
}
