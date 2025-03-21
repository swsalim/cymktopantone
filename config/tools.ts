import { Gamepad2 } from 'lucide-react';

export interface Tool {
  title: string;
  href: string;
  description: string;
  isExternal?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
}

export const tools: Tool[] = [
  {
    title: 'Random Number Generator',
    href: 'https://www.randomnumberapp.com/',
    description: 'Random number generator for numbers 0 to 10,000.',
    isExternal: true,
  },
  {
    title: 'Resize Image',
    href: 'https://pfpresizer.com/',
    description:
      'Quickly resize your profile picture for Instagram, Facebook, WhatsApp, and other platforms. Free and easy-to-use PFP resizer for all social media platforms.',
    isExternal: true,
  },
  {
    title: 'Flip Image',
    href: 'https://www.flipanimage.xyz/',
    description: 'Flip an image horizontally or vertically for free.',
    isExternal: true,
  },
  {
    title: 'Play Sudoku',
    href: 'https://sudokuunlimited.com/',
    description: 'Play free Sudoku online from Easy to Expert level',
    isExternal: true,
  },
  {
    title: 'RGB to Pantone Converter',
    href: 'https://www.rgbtopantone.com/',
    description:
      'Get instant, accurate Pantone matches for your RGB colors. Perfect for designers, printers & creative professionals who need reliable color conversions.',
    isExternal: true,
  },
  {
    title: 'Water a Day',
    href: 'https://www.wateraday.com/',
    description: 'How Much Water Should You Drink Daily?',
    isExternal: true,
  },
  {
    title: 'Will it rain tomorrow?',
    href: 'https://www.willitraintomorrow.com/',
    description:
      "Tomorrow's Weather Forecast, Today's Advantage - Plan Your Day Right, Come Rain or Shine",
    isExternal: true,
  },
  // {
  //   title: 'Color Palette Generator',
  //   href: '/palettes',
  //   description: 'Generate beautiful color palettes with a click.',
  //   icon: undefined,
  // },
  {
    title: 'Pantone Match Game',
    href: '/pantone-match',
    description: 'Memory Match: Find the Pantone color pairs in a fun memory game.',
    icon: Gamepad2,
    iconClassName: 'text-pink-500',
  },
  // {
  //   title: 'Color Blindness Simulator',
  //   href: '/color-blindness',
  //   description: 'Simulate your design as seen by the color blind.',
  //   icon: undefined,
  // },
  // {
  //   title: 'Gradient Generator',
  //   href: '/gradients',
  //   description: 'Create beautiful gradients from any two colors.',
  //   icon: undefined,
  // },
];
