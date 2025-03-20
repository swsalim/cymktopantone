export interface Tool {
  title: string;
  href: string;
  description: string;
  isExternal?: boolean;
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
];
