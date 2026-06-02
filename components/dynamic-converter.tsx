'use client';

import { createContext, useContext } from 'react';

import { getConverterComponent } from '@/lib/dynamic-converter-components';
import { ColorHistoryState, useColorHistory } from '@/lib/hooks/use-color-history';

import { Container } from '@/components/container';

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

function ConverterNotFound({ name }: { name: string }) {
  return (
    <Container>
      <p className="mt-10 text-center text-gray-600 dark:text-gray-400">
        Converter &ldquo;{name}&rdquo; is not available.
      </p>
    </Container>
  );
}

export function DynamicConverter({ componentName }: DynamicConverterProps) {
  const colorHistory = useColorHistory(componentName);
  const ConverterComponent = getConverterComponent(componentName);

  return (
    <ColorHistoryContext.Provider value={{ colorHistory }}>
      {ConverterComponent ? (
        <ConverterComponent />
      ) : (
        <ConverterNotFound name={componentName} />
      )}
    </ColorHistoryContext.Provider>
  );
}
