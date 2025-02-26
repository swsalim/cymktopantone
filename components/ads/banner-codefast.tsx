import { ArrowUpRightIcon } from 'lucide-react';

import { ImageKit } from '@/components/image-kit';

export default function BannerCodefast() {
  return (
    <a
      href="https://codefa.st/?via=cymktopantone"
      target="_blank"
      className="relative flex items-center px-6 py-4 text-left transition-all duration-150 ease-in-out md:flex-row"
      rel="noreferrer">
      <div className="flex flex-row items-center gap-x-4">
        <div className="flex flex-row items-center gap-x-4">
          <div className="mb-3 hidden w-12 sm:block md:mb-0 md:py-3">
            <div className="relative h-10 w-10">
              <ImageKit
                directory="cymktopantone/logos"
                src="codefast.png"
                width={150}
                height={150}
                alt="Want to learn to code for entrepreneurship? 💻"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="">
            <h3 className="mt-0 text-base font-medium text-yellow-800">
              Want to learn to code for entrepreneurship? 💻
            </h3>
            <span className="block text-sm text-yellow-700">
              Everything you need to build your SaaS as a complete beginner.
            </span>
            <div className="mt-2 inline-block rounded-md bg-yellow-600 px-2 py-1 text-xs font-medium uppercase text-yellow-100">
              Limited Time Offer
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-md bg-yellow-200/50 p-3">
            <ArrowUpRightIcon className="h-4 w-4 text-yellow-700" />
          </div>
        </div>
      </div>
    </a>
  );
}
