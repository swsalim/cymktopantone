import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Temporarily unavailable',
  description: 'This site is temporarily unavailable. Please check back later.',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Temporarily unavailable
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md">
        We’re taking this site offline temporarily for maintenance and updates. Thank you for your
        patience — we’ll be back as soon as possible.
      </p>
    </div>
  );
}
