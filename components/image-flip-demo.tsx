'use client';

import React, { useState } from 'react';

import { FlipHorizontal2Icon, FlipVertical2Icon, MoveLeftIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { ImageKit } from './image-kit';

export default function ImageFlipDemo() {
  const [image, setImage] = useState<string>('demo-image.png');
  const [orientation, setOrientation] = useState<'normal' | 'horizontal' | 'vertical'>('normal');

  const handleFlipHorizontal = () => {
    setOrientation((prev) => (prev === 'horizontal' ? 'normal' : 'horizontal'));
  };

  const handleFlipVertical = () => {
    setOrientation((prev) => (prev === 'vertical' ? 'normal' : 'vertical'));
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative">
        <ImageKit
          src={image}
          alt="Demo Image"
          width={400}
          height={400}
          priority={false}
          className={cn(
            'mx-auto max-h-96 w-full rounded-lg object-cover transition-transform duration-300',
            orientation === 'horizontal' && 'scale-x-[-1]',
            orientation === 'vertical' && 'scale-y-[-1]',
          )}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
        <div className="flex items-center gap-x-2">
          <button
            onClick={handleFlipHorizontal}
            className="flex flex-shrink-0 items-center rounded bg-yellow-500 px-4 py-2 text-sm text-white transition hover:bg-yellow-600">
            <FlipHorizontal2Icon className="mr-2" /> Flip Horizontal
          </button>
          <button
            onClick={handleFlipVertical}
            className="flex flex-shrink-0 items-center rounded bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700">
            <FlipVertical2Icon className="mr-2" /> Flip Vertical
          </button>
        </div>
        <span className="flex">
          <MoveLeftIcon className="animate-bounce-left mr-2 text-violet-500 dark:text-violet-400" />
          Try flipping!
        </span>
      </div>
    </div>
  );
}
