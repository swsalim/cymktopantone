import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(input = '') {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${input}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${input}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}${input}`;
}

export function imageKitLoader({
  src,
  width,
  quality = 85,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const commonImageWidths = [200, 350, 600, 900, 1200, 1800];
  const closestWidth = commonImageWidths.reduce((a, b) =>
    Math.abs(b - width) < Math.abs(a - width) ? b : a,
  );

  if (src[0] === '/') src = src.slice(1);

  const params = [`w-${closestWidth}`];
  if (quality) params.push(`q-${quality}`);
  params.push('f-auto', 'c-at_max'); // Auto format and crop at max
  const paramsString = params.join(',');

  let urlEndpoint = `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`;
  if (urlEndpoint[urlEndpoint.length - 1] === '/') {
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  }
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
}

export function bypassImageKitLoader({
  src,
  width,
  quality = 85,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const commonImageWidths = [200, 350, 600, 900, 1200, 1800];
  const closestWidth = commonImageWidths.reduce((a, b) =>
    Math.abs(b - width) < Math.abs(a - width) ? b : a,
  );

  const url = new URL(src);
  const transformations = [
    `w-${closestWidth}`,
    `q-${quality}`,
    'f-auto', // Auto format
    'c-at_max', // Crop at max (similar to Cloudinary's c_limit)
  ];

  url.searchParams.set('tr', transformations.join(','));

  return url.toString();
}
