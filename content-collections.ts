import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import rehypeSlug from 'rehype-slug';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.string(),
    coverImage: z.string().optional(),
    author: z.string(),
    status: z.enum(['draft', 'published']),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypeSlug],
    });
    const docs = await context.collection.documents();

    // Sort documents by publication date (newest first) to match blog page sorting
    const sortedDocs = docs.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    const idx = sortedDocs.findIndex((d) => document._meta.filePath === d._meta.filePath);
    return {
      ...document,
      mdx,
      prev: idx > 0 ? sortedDocs[idx - 1] : null,
      next: idx < sortedDocs.length - 1 ? sortedDocs[idx + 1] : null,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
