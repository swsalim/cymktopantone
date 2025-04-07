'use client';

import { CopyIcon } from 'lucide-react';

import {
  formatRgbString,
  getTextColor,
  hexToRgb,
  rgbToCmyk,
  rgbToHsl,
  rgbToHsv,
} from '@/lib/colors';

import { Button } from '@/components/ui/button';

interface PantoneColorCardProps {
  title: string;
  pantone?: string;
  hex: string;
  cmyk?: string;
  rgb?: string;
  hsl?: string;
  hsv?: string;
  deltaE?: string;
}

export function PantoneComparisonCard({
  title,
  pantone,
  cmyk,
  hex,
  rgb,
  hsl,
  hsv,
  deltaE,
}: PantoneColorCardProps) {
  const parsedRgb = hexToRgb(hex);
  const parsedCmyk = rgbToCmyk(parsedRgb);
  const parsedHsl = rgbToHsl(parsedRgb);
  const parsedHsv = rgbToHsv(parsedRgb);
  const hexString = `#${hex}`;
  const cmykString =
    cmyk || `cmyk(${parsedCmyk.c}%, ${parsedCmyk.m}%, ${parsedCmyk.y}%, ${parsedCmyk.k}%)`;
  const hslString = hsl || `hsl(${parsedHsl.h}%, ${parsedHsl.s}%, ${parsedHsl.l}%)`;
  const hsvString = hsv || `hsv(${parsedHsv.h}%, ${parsedHsv.s}%, ${parsedHsv.v}%)`;
  const rgbString = rgb || `rgb(${parsedRgb.r}, ${parsedRgb.g}, ${parsedRgb.b})`;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border dark:border-gray-600">
      <div
        className="relative flex h-20 w-full flex-col justify-center md:h-44"
        style={{
          backgroundColor: formatRgbString(hexToRgb(hex)),
          color: getTextColor(hex),
        }}></div>
      <div className="flex flex-col items-start justify-between gap-y-2 bg-white px-8 py-6 dark:bg-gray-900">
        <h3 className="m-0 text-lg font-semibold">{title}</h3>
        {pantone && (
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <span className="font-medium text-gray-500 dark:text-gray-300">Pantone</span>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{pantone}</span>
          </div>
        )}
        {cmykString && (
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <span className="font-medium text-gray-500 dark:text-gray-300">CMYK</span>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{cmykString}</span>
          </div>
        )}
        {rgbString && (
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <span className="font-medium text-gray-500 dark:text-gray-300">RGB</span>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{rgbString}</span>
          </div>
        )}
        {hex && (
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <span className="font-medium text-gray-500 dark:text-gray-300">HEX</span>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{hexString}</span>
          </div>
        )}
        {hslString && (
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <span className="font-medium text-gray-500 dark:text-gray-300">HSL</span>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{hslString}</span>
          </div>
        )}
        {hsvString && (
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <span className="font-medium text-gray-500 dark:text-gray-300">HSV</span>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{hsvString}</span>
          </div>
        )}
        {deltaE && (
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <span className="font-medium text-gray-500 dark:text-gray-300">Delta E</span>
            <span className="font-semibold text-gray-700 dark:text-gray-100">{deltaE}</span>
          </div>
        )}
      </div>
    </div>
  );
}
