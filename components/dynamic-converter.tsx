'use client';

import { createContext, useContext, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { ColorHistoryState, useColorHistory } from '@/lib/hooks/use-color-history';

import { Container } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

// Context to share color history between parent and dynamically loaded component
interface ColorHistoryContextType {
  colorHistory: ColorHistoryState;
}

const ColorHistoryContext = createContext<ColorHistoryContextType | null>(null);

export function useColorHistoryContext() {
  const context = useContext(ColorHistoryContext);
  if (!context) {
    throw new Error('useColorHistoryContext must be used within a ColorHistoryProvider');
  }
  return context;
}

interface DynamicConverterProps {
  componentName: string;
}

export function DynamicConverter({ componentName }: DynamicConverterProps) {
  // Create a converter-specific color history
  const colorHistory = useColorHistory(componentName);

  // Memoize the dynamic component to prevent re-loading on state changes
  const ConverterComponent = useMemo(
    () =>
      dynamic(() => import(`@/components/color-converters/converters/${componentName}`), {
        loading: () => <ConverterSkeleton />,
        ssr: true,
      }),
    [componentName],
  );

  return (
    <ColorHistoryContext.Provider value={{ colorHistory }}>
      <ConverterComponent />
    </ColorHistoryContext.Provider>
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
