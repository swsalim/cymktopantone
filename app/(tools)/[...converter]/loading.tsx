import { Container } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';
import { Wrapper } from '@/components/wrapper';

export default function ConverterLoading() {
  return (
    <>
      <Container className="pt-12 md:pt-20">
        <Skeleton className="h-9 max-w-xl md:h-11 dark:bg-gray-800" />
        <Skeleton className="mt-4 h-4 max-w-2xl dark:bg-gray-800" />
        <Skeleton className="mt-2 h-4 max-w-xl dark:bg-gray-800" />
      </Container>
      <Wrapper size="lg" className="!pt-4 md:!pt-6 pb-0 md:pb-0">
        <Container>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Skeleton className="h-[280px] w-full dark:bg-gray-800" />
            <Skeleton className="h-[280px] w-full dark:bg-gray-800" />
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
