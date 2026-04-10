import { Container } from '@/components/container';
import { Wrapper } from '@/components/wrapper';

export default function PantoneSlugLoading() {
  return (
    <Wrapper className="pb-12 md:pb-20">
      <Container>
        <div className="animate-pulse space-y-6">
          <div className="h-10 max-w-md rounded-md bg-stone-200 dark:bg-stone-800" />
          <div className="h-48 w-full rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="h-32 w-full rounded-lg bg-stone-200 dark:bg-stone-800" />
        </div>
      </Container>
    </Wrapper>
  );
}
