import type { ComponentType } from 'react';

type ModuleLoader = () => Promise<{ default: ComponentType }>;

/** Explicit loaders — avoids webpack resolving deleted pantone converter paths. */
export const converterLoaders: Record<string, ModuleLoader> = {
  'cmyk/to-hex': () => import('@/components/color-converters/converters/cmyk/to-hex'),
  'cmyk/to-hsl': () => import('@/components/color-converters/converters/cmyk/to-hsl'),
  'cmyk/to-rgb': () => import('@/components/color-converters/converters/cmyk/to-rgb'),
  'hex/to-cmyk': () => import('@/components/color-converters/converters/hex/to-cmyk'),
  'hex/to-hsl': () => import('@/components/color-converters/converters/hex/to-hsl'),
  'hex/to-hsv': () => import('@/components/color-converters/converters/hex/to-hsv'),
  'hex/to-rgb': () => import('@/components/color-converters/converters/hex/to-rgb'),
  'hsl/to-cmyk': () => import('@/components/color-converters/converters/hsl/to-cmyk'),
  'hsl/to-hex': () => import('@/components/color-converters/converters/hsl/to-hex'),
  'hsl/to-rgb': () => import('@/components/color-converters/converters/hsl/to-rgb'),
  'hsv/to-cmyk': () => import('@/components/color-converters/converters/hsv/to-cmyk'),
  'hsv/to-hex': () => import('@/components/color-converters/converters/hsv/to-hex'),
  'hsv/to-hsl': () => import('@/components/color-converters/converters/hsv/to-hsl'),
  'hsv/to-rgb': () => import('@/components/color-converters/converters/hsv/to-rgb'),
  'rgb/to-cmyk': () => import('@/components/color-converters/converters/rgb/to-cmyk'),
  'rgb/to-hex': () => import('@/components/color-converters/converters/rgb/to-hex'),
  'rgb/to-hsl': () => import('@/components/color-converters/converters/rgb/to-hsl'),
};

export const contentLoaders: Record<string, ModuleLoader> = {
  'cmyk/to-hex-content': () => import('@/components/color-converters/content/cmyk/to-hex-content'),
  'cmyk/to-hsl-content': () => import('@/components/color-converters/content/cmyk/to-hsl-content'),
  'cmyk/to-rgb-content': () => import('@/components/color-converters/content/cmyk/to-rgb-content'),
  'hex/to-cmyk-content': () => import('@/components/color-converters/content/hex/to-cmyk-content'),
  'hex/to-hsl-content': () => import('@/components/color-converters/content/hex/to-hsl-content'),
  'hex/to-hsv-content': () => import('@/components/color-converters/content/hex/to-hsv-content'),
  'hex/to-rgb-content': () => import('@/components/color-converters/content/hex/to-rgb-content'),
  'hsl/to-cmyk-content': () => import('@/components/color-converters/content/hsl/to-cmyk-content'),
  'hsl/to-hex-content': () => import('@/components/color-converters/content/hsl/to-hex-content'),
  'hsl/to-rgb-content': () => import('@/components/color-converters/content/hsl/to-rgb-content'),
  'hsv/to-cmyk-content': () => import('@/components/color-converters/content/hsv/to-cmyk-content'),
  'hsv/to-hex-content': () => import('@/components/color-converters/content/hsv/to-hex-content'),
  'hsv/to-hsl-content': () => import('@/components/color-converters/content/hsv/to-hsl-content'),
  'hsv/to-rgb-content': () => import('@/components/color-converters/content/hsv/to-rgb-content'),
  'rgb/to-cmyk-content': () => import('@/components/color-converters/content/rgb/to-cmyk-content'),
  'rgb/to-hex-content': () => import('@/components/color-converters/content/rgb/to-hex-content'),
  'rgb/to-hsl-content': () => import('@/components/color-converters/content/rgb/to-hsl-content'),
};

export function getConverterLoader(component: string): ModuleLoader | undefined {
  return converterLoaders[component];
}

export function getContentLoader(content: string): ModuleLoader | undefined {
  return contentLoaders[content];
}
