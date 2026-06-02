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
    title: 'Bye Indonesia',
    href: 'https://www.byeindonesia.com/?ref=colormapper',
    description: 'Renunciation of Indonesian Citizenship Guide',
    isExternal: true,
  },
  {
    title: 'Clinic Geek',
    href: 'https://www.clinicgeek.com/?ref=colormapper',
    description: 'Clinic Geek is a directory of clinics in Singapore.',
    isExternal: true,
  },
  {
    title: 'Indie World Map',
    href: 'https://www.indieworldmap.com/?ref=colormapper',
    description: 'Discover & explore indie hacker projects globally.',
    isExternal: true,
  },
  {
    title: 'Random Number Generator',
    href: 'https://www.randomnumberapp.com/?ref=colormapper',
    description: 'Random number generator for numbers 0 to 10,000.',
    isExternal: true,
  },
  {
    title: 'Resize Image',
    href: 'https://pfpresizer.com/?ref=colormapper',
    description:
      'Quickly resize your profile picture for Instagram, Facebook, WhatsApp, and other platforms. Free and easy-to-use PFP resizer for all social media platforms.',
    isExternal: true,
  },
  {
    title: 'Flip Image',
    href: 'https://www.flipanimage.xyz/?ref=colormapper',
    description: 'Flip an image horizontally or vertically for free.',
    isExternal: true,
  },
  {
    title: 'Play Sudoku',
    href: 'https://sudokuunlimited.com/?ref=colormapper',
    description: 'Play free Sudoku online from Easy to Expert level',
    isExternal: true,
  },
  {
    title: 'Water a Day',
    href: 'https://www.wateraday.com/?ref=colormapper',
    description: 'How Much Water Should You Drink Daily?',
    isExternal: true,
  },
  {
    title: 'Keyword Gap',
    href: 'https://www.keywordgap.com/?ref=colormapper',
    description: 'Validate your idea with competitor keyword analysis report done for you.',
    isExternal: true,
  },
  {
    title: 'mainan.fun',
    href: 'https://www.mainan.fun/?ref=colormapper',
    description:
      "Mainan is where you'll discover handpicked educational toys that blends learning with fun. Perfect picks for curious minds are just a click away!",
    isExternal: true,
  },
  {
    title: 'Will it rain tomorrow?',
    href: 'https://www.willitraintomorrow.com/?ref=colormapper',
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
    title: 'Aesthetic Clinics Malaysia 🇲🇾',
    href: 'http://www.aestheticclinics.my/?ref=colormapper',
    description: 'Aesthetic clinics directory in Malaysia',
    isExternal: true,
  },
  {
    title: 'Dental Clinics Malaysia 🇲🇾',
    href: 'http://www.dentalclinicclosetome.my/?ref=colormapper',
    description: 'Dental clinics directory in Malaysia',
    isExternal: true,
  },
  {
    title: 'What Is My Screen Size?',
    href: 'https://www.whatismyscreensize.com/?ref=colormapper',
    description:
      "Instantly discover your device's screen dimensions, resolution, and display specifications. Free tool to check screen size, pixel density, and more.",
    isExternal: true,
  },
  {
    title: 'GraffitiVibe',
    href: 'https://www.graffitivibe.pro/?ref=colormapper',
    description: "Create stunning graffiti art with GraffitiVibe's graffiti generator.",
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
