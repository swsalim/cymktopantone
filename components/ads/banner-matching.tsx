import Link from 'next/link';

import { Gamepad2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BannerMatchingProps {
  title: string;
  description: string;
  href: string;
  buttonText: string;
}

export default function BannerMatching({
  title,
  description,
  href,
  buttonText,
}: BannerMatchingProps) {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50/50 p-6 shadow-sm md:flex-row dark:border-gray-700 dark:bg-gray-900">
      <div>
        <p className="mb-1 flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-50">
          <Gamepad2 className="text-pink-500 h-5 w-5" />
          {title}
        </p>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-200">{description}</p>
      </div>
      <Link href={href}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  );
}
