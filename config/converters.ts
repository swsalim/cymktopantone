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
    component: 'cmyk/to-hex',
    content: 'cmyk/to-hex-content',
  },
  {
    id: 'cmyk-to-hsl',
    sourceColor: 'CMYK',
    targetColor: 'HSL',
    title: 'CMYK to HSL Color Converter',
    description:
      'Easily convert CMYK to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-cmyk-to-hsl',
    component: 'cmyk/to-hsl',
    content: 'cmyk/to-hsl-content',
  },
  {
    id: 'cmyk-to-rgb',
    sourceColor: 'CMYK',
    targetColor: 'RGB',
    title: 'CMYK to RGB Color Converter',
    description:
      'Easily convert CMYK to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-cmyk-to-rgb',
    component: 'cmyk/to-rgb',
    content: 'cmyk/to-rgb-content',
  },
  {
    id: 'cmyk-to-pantone-pms',
    sourceColor: 'CMYK',
    targetColor: 'PANTONE',
    title: 'CMYK to Pantone Color Converter',
    description:
      'Convert CMYK color values to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-cmyk-to-pantone-pms',
    component: 'cmyk/to-pantone',
    content: 'cmyk/to-pantone-content',
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
    component: 'hex/to-cmyk',
    content: 'hex/to-cmyk-content',
  },
  {
    id: 'hex-to-hsl',
    sourceColor: 'HEX',
    targetColor: 'HSL',
    title: 'HEX to HSL Color Converter',
    description:
      'Easily convert HEX to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hex-to-hsl',
    component: 'hex/to-hsl',
    content: 'hex/to-hsl-content',
  },
  {
    id: 'hex-to-hsv',
    sourceColor: 'HEX',
    targetColor: 'HSV',
    title: 'HEX to HSV Color Converter',
    description:
      'Easily convert HEX to HSV colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hex-to-hsv',
    component: 'hex/to-hsv',
    content: 'hex/to-hsv-content',
  },
  {
    id: 'hex-to-rgb',
    sourceColor: 'HEX',
    targetColor: 'RGB',
    title: 'HEX to RGB Color Converter',
    description:
      'Easily convert HEX to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hex-to-rgb',
    component: 'hex/to-rgb',
    content: 'hex/to-rgb-content',
  },
  {
    id: 'hex-to-pantone-pms',
    sourceColor: 'HEX',
    targetColor: 'PANTONE',
    title: 'HEX to Pantone Color Converter',
    description:
      'Convert HEX color codes to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-hex-to-pantone-pms',
    component: 'hex/to-pantone',
    content: 'hex/to-pantone-content',
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
    component: 'hsl/to-cmyk',
    content: 'hsl/to-cmyk-content',
  },
  {
    id: 'hsl-to-hex',
    sourceColor: 'HSL',
    targetColor: 'HEX',
    title: 'HSL to HEX Color Converter',
    description:
      'Easily convert HSL to HEX colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsl-to-hex',
    component: 'hsl/to-hex',
    content: 'hsl/to-hex-content',
  },
  {
    id: 'hsl-to-rgb',
    sourceColor: 'HSL',
    targetColor: 'RGB',
    title: 'HSL to RGB Color Converter',
    description:
      'Easily convert HSL to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsl-to-rgb',
    component: 'hsl/to-rgb',
    content: 'hsl/to-rgb-content',
  },
  {
    id: 'hsl-to-pantone-pms',
    sourceColor: 'HSL',
    targetColor: 'PANTONE',
    title: 'HSL to Pantone Color Converter',
    description:
      'Convert HSL color values to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-hsl-to-pantone-pms',
    component: 'hsl/to-pantone',
    content: 'hsl/to-pantone-content',
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
    component: 'hsv/to-cmyk',
    content: 'hsv/to-cmyk-content',
  },
  {
    id: 'hsv-to-hex',
    sourceColor: 'HSV',
    targetColor: 'HEX',
    title: 'HSV to HEX Color Converter',
    description:
      'Easily convert HSV to HEX colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsv-to-hex',
    component: 'hsv/to-hex',
    content: 'hsv/to-hex-content',
  },
  {
    id: 'hsv-to-hsl',
    sourceColor: 'HSV',
    targetColor: 'HSL',
    title: 'HSV to HSL Color Converter',
    description:
      'Easily convert HSV to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsv-to-hsl',
    component: 'hsv/to-hsl',
    content: 'hsv/to-hsl-content',
  },
  {
    id: 'hsv-to-rgb',
    sourceColor: 'HSV',
    targetColor: 'RGB',
    title: 'HSV to RGB Color Converter',
    description:
      'Easily convert HSV to RGB colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-hsv-to-rgb',
    component: 'hsv/to-rgb',
    content: 'hsv/to-rgb-content',
  },
  {
    id: 'hsv-to-pantone-pms',
    sourceColor: 'HSV',
    targetColor: 'PANTONE',
    title: 'HSV to Pantone Color Converter',
    description:
      'Convert HSV color values to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-hsv-to-pantone-pms',
    component: 'hsv/to-pantone',
    content: 'hsv/to-pantone-content',
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
    component: 'rgb/to-cmyk',
    content: 'rgb/to-cmyk-content',
  },
  {
    id: 'rgb-to-hex',
    sourceColor: 'RGB',
    targetColor: 'HEX',
    title: 'RGB to HEX Color Converter',
    description:
      'Easily convert RGB to HEX colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-rgb-to-hex',
    component: 'rgb/to-hex',
    content: 'rgb/to-hex-content',
  },
  {
    id: 'rgb-to-hsl',
    sourceColor: 'RGB',
    targetColor: 'HSL',
    title: 'RGB to HSL Color Converter',
    description:
      'Easily convert RGB to HSL colors with our fast and reliable tool. Achieve perfect color consistency for your design projects.',
    url: '/convert-rgb-to-hsl',
    component: 'rgb/to-hsl',
    content: 'rgb/to-hsl-content',
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
      'Convert RGB color values to their closest Pantone color matches with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: 'https://www.rgbtopantone.com/',
    component: 'rgb/to-pantone',
    content: 'rgb/to-pantone-content',
  },

  // PANTONE Converters
  {
    id: 'pantone-pms-to-cmyk',
    sourceColor: 'PANTONE',
    targetColor: 'CMYK',
    title: 'Pantone to CMYK Color Converter',
    description:
      'Convert Pantone color values to CMYK with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-pantone-pms-to-cmyk',
    component: 'pantone/to-cmyk',
  },
  {
    id: 'pantone-pms-to-hex',
    sourceColor: 'PANTONE',
    targetColor: 'HEX',
    title: 'Pantone to HEX Color Converter',
    description:
      'Convert Pantone color values to HEX with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-pantone-pms-to-hex',
    component: 'pantone/to-hex',
  },
  {
    id: 'pantone-pms-to-hsl',
    sourceColor: 'PANTONE',
    targetColor: 'HSL',
    title: 'Pantone to HSL Color Converter',
    description:
      'Convert Pantone color values to HSL with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-pantone-pms-to-hsl',
    component: 'pantone/to-hsl',
  },
  {
    id: 'pantone-pms-to-hsv',
    sourceColor: 'PANTONE',
    targetColor: 'HSV',
    title: 'Pantone to HSV Color Converter',
    description:
      'Convert Pantone color values to HSV with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-pantone-pms-to-hsv',
    component: 'pantone/to-hsv',
  },
  {
    id: 'pantone-pms-to-rgb',
    sourceColor: 'PANTONE',
    targetColor: 'RGB',
    title: 'Pantone to RGB Color Converter',
    description:
      'Convert Pantone color values to RGB with our efficient tool. Perfect for brand consistency across digital and print media.',
    url: '/convert-pantone-pms-to-rgb',
    component: 'pantone/to-rgb',
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
