import { Post } from '@/.content-collections/generated';

import { absoluteUrl } from '@/lib/utils';

import JsonLd from '@/components/structured-data/json-ld';

export default function BlogPageJsonLd({ posts }: { posts: Post[] }) {
  return (
    <JsonLd id="blog-page-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'BlogPage',
        name: 'RGB to CMYK Blog',
        url: absoluteUrl('/blog'),
        description:
          'Explore practical guides and tutorials for RGB, CMYK, HEX, HSL, and HSV color conversion.',
        blogPosts: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.summary,
          url: absoluteUrl(`/blog/${post._meta.path}`),
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author,
          },
        })),
      }}
    </JsonLd>
  );
}
