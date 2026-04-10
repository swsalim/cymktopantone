import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostLoading() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 md:py-16">
      <Skeleton className="mb-4 h-9 w-4/5 dark:bg-gray-800 md:h-11" />
      <Skeleton className="mb-8 h-4 w-40 dark:bg-gray-800" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full dark:bg-gray-800" />
        <Skeleton className="h-4 w-full dark:bg-gray-800" />
        <Skeleton className="h-4 w-[92%] dark:bg-gray-800" />
        <Skeleton className="h-4 w-full dark:bg-gray-800" />
        <Skeleton className="h-4 w-4/5 dark:bg-gray-800" />
      </div>
    </main>
  );
}
