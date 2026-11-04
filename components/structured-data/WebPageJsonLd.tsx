import { siteConfig } from '@/config/site';

import JsonLd from '@/components/structured-data/json-ld';

export default function WebPageJsonLd({
  id,
  description,
  lastReviewed,
  reviewedBy = siteConfig.siteName,
}: {
  id: string;
  description: string;
  /** Content date. Omit on pages with no review date so the field is not stamped at render time. */
  lastReviewed?: string;
  reviewedBy?: string;
}) {
  return (
    <JsonLd id="webpage-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': id,
        description: description,
        ...(lastReviewed ? { lastReviewed } : {}),
        reviewedBy: {
          type: 'Person',
          name: reviewedBy,
        },
      }}
    </JsonLd>
  );
}
