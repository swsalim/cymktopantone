'use client';

import type { ComponentType } from 'react';

import dynamic from 'next/dynamic';

import { converterLoaders } from '@/lib/converter-loaders';

import { Container } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

function ConverterSkeleton() {
  return (
    <Container>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-[350px] w-full" />
      </div>
    </Container>
  );
}

/** Module-scoped dynamic imports — one stable component per converter key. */
export const converterComponents: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(converterLoaders).map(([name, loader]) => [
    name,
    dynamic(loader, {
      loading: () => <ConverterSkeleton />,
      ssr: true,
    }),
  ]),
) as Record<string, ComponentType>;

export function getConverterComponent(name: string): ComponentType | undefined {
  return converterComponents[name];
}
