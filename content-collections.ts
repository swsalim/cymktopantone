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
    const idx = docs.findIndex((d) => document._meta.filePath === d._meta.filePath);
    return {
      ...document,
      mdx,
      prev: idx > 0 ? docs[idx - 1] : null,
      next: idx < docs.length - 1 ? docs[idx + 1] : null,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
