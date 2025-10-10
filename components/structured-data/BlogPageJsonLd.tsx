import { Post } from '@/.content-collections/generated';

import { absoluteUrl } from '@/lib/utils';

import JsonLd from '@/components/structured-data/json-ld';

export default function BlogPageJsonLd({ posts }: { posts: Post[] }) {
  return (
    <JsonLd id="blog-page-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'BlogPage',
        name: 'CMYK Pantone Blog',
        url: absoluteUrl('/blog'),
        description:
          'Explore the latest news, tips, and guides on color conversions, Pantone color of the year, and more.',
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
