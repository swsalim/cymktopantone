import type { ComponentType } from 'react';

import dynamic from 'next/dynamic';

import { contentLoaders } from '@/lib/converter-loaders';

/** Module-scoped dynamic imports for SEO content blocks (server-safe). */
export const contentComponents: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(contentLoaders).map(([name, loader]) => [
    name,
    dynamic(loader, { ssr: true }),
  ]),
) as Record<string, ComponentType>;

export function getContentComponent(contentKey: string | undefined): ComponentType | null {
  if (!contentKey) return null;
  return contentComponents[contentKey] ?? null;
}
