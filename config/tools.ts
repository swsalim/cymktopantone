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
    title: 'Clinic Geek',
    href: 'https://www.clinicgeek.com/?ref=cmyktopantone',
    description: 'Clinic Geek is a directory of clinics in Singapore.',
    isExternal: true,
  },
  {
    title: 'Random Number Generator',
    href: 'https://www.randomnumberapp.com/?ref=cmyktopantone',
    description: 'Random number generator for numbers 0 to 10,000.',
    isExternal: true,
  },
  {
    title: 'Resize Image',
    href: 'https://pfpresizer.com/?ref=cmyktopantone',
    description:
      'Quickly resize your profile picture for Instagram, Facebook, WhatsApp, and other platforms. Free and easy-to-use PFP resizer for all social media platforms.',
    isExternal: true,
  },
  {
    title: 'Flip Image',
    href: 'https://www.flipanimage.xyz/?ref=cmyktopantone',
    description: 'Flip an image horizontally or vertically for free.',
    isExternal: true,
  },
  {
    title: 'Play Sudoku',
    href: 'https://sudokuunlimited.com/?ref=cmyktopantone',
    description: 'Play free Sudoku online from Easy to Expert level',
    isExternal: true,
  },
  {
    title: 'RGB to Pantone Converter',
    href: 'https://www.rgbtopantone.com/?ref=cmyktopantone',
    description:
      'Get instant, accurate Pantone matches for your RGB colors. Perfect for designers, printers & creative professionals who need reliable color conversions.',
    isExternal: true,
  },
  {
    title: 'Water a Day',
    href: 'https://www.wateraday.com/?ref=cmyktopantone',
    description: 'How Much Water Should You Drink Daily?',
    isExternal: true,
  },
  {
    title: 'Will it rain tomorrow?',
    href: 'https://www.willitraintomorrow.com/?ref=cmyktopantone',
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
    title: 'Pantone Color Match Game',
    href: '/pantone-color-match',
    description: 'Color Memory Match: Find the Pantone color pairs in a fun memory game.',
    icon: Gamepad2,
    iconClassName: 'text-pink-500',
  },
  {
    title: 'Aesthetic Clinics Malaysia 🇲🇾',
    href: 'http://www.aestheticclinics.my/?ref=cmyktopantone',
    description: 'Aesthetic clinics directory in Malaysia',
    isExternal: true,
  },
  {
    title: 'Dental Clinics Malaysia 🇲🇾',
    href: 'http://www.dentalclinicclosetome.my/?ref=cmyktopantone',
    description: 'Dental clinics directory in Malaysia',
    isExternal: true,
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
