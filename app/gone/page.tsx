import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page no longer available',
  description: 'This page has been removed.',
  robots: { index: false, follow: false },
};

export default function GonePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Page no longer available
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you requested has been removed.
      </p>
      <p className="mt-6">
        <Link href="/" className="text-sm underline underline-offset-4 hover:no-underline">
          Return home
        </Link>
      </p>
    </div>
  );
}
