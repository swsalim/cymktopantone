import JsonLd from '@/components/structured-data/json-ld';

export default function WebPageJsonLd({
  id,
  description,
  lastReviewed,
  reviewedBy,
}: {
  id: string;
  description: string;
  lastReviewed: string;
  reviewedBy: string;
}) {
  return (
    <JsonLd id="webpage-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': id,
        description: description,
        lastReviewed: lastReviewed,
        reviewedBy: {
          type: 'Person',
          name: reviewedBy,
        },
      }}
    </JsonLd>
  );
}
