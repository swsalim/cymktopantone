import Link from 'next/link';

import { allPosts } from 'content-collections';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { ImageKit } from '@/components/image-kit';
import BlogPageJsonLd from '@/components/structured-data/BlogPageJsonLd';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';

const seo = {
  title: 'CMYK Pantone Blog: Color Conversions Guide and More',
  description: 'Explore CMYK to Pantone color conversions, Pantone color of the year, and more.',
  url: absoluteUrl('/blog'),
  creator: '@cmyktopantone',
  company: 'CMYK Pantone',
};

export const metadata = {
  title: {
    absolute: seo.title,
  },
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    images: [
      {
        url: absoluteUrl('/api/og?title=Blog'),
        width: 1200,
        height: 630,
      },
    ],
    siteName: seo.company,
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: seo.title,
    description: seo.description,
    images: [absoluteUrl('/api/og?title=Blog')],
    card: 'summary_large_image',
    creator: seo.creator,
  },
  alternates: {
    canonical: seo.url,
  },
};

const JSONLDbreadcrumbs = [
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/blog`),
    name: 'Blog',
  },
];

export default function BlogPage() {
  const posts =
    process.env.NODE_ENV === 'development'
      ? allPosts
      : allPosts.filter((post) => post.status === 'published');

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <BlogPageJsonLd posts={sortedPosts} />
      <WebPageJsonLd id={absoluteUrl('/blog')} description={seo.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <main className="container mx-auto max-w-7xl space-y-16 px-4 py-8 md:py-16">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
          Blog
        </h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-400">
          Explore latest news, tips, and guides on color conversions, Pantone color of the year, and
          more.
        </p>

        <div className="divide-brand-100 grid grid-cols-1 divide-x-[1px] divide-y-[1px] divide-solid sm:grid-cols-2 md:grid-cols-3 [&>*:nth-child(1n)]:border-r-0 sm:[&>*:nth-child(1n)]:border-r-[1px] sm:[&>*:nth-child(2n)]:border-r-0 md:[&>*:nth-child(2n)]:border-r-[1px] md:[&>*:nth-child(3n)]:border-r-0">
          {sortedPosts.map((post) => {
            const formatted = new Intl.DateTimeFormat('en-US', {
              month: 'short', // "May"
              day: 'numeric', // "23"
              year: 'numeric', // "2025"
            }).format(new Date(post.publishedAt));
            return (
              <Link key={post._meta.path} href={`/blog/${post._meta.path}`} className="">
                {post.coverImage && (
                  <ImageKit
                    src={post.coverImage}
                    width={600}
                    height={600}
                    className="m-0"
                    directory="blog"
                    alt={post.title}
                  />
                )}
                <div className="prose flex flex-col items-start px-6 py-6 dark:prose-invert prose-h2:text-xl prose-h2:font-bold">
                  <h2 className="mt-0">{post.title}</h2>
                  <p className="mb-4 line-clamp-2">{post.summary}</p>
                  <div className="flex items-center justify-center gap-4 overflow-hidden">
                    <div className="size-10 overflow-hidden rounded-full">
                      <ImageKit
                        src="yuyu.jpeg"
                        width={200}
                        height={200}
                        className="mb-0 mt-0 size-10 object-cover object-bottom"
                        alt="Yuyu"
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-500">{formatted}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
