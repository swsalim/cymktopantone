export interface ConverterConfig {
  id: string;
  sourceColor: ColorType;
  targetColor: ColorType;
  title: string;
  description: string;
  url: string;
  component: string;
  content?: string;
  isExternal?: boolean;
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
      'Turn print-ready CMYK percentages into web-friendly HEX codes for CSS, Figma, and email. Free, instant conversion—no signup.',
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
      'Convert CMYK ink values to HSL hue, saturation, and lightness for digital UI work and theme tuning. Fast and accurate.',
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
      'Map CMYK from print specs to sRGB values for screens, slides, and prototypes. Ideal when brand files only list process colors.',
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
      'Find the closest Pantone PMS match from CMYK builds. Great for moving press proofs toward spot-color brand standards.',
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
      'Convert HEX palette codes to CMYK percentages for print quotes, packaging, and vendor handoffs. One paste, instant results.',
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
      'Swap HEX for HSL to tweak lightness and saturation in CSS or design tools. Handy for gradients and accessible contrast checks.',
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
      'Translate HEX into HSV for photo apps, pickers, and 3D pipelines that use hue/saturation/value. Quick and precise.',
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
      'Get RGB triplets from any HEX code for APIs, Canvas, or legacy assets that expect 0–255 channels. Copy-ready output.',
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
      'Match screen HEX swatches to nearest Pantone coated colors. Useful when dev handoff needs a print spot equivalent.',
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
      'Bring HSL theme colors into CMYK for brochures and merchandise. Bridges UI palettes with offset and digital print specs.',
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
      'Export HSL sliders to sharable HEX codes for style guides and component libraries. Perfect after dialing hue in the browser.',
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
      'Compute RGB from HSL for graphics code, shaders, and spreadsheets. Keeps hue wraps and saturation math consistent.',
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
      'Approximate Pantone PMS from HSL picks. Helpful when a design system starts in HSL but production needs spot inks.',
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
      'Convert HSV from cameras or editors into CMYK separations. Makes VFX or grading colors printable without guesswork.',
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
      'Lock HSV samples into HEX for the web after color correction. Great for turning graded stills into UI accents.',
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
      'Move between HSV (value) and HSL (lightness) models when jumping tools. Clarifies brightness math across apps.',
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
      'Translate HSV wheels into RGB integers for code and compositing. Standard transform with instant copy/paste.',
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
      'Find Pantone neighbors from HSV selections. Use when video or 3D HSV picks must align with corporate spot libraries.',
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
      'Prepare RGB screen colors for CMYK presses and large-format print. Reduces surprises when RGB designs hit proofing.',
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
      'Encode RGB tuples as #RRGGBB for Tailwind, tokens, and handoff docs. Supports quick brand palette documentation.',
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
      'Derive HSL from RGB to theme dark mode, hover states, and accessible variants. Built for design-system workflows.',
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
      'Closest Pantone matches from RGB values—ideal when UI colors must translate to packaging or uniforms.',
    url: 'https://www.rgbtopantone.com/',
    component: 'rgb/to-pantone',
    content: 'rgb/to-pantone-content',
    isExternal: true,
  },

  // PANTONE Converters
  {
    id: 'pantone-pms-to-cmyk',
    sourceColor: 'PANTONE',
    targetColor: 'CMYK',
    title: 'Pantone to CMYK Color Converter',
    description:
      'Derive CMYK percentages from Pantone swatches for estimating ink usage and press profiles. Click a chip, export process values.',
    url: '/convert-pantone-pms-to-cmyk',
    component: 'pantone/to-cmyk',
  },
  {
    id: 'pantone-pms-to-hex',
    sourceColor: 'PANTONE',
    targetColor: 'HEX',
    title: 'Pantone to HEX Color Converter',
    description:
      'Generate HEX approximations of Pantone solids for websites while noting print vs screen variance. Fast lookup grid.',
    url: '/convert-pantone-pms-to-hex',
    component: 'pantone/to-hex',
  },
  {
    id: 'pantone-pms-to-hsl',
    sourceColor: 'PANTONE',
    targetColor: 'HSL',
    title: 'Pantone to HSL Color Converter',
    description:
      'Express Pantone colors as HSL for CSS variables and animation-friendly palettes. Great for bridging brand books to code.',
    url: '/convert-pantone-pms-to-hsl',
    component: 'pantone/to-hsl',
  },
  {
    id: 'pantone-pms-to-hsv',
    sourceColor: 'PANTONE',
    targetColor: 'HSV',
    title: 'Pantone to HSV Color Converter',
    description:
      'Output HSV from Pantone picks for editors that prefer value-based sliders. Keeps hue consistent across pipelines.',
    url: '/convert-pantone-pms-to-hsv',
    component: 'pantone/to-hsv',
  },
  {
    id: 'pantone-pms-to-rgb',
    sourceColor: 'PANTONE',
    targetColor: 'RGB',
    title: 'Pantone to RGB Color Converter',
    description:
      'Get sRGB coordinates for Pantone colors to drop into Figma, Keynote, or AR filters. Includes live preview chips.',
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
  return converters.filter((converter) => !converter.isExternal);
}
