'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Camera,
  Download,
  FlipHorizontal2Icon,
  FlipVertical2Icon,
  ImageDownIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

export default function ImageFlip() {
  const [image, setImage] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<'normal' | 'horizontal' | 'vertical'>('normal');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  const dropzoneConfig = useMemo(
    () => ({
      onDrop,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      },
      multiple: false,
    }),
    [onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneConfig);

  const handleFlipHorizontal = () => {
    setOrientation((prev) => (prev === 'horizontal' ? 'normal' : 'horizontal'));
  };

  const handleFlipVertical = () => {
    setOrientation((prev) => (prev === 'vertical' ? 'normal' : 'vertical'));
  };

  const handleDownload = (format: string) => {
    if (!image) return;

    const link = document.createElement('a');
    link.href = image;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // Apply transformations
      if (ctx) {
        if (orientation === 'horizontal') {
          ctx.scale(-1, 1);
          ctx.drawImage(img, -img.width, 0);
        } else if (orientation === 'vertical') {
          ctx.scale(1, -1);
          ctx.drawImage(img, 0, -img.height);
        } else {
          ctx.drawImage(img, 0, 0);
        }
      }

      link.download = `flipped_image.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    };
    img.src = image;
  };

  const dropzoneClassName = useMemo(
    () =>
      cn(
        'mb-4 rounded-lg border border-2 border-dashed p-4 text-center text-violet-500',
        isDragActive ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-violet-300',
      ),
    [isDragActive],
  );

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div {...getRootProps()} className={dropzoneClassName}>
        <input {...getInputProps()} />
        {image ? (
          <div className="relative">
            <img
              src={image}
              alt="Uploaded"
              className={`mx-auto max-h-96 w-full object-contain transition-transform duration-300 ${
                orientation === 'horizontal'
                  ? 'scale-x-[-1]'
                  : orientation === 'vertical'
                    ? 'scale-y-[-1]'
                    : ''
              }`}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center text-violet-700 dark:text-violet-400">
            <Camera size={36} className="mb-2" />
            <p>Drag & drop an image or click to select</p>
          </div>
        )}
      </div>

      {image && (
        <div className="mt-4 flex justify-between gap-x-2">
          <button
            onClick={handleFlipHorizontal}
            className="flex flex-shrink-0 flex-grow items-center rounded bg-yellow-500 px-4 py-2 text-sm text-white transition hover:bg-yellow-600">
            <FlipHorizontal2Icon className="mr-2" /> Flip Horizontal
          </button>
          <button
            onClick={handleFlipVertical}
            className="flex flex-shrink-0 flex-grow items-center rounded bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700">
            <FlipVertical2Icon className="mr-2" /> Flip Vertical
          </button>
          <button
            onClick={() => handleDownload('jpeg')}
            className="flex flex-shrink-0 flex-grow items-center rounded bg-violet-500 px-4 py-2 text-sm text-white transition hover:bg-violet-600">
            <ImageDownIcon className="mr-2" /> JPEG
          </button>
          <button
            onClick={() => handleDownload('png')}
            className="flex flex-shrink-0 flex-grow items-center rounded bg-violet-500 px-4 py-2 text-sm text-white transition hover:bg-violet-600">
            <ImageDownIcon className="mr-2" /> PNG
          </button>
          <button
            onClick={() => handleDownload('webp')}
            className="flex flex-shrink-0 flex-grow items-center rounded bg-violet-500 px-4 py-2 text-sm text-white transition hover:bg-violet-600">
            <ImageDownIcon className="mr-2" /> WEBP
          </button>
        </div>
      )}
    </div>
  );
}
