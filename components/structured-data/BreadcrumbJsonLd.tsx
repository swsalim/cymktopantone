import JsonLd from '@/components/structured-data/json-ld';

export default function BreadcrumbJsonLd({
  itemListElements,
}: {
  itemListElements: {
    url: string;
    name: string;
  }[];
}) {
  const listElement = itemListElements.map((item, index) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.name,
      },
    };
  });

  return (
    <JsonLd id="breadcrumb-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: listElement,
      }}
    </JsonLd>
  );
}
