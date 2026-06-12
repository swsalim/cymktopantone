export interface InternalTool {
  id: string;
  title: string;
  href: string;
  description: string;
  category: 'generator' | 'checker' | 'converter' | 'accessibility';
  keywords?: string[];
}

export const internalTools: InternalTool[] = [
  {
    id: 'palettes',
    title: 'Color Palette Generator',
    href: '/palettes',
    description:
      'Generate harmonious palettes from one color — complementary, triadic, analogous, and more. CMYK values and print gamut warnings included.',
    category: 'generator',
    keywords: ['color palette generator', 'color scheme generator'],
  },
  {
    id: 'gradients',
    title: 'CSS Gradient Generator',
    href: '/gradients',
    description:
      'Build linear, radial, and conic CSS gradients with live preview. Copy production-ready code instantly.',
    category: 'generator',
    keywords: ['gradient generator', 'css gradient generator'],
  },
  {
    id: 'contrast-checker',
    title: 'WCAG Contrast Checker',
    href: '/contrast-checker',
    description:
      'Check color contrast ratios against WCAG 2.1 AA and AAA. Includes palette matrix mode and auto-fix suggestions.',
    category: 'checker',
    keywords: ['color contrast checker', 'wcag contrast checker'],
  },
  {
    id: 'color-scale',
    title: 'Tint & Shade Generator',
    href: '/color-scale',
    description:
      'Turn one brand color into a Tailwind-compatible 50–950 scale with WCAG contrast badges on every swatch.',
    category: 'generator',
    keywords: ['tint and shade generator', 'tailwind color scale'],
  },
  {
    id: 'palette-from-image',
    title: 'Palette from Image',
    href: '/palette-from-image',
    description:
      'Extract dominant colors from any photo — runs entirely in your browser. Send colors to converters or palette tools.',
    category: 'generator',
    keywords: ['extract colors from image', 'color palette from image'],
  },
  {
    id: 'color-blindness',
    title: 'Color Blindness Simulator',
    href: '/color-blindness',
    description:
      'Preview palettes as seen with protanopia, deuteranopia, or tritanopia. Essential for accessible design.',
    category: 'accessibility',
    keywords: ['color blindness simulator', 'color blind simulator'],
  },
  {
    id: 'color-wheel',
    title: 'Interactive Color Wheel',
    href: '/color-wheel',
    description:
      'Drag to pick a hue and see complementary, triadic, and analogous harmonies live — with HEX, RGB, and CMYK values.',
    category: 'generator',
    keywords: ['color wheel', 'color wheel generator', 'interactive color wheel'],
  },
  {
    id: 'print-gamut',
    title: 'Print Gamut Checker',
    href: '/print-gamut',
    description:
      'See exactly how a screen color shifts when printed in CMYK. Side-by-side press preview with shift warnings.',
    category: 'checker',
    keywords: ['print gamut checker', 'rgb to cmyk shift', 'cmyk safe colors'],
  },
  {
    id: 'compare-colors',
    title: 'Compare Colors (Delta E)',
    href: '/compare-colors',
    description:
      'Measure the perceptual difference between two colors with ΔE2000 — plus HEX, RGB, CMYK, and HSL values for both.',
    category: 'checker',
    keywords: ['compare colors', 'delta e calculator', 'color difference calculator'],
  },
];

export const harmonySubpages = [
  { slug: 'complementary', scheme: 'complementary' as const, title: 'Complementary Palette Generator' },
  { slug: 'analogous', scheme: 'analogous' as const, title: 'Analogous Palette Generator' },
  { slug: 'triadic', scheme: 'triadic' as const, title: 'Triadic Palette Generator' },
  { slug: 'split-complementary', scheme: 'split-complementary' as const, title: 'Split Complementary Palette Generator' },
  { slug: 'monochromatic', scheme: 'monochromatic' as const, title: 'Monochromatic Palette Generator' },
  { slug: 'tetradic', scheme: 'tetradic' as const, title: 'Tetradic Palette Generator' },
];

export const gradientSubpages = [
  { slug: 'linear', type: 'linear' as const, title: 'Linear Gradient Generator' },
  { slug: 'radial', type: 'radial' as const, title: 'Radial Gradient Generator' },
  { slug: 'conic', type: 'conic' as const, title: 'Conic Gradient Generator' },
];

/** /color-wheel/[scheme] mirrors the harmony subpages. */
export const colorWheelSubpages = harmonySubpages;
