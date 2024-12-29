'use client';

import * as React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    color?: string;
  }
>(({ color, className, ...props }, ref) => {
  let rangeColor, thumbColor;
  switch (color) {
    case 'cyan':
      rangeColor = 'bg-[#00FFFF]';
      thumbColor = 'border-[#00FFFF]';
      break;
    case 'magenta':
      rangeColor = 'bg-[#FF00FF]';
      thumbColor = 'border-[#FF00FF]';
      break;
    case 'yellow':
      rangeColor = 'bg-[#FFFF00]';
      thumbColor = 'border-[#FFFF00]';
      break;
    case 'black key':
      rangeColor = 'bg-[#000000]';
      thumbColor = 'border-[#000000]';
      break;
    default:
      rangeColor = '';
      thumbColor = '';
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}>
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
        <SliderPrimitive.Range className={cn('absolute h-full bg-violet-700', rangeColor)} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'focus-visible:ring-ring block h-5 w-5 rounded-full border-2 border-violet-700 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          rangeColor,
          thumbColor,
        )}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
