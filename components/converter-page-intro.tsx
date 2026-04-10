import { Container } from '@/components/container';

export function ConverterPageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Container className="pt-12 md:pt-20">
      <h1 className="max-w-4xl text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-gray-100">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Container>
  );
}
