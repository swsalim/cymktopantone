export interface ConverterConfig {
  id: string;
  sourceColor: ColorType;
  targetColor: ColorType;
  title: string;
  description: string;
  url: string;
  component: string;
  content?: string;
}

export type ColorType = 'CMYK' | 'RGB' | 'HEX' | 'HSL' | 'HSV' | 'PANTONE';

/**
 * Complete configuration of all color converters.
 * To add a new converter, simply add a new entry to this array.
 */
export const converters: ConverterConfig[] = [
  // CMYK Converters
  {
    id: 'cmyk-to-hex',
    sourceColor: 'CMYK',
    targetColor: 'HEX',
    title: 'CMYK to HEX Color Converter',
    description:
      'Easily convert CMYK to HEX colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-cmyk-to-hex',
    component: 'cmyk-hex-converter',
    content: 'cmyk-hex-content',
  },
  {
    id: 'cmyk-to-hsl',
    sourceColor: 'CMYK',
    targetColor: 'HSL',
    title: 'CMYK to HSL Color Converter',
    description:
      'Easily convert CMYK to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-cmyk-to-hsl',
    component: 'cmyk-hsl-converter',
    content: 'cmyk-hsl-content',
  },
  {
    id: 'cmyk-to-rgb',
    sourceColor: 'CMYK',
    targetColor: 'RGB',
    title: 'CMYK to RGB Color Converter',
    description:
      'Easily convert CMYK to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-cmyk-to-rgb',
    component: 'cmyk-rgb-converter',
    content: 'cmyk-rgb-content',
  },

  // HEX Converters
  {
    id: 'hex-to-cmyk',
    sourceColor: 'HEX',
    targetColor: 'CMYK',
    title: 'HEX to CMYK Color Converter',
    description:
      'Easily convert HEX to CMYK colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hex-to-cmyk',
    component: 'hex-cmyk-converter',
    content: 'hex-cmyk-content',
  },
  {
    id: 'hex-to-hsl',
    sourceColor: 'HEX',
    targetColor: 'HSL',
    title: 'HEX to HSL Color Converter',
    description:
      'Easily convert HEX to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hex-to-hsl',
    component: 'hex-hsl-converter',
    content: 'hex-hsl-content',
  },
  {
    id: 'hex-to-hsv',
    sourceColor: 'HEX',
    targetColor: 'HSV',
    title: 'HEX to HSV Color Converter',
    description:
      'Easily convert HEX to HSV colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hex-to-hsv',
    component: 'hex-hsv-converter',
    content: 'hex-hsv-content',
  },
  {
    id: 'hex-to-rgb',
    sourceColor: 'HEX',
    targetColor: 'RGB',
    title: 'HEX to RGB Color Converter',
    description:
      'Easily convert HEX to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hex-to-rgb',
    component: 'hex-rgb-converter',
    content: 'hex-rgb-content',
  },
  {
    id: 'hex-to-pantone-pms',
    sourceColor: 'HEX',
    targetColor: 'PANTONE',
    title: 'HEX to Pantone Color Converter',
    description:
      'Convert HEX color codes to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-hex-to-pantone-pms',
    component: 'hex-pantone-converter',
    content: 'hex-pantone-content',
  },

  // HSL Converters
  {
    id: 'hsl-to-cmyk',
    sourceColor: 'HSL',
    targetColor: 'CMYK',
    title: 'HSL to CMYK Color Converter',
    description:
      'Easily convert HSL to CMYK colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsl-to-cmyk',
    component: 'hsl-cmyk-converter',
    content: 'hsl-cmyk-content',
  },
  {
    id: 'hsl-to-hex',
    sourceColor: 'HSL',
    targetColor: 'HEX',
    title: 'HSL to HEX Color Converter',
    description:
      'Easily convert HSL to HEX colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsl-to-hex',
    component: 'hsl-hex-converter',
    content: 'hsl-hex-content',
  },
  {
    id: 'hsl-to-rgb',
    sourceColor: 'HSL',
    targetColor: 'RGB',
    title: 'HSL to RGB Color Converter',
    description:
      'Easily convert HSL to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsl-to-rgb',
    component: 'hsl-rgb-converter',
    content: 'hsl-rgb-content',
  },
  {
    id: 'hsl-to-pantone-pms',
    sourceColor: 'HSL',
    targetColor: 'PANTONE',
    title: 'HSL to Pantone Color Converter',
    description:
      'Convert HSL color values to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-hsl-to-pantone-pms',
    component: 'hsl-pantone-converter',
    content: 'hsl-pantone-content',
  },

  // HSV Converters
  {
    id: 'hsv-to-cmyk',
    sourceColor: 'HSV',
    targetColor: 'CMYK',
    title: 'HSV to CMYK Color Converter',
    description:
      'Easily convert HSV to CMYK colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsv-to-cmyk',
    component: 'hsv-cmyk-converter',
    content: 'hsv-cmyk-content',
  },
  {
    id: 'hsv-to-hex',
    sourceColor: 'HSV',
    targetColor: 'HEX',
    title: 'HSV to HEX Color Converter',
    description:
      'Easily convert HSV to HEX colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsv-to-hex',
    component: 'hsv-hex-converter',
    content: 'hsv-hex-content',
  },
  {
    id: 'hsv-to-hsl',
    sourceColor: 'HSV',
    targetColor: 'HSL',
    title: 'HSV to HSL Color Converter',
    description:
      'Easily convert HSV to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsv-to-hsl',
    component: 'hsv-hsl-converter',
    content: 'hsv-hsl-content',
  },
  {
    id: 'hsv-to-rgb',
    sourceColor: 'HSV',
    targetColor: 'RGB',
    title: 'HSV to RGB Color Converter',
    description:
      'Easily convert HSV to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsv-to-rgb',
    component: 'hsv-rgb-converter',
    content: 'hsv-rgb-content',
  },
  {
    id: 'hsv-to-pantone-pms',
    sourceColor: 'HSV',
    targetColor: 'PANTONE',
    title: 'HSV to Pantone Color Converter',
    description:
      'Convert HSV color values to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-hsv-to-pantone-pms',
    component: 'hsv-pantone-converter',
    content: 'hsv-pantone-content',
  },

  // RGB Converters
  {
    id: 'rgb-to-cmyk',
    sourceColor: 'RGB',
    targetColor: 'CMYK',
    title: 'RGB to CMYK Color Converter',
    description:
      'Easily convert RGB to CMYK colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-rgb-to-cmyk',
    component: 'rgb-cmyk-converter',
    content: 'rgb-cmyk-content',
  },
  {
    id: 'rgb-to-hex',
    sourceColor: 'RGB',
    targetColor: 'HEX',
    title: 'RGB to HEX Color Converter',
    description:
      'Easily convert RGB to HEX colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-rgb-to-hex',
    component: 'rgb-hex-converter',
    content: 'rgb-hex-content',
  },
  {
    id: 'rgb-to-hsl',
    sourceColor: 'RGB',
    targetColor: 'HSL',
    title: 'RGB to HSL Color Converter',
    description:
      'Easily convert RGB to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-rgb-to-hsl',
    component: 'rgb-hsl-converter',
    content: 'rgb-hsl-content',
  },
  // {
  //   id: 'rgb-to-hsv',
  //   sourceColor: 'RGB',
  //   targetColor: 'HSV',
  //   title: 'RGB to HSV Color Converter',
  //   description:
  //     'Easily convert RGB to HSV colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
  //   url: '/convert-rgb-to-hsv',
  //   component: 'rgb-hsv-converter',
  //   content: 'rgb-hsv-content',
  // },
  {
    id: 'rgb-to-pantone-pms',
    sourceColor: 'RGB',
    targetColor: 'PANTONE',
    title: 'RGB to Pantone Color Converter',
    description:
      'Convert RGB values to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-rgb-to-pantone-pms',
    component: 'rgb-pantone-converter',
    content: 'rgb-pantone-content',
  },

  // PANTONE Converters
  {
    id: 'pantone-to-cmyk',
    sourceColor: 'PANTONE',
    targetColor: 'CMYK',
    title: 'Pantone to CMYK Converter',
    description:
      'The quickest way to get accurate CMYK, RGB, and HEX values for Pantone colors without using a PMS color chart. Produce more successful color combinations for your designs.',
    url: '/convert-pantone-to-cmyk',
    component: 'pantone-cmyk-converter',
  },
  {
    id: 'pantone-to-hex',
    sourceColor: 'PANTONE',
    targetColor: 'HEX',
    title: 'Pantone to HEX Converter',
    description:
      'The quickest way to get accurate HEX, CMYK, and RGB values for Pantone colors without using a PMS color chart. Produce more successful color combinations for your designs.',
    url: '/convert-pantone-to-hex',
    component: 'pantone-hex-converter',
  },
  {
    id: 'pantone-to-hsv',
    sourceColor: 'PANTONE',
    targetColor: 'HSV',
    title: 'Pantone to HSV Converter',
    description:
      'The quickest way to get accurate HSV, HSL, CMYK, RGB, and HEX values for Pantone colors without using a PMS color chart. Produce more successful color combinations for your designs.',
    url: '/convert-pantone-to-hsv',
    component: 'pantone-hsv-converter',
  },
  {
    id: 'pantone-to-rgb',
    sourceColor: 'PANTONE',
    targetColor: 'RGB',
    title: 'Pantone to RGB Converter',
    description:
      'The quickest way to get accurate RGB, CMYK, and HEX values for Pantone colors without using a PMS color chart. Produce more successful color combinations for your designs.',
    url: '/convert-pantone-to-rgb',
    component: 'pantone-rgb-converter',
  },
  {
    id: 'pantone-to-hsl',
    sourceColor: 'PANTONE',
    targetColor: 'HSL',
    title: 'Pantone to HSL Converter',
    description:
      'The quickest way to get accurate HSL, HSV, CMYK, and RGB values for Pantone colors without using a PMS color chart. Produce more successful color combinations for your designs.',
    url: '/convert-pantone-to-hsl',
    component: 'pantone-hsl-converter',
  },
];

// Helper functions to work with converters
export function getConverterByUrl(url: string): ConverterConfig | undefined {
  return converters.find((converter) => converter.url === url);
}

export function getConverterById(id: string): ConverterConfig | undefined {
  return converters.find((converter) => converter.id === id);
}

export function getConvertersBySourceColor(color: ColorType): ConverterConfig[] {
  return converters.filter((converter) => converter.sourceColor === color);
}

export function getConvertersByTargetColor(color: ColorType): ConverterConfig[] {
  return converters.filter((converter) => converter.targetColor === color);
}

export function getAllConverters(): ConverterConfig[] {
  return converters;
}
