import { Container } from '@/components/container';

export function ConverterPageIntro({ title, description }: { title: string; description: string }) {
  return (
    <Container className="pt-12 md:pt-20">
      <div className="to-cyan-50/80 dark:to-cyan-500/10 rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50/90 via-white/90 p-6 shadow-sm md:p-10 dark:border-violet-500/30 dark:from-violet-500/15 dark:via-gray-900/80">
        <h1 className="max-w-4xl text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Container>
  );
}
