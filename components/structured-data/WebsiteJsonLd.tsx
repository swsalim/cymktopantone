import { canonicalUrl } from '@/lib/utils';

import JsonLd from '@/components/structured-data/json-ld';

export default function WebsiteJsonLd({ company }: { company: string }) {
  return (
    <JsonLd id="website-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: company,
        url: canonicalUrl(),
        inLanguage: 'en-US',
      }}
    </JsonLd>
  );
}
