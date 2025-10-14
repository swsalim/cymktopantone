import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MDXContent } from '@content-collections/mdx/react';
import { allPosts } from 'content-collections';
import { format, parseISO } from 'date-fns';

import { siteConfig } from '@/config/site';

import { getTableOfContents } from '@/lib/toc';
import { absoluteUrl, cn } from '@/lib/utils';

import { LazyAdsArticle } from '@/components/ads/lazy-ads-article';
import { LazyAdsLeaderboard } from '@/components/ads/lazy-ads-leaderboard';
import { LazyAdsSquare } from '@/components/ads/lazy-ads-square';
import { BlogNavigation } from '@/components/blog-navigation';
import { ImageKit } from '@/components/image-kit';
import BlogPostJsonLd from '@/components/structured-data/BlogPostJsonLd';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import TableOfContents from '@/components/table-of-contents';
import Breadcrumb from '@/components/ui/breadcrumb';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post._meta.path === slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost({ params });

  if (!post) notFound();

  return {
    title: {
      absolute: post.metaTitle || post.title,
    },
    description: post.metaDescription || post.summary,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.summary,
      url: absoluteUrl(`/blog/${post._meta.path}`),
      images: [
        {
          url: absoluteUrl(`/api/og?title=${post.metaTitle || post.title}`),
          width: 1200,
          height: 630,
        },
      ],
      siteName: siteConfig.siteName,
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.summary,
      images: [absoluteUrl(`/api/og?title=${post.metaTitle || post.title}`)],
      card: 'summary_large_image',
      creator: siteConfig.creator,
    },
    alternates: {
      canonical: absoluteUrl(`/blog/${post._meta.path}`),
    },
  };
}

function PageHeading({
  title,
  author,
  publishedAt,
}: {
  title: string;
  author: string;
  publishedAt: string;
}) {
  return (
    <div className="mb-6 max-w-3xl text-gray-500">
      <h1 className="mb-4 text-3xl font-semibold !leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-5xl md:font-bold dark:text-gray-50">
        {title}
      </h1>
      <div className="flex flex-row items-center justify-start gap-3 md:gap-6">
        <span className="text-base capitalize sm:block dark:text-gray-300">by {author}</span>
        <span className="text-base capitalize text-gray-900 dark:text-gray-100">
          <time dateTime={publishedAt} className="font-bold">
            {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
          </time>
        </span>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost({ params });

  if (!post) notFound();

  const breadcrumbItems = [
    {
      name: 'Blog',
      url: absoluteUrl('/blog'),
    },
    {
      name: post.title,
    },
  ];

  const JSONLDbreadcrumbs = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      name: 'Home',
    },
    {
      url: absoluteUrl(`/blog`),
      name: 'Blog',
    },
    {
      url: absoluteUrl(`/blog/${post._meta.path}`),
      name: post.title,
    },
  ];

  const components = {
    ImageKit,
    Link,
    LazyAdsLeaderboard,
    LazyAdsSquare,
    LazyAdsArticle,
  };

  const toc = await getTableOfContents(post._meta.path);

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <BlogPostJsonLd post={post} />
      <WebPageJsonLd
        id={absoluteUrl(`/blog/${post._meta.path}`)}
        description={post.metaDescription || post.summary}
      />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <main className="container mx-auto max-w-7xl space-y-16 px-4 py-8 md:py-16">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeading title={post.title} publishedAt={post.publishedAt} author={post.author} />

        <div className="mt-6 sm:mt-10 lg:grid lg:grid-cols-12 lg:gap-x-16 xl:gap-x-24">
          <article className="mt-12 lg:col-span-8 lg:mt-0">
            {post.coverImage && (
              <ImageKit
                src={post.coverImage}
                width={900}
                height={500}
                className="mb-8"
                directory="blog"
                alt={post.title}
              />
            )}

            <div
              className={cn(
                'prose-pre:font-mono prose prose-gray dark:prose-invert prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-sm prose-pre:leading-relaxed prose-pre:tracking-wide prose-pre:text-gray-100',
                'prose-h3:text-xl',
                'prose-strong:font-bold',
              )}>
              <MDXContent code={post.mdx} components={{ ...components }} />
            </div>

            {/* Previous/Next Post Navigation */}
            <BlogNavigation prev={post.prev} next={post.next} />
          </article>

          {/* Table of Contents Sidebar */}
          <TableOfContents toc={toc} />
        </div>
      </main>
    </>
  );
}
