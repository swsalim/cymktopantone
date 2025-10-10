import { Post } from '@/.content-collections/generated';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import JsonLd from '@/components/structured-data/json-ld';

export default function BlogPostJsonLd({ post }: { post: Post }) {
  return (
    <JsonLd id="blog-post-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': absoluteUrl(`/blog/${post._meta.path}`),
        },
        headline: post.title,
        description: post.summary,
        image: absoluteUrl(`/api/og?title=${post.title}`),
        author: {
          '@type': 'Organization',
          name: siteConfig.siteName,
          url: absoluteUrl(),
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.siteName,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/icons/android-chrome-512x512.png'),
          },
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
      }}
    </JsonLd>
  );
}
