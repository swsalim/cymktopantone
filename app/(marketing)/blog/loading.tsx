import { Skeleton } from '@/components/ui/skeleton';

export default function BlogIndexLoading() {
  return (
    <main className="container mx-auto max-w-7xl space-y-16 px-4 py-8 md:py-16">
      <div>
        <Skeleton className="mb-2 h-9 w-32 dark:bg-gray-800 md:h-11" />
        <Skeleton className="h-5 w-full max-w-xl dark:bg-gray-800" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3 border border-gray-100 p-4 dark:border-gray-800">
            <Skeleton className="aspect-video w-full dark:bg-gray-800" />
            <Skeleton className="h-5 w-3/4 dark:bg-gray-800" />
            <Skeleton className="h-4 w-24 dark:bg-gray-800" />
            <Skeleton className="h-3 w-full dark:bg-gray-800" />
          </div>
        ))}
      </div>
    </main>
  );
}
