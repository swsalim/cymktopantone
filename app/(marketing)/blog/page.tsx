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
  title: 'Color Mapper Blog: Color Conversion Guides and Tips',
  description: 'Explore practical guides for RGB, CMYK, HEX, HSL, and HSV conversion workflows.',
  url: absoluteUrl('/blog'),
  creator: '@swsalim',
  company: 'Color Mapper',
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
      <main className="container mx-auto max-w-7xl space-y-10 px-4 py-8 md:space-y-14 md:py-16">
        <section className="to-cyan-50/80 dark:to-cyan-500/10 rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50/90 via-white/90 p-6 shadow-sm md:p-10 dark:border-violet-500/30 dark:from-violet-500/15 dark:via-gray-900/80">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
            Blog
          </h1>
          <p className="mb-0 text-lg text-gray-700 dark:text-gray-300">
            Explore the latest tips and guides on RGB, CMYK, HEX, HSL, and HSV color conversion.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {sortedPosts.map((post) => {
            const formatted = new Intl.DateTimeFormat('en-US', {
              month: 'short', // "May"
              day: 'numeric', // "23"
              year: 'numeric', // "2025"
            }).format(new Date(post.publishedAt));
            return (
              <Link
                key={post._meta.path}
                href={`/blog/${post._meta.path}`}
                className="group overflow-hidden rounded-2xl border border-violet-200/70 bg-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/75 dark:hover:border-violet-500/40">
                {post.coverImage && (
                  <ImageKit
                    src={post.coverImage}
                    width={600}
                    height={600}
                    className="m-0 transition-transform duration-300 group-hover:scale-[1.02]"
                    directory="blog"
                    alt={post.title}
                  />
                )}
                <div className="prose prose-violet flex flex-col items-start px-6 py-6 dark:prose-invert prose-h2:text-xl prose-h2:font-bold">
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
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                      {formatted}
                    </span>
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
