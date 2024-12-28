import Script from 'next/script'

export default function JsonLd({
  id,
  children,
}: {
  id: string
  children: object
}) {
  return (
    <>
      <Script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }}
      />
    </>
  )
}
