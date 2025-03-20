'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/skeleton';

import { Container } from './container';

interface DynamicConverterProps {
  componentName: string;
}

export function DynamicConverter({ componentName }: DynamicConverterProps) {
  const ConverterComponent = dynamic(() => import(`@/components/${componentName}`), {
    loading: () => <ConverterSkeleton />,
    ssr: true,
  });

  return (
    <Suspense fallback={<ConverterSkeleton />}>
      <ConverterComponent />
    </Suspense>
  );
}

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
