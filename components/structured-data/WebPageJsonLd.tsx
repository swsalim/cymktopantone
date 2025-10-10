import JsonLd from '@/components/structured-data/json-ld';

export default function WebPageJsonLd({
  id,
  description,
  reviewedBy = 'CMYK Pantone',
}: {
  id: string;
  description: string;
  reviewedBy?: string;
}) {
  return (
    <JsonLd id="webpage-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': id,
        description: description,
        lastReviewed: new Date().toISOString(),
        reviewedBy: {
          type: 'Person',
          name: reviewedBy,
        },
      }}
    </JsonLd>
  );
}
