import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="grid min-h-full place-items-center bg-white px-6 py-24 text-center sm:py-32 lg:px-8">
      <p className="text-base/7 font-medium text-violet-600">404</p>{' '}
      <h1 className="mt-2 text-pretty text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>{' '}
      <p className="mt-6 text-base leading-7 text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p>{' '}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/" className={buttonVariants()}>
          Go back home
        </Link>
      </div>
    </section>
  );
}
