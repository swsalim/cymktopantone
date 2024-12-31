import Link from 'next/link';

import { ArrowUpRightIcon } from 'lucide-react';

import { ImageKit } from '@/components/image-kit';

type StickyAdsProps = {
  url: string;
  image: string;
  name: string;
  description: string;
  label: string;
};

export default function StickyAds({ url, image, name, description, label }: StickyAdsProps) {
  return (
    <div className="relative z-50 border-[1px] border-b-yellow-300 bg-yellow-50">
      <div className="mx-auto max-w-7xl">
        <Link
          href={url}
          target="_blank"
          className="relative flex items-center px-6 py-4 text-left transition-all duration-150 ease-in-out md:flex-row"
          rel="noreferrer">
          <div className="flex flex-row items-center gap-x-4">
            <div className="flex flex-row items-center gap-x-4">
              <div className="mb-3 hidden w-12 sm:block md:mb-0 md:py-3">
                <div className="relative h-10 w-10">
                  <ImageKit
                    directory="pfpresizer/logos"
                    src={image}
                    width={150}
                    height={150}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="">
                <h3 className="mt-0 text-base font-medium text-yellow-800">{name}</h3>
                <span className="block text-sm text-yellow-700">{description}</span>
                <div className="mt-2 inline-block rounded-md bg-yellow-600 px-2 py-1 text-xs font-medium uppercase text-yellow-100">
                  {label}
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-md bg-yellow-200/50 p-3">
                <ArrowUpRightIcon className="h-4 w-4 text-yellow-700" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
