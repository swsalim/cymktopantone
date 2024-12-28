import JsonLd from './json-ld';

export default function BreadcrumbJsonLd({
  itemListElements,
}: {
  itemListElements: {
    position: number;
    item: string;
    name: string;
  }[];
}) {
  const listElement = itemListElements.map((item) => {
    return {
      '@type': 'ListItem',
      position: item.position,
      item: {
        '@id': item.item,
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
