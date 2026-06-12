import { colorModels } from '@/config/colors';
import { converters } from '@/config/converters';
import { internalTools } from '@/config/tools-internal';

export type NavChildItem = {
  title: string;
  href: string;
  description: string;
  isExternal?: boolean;
};

export type NavSection = {
  label: string;
  items: NavChildItem[];
};

export type NavItem = {
  name: string;
  href?: string;
  /** Path prefixes that mark this nav item active */
  segments?: string[];
  viewMore?: { name: string; href: string };
  childItems?: NavChildItem[];
  sections?: NavSection[];
};

const toolShortDescriptions: Record<string, string> = {
  palettes: 'Harmonies from one seed color with CMYK values',
  gradients: 'Linear, radial, and conic CSS with live preview',
  'contrast-checker': 'WCAG AA/AAA ratios and palette matrix',
  'color-scale': 'Tailwind 50–950 ramps from one HEX',
  'palette-from-image': 'Extract colors from photos in-browser',
  'color-blindness': 'Protanopia, deuteranopia, tritanopia preview',
  'color-wheel': 'Drag to explore hues and live harmonies',
  'print-gamut': 'Screen vs press preview with shift warnings',
  'compare-colors': 'ΔE2000 perceptual difference between two colors',
};

const toolShortTitles: Record<string, string> = {
  palettes: 'Palette Generator',
  gradients: 'Gradient Generator',
  'contrast-checker': 'Contrast Checker',
  'color-scale': 'Tint & Shade Scale',
  'palette-from-image': 'Palette from Image',
  'color-blindness': 'Color Blindness Sim',
  'color-wheel': 'Color Wheel',
  'print-gamut': 'Print Gamut Checker',
  'compare-colors': 'Compare Colors',
};

function toolNavItem(id: string): NavChildItem {
  const tool = internalTools.find((t) => t.id === id);
  if (!tool) throw new Error(`Unknown tool id: ${id}`);
  return {
    title: toolShortTitles[id] ?? tool.title,
    href: tool.href,
    description: toolShortDescriptions[id] ?? tool.description,
  };
}

export const FEATURED_CONVERTER_IDS = [
  'rgb-to-cmyk',
  'hex-to-cmyk',
  'cmyk-to-rgb',
  'hex-to-rgb',
  'rgb-to-hex',
  'hex-to-hsl',
] as const;

export const POPULAR_CONVERTERS = [
  { name: 'RGB to CMYK', href: '/convert-rgb-to-cmyk' },
  { name: 'HEX to CMYK', href: '/convert-hex-to-cmyk' },
  { name: 'CMYK to RGB', href: '/convert-cmyk-to-rgb' },
  { name: 'HEX to RGB', href: '/convert-hex-to-rgb' },
  { name: 'CMYK to HEX', href: '/convert-cmyk-to-hex' },
  { name: 'RGB to HEX', href: '/convert-rgb-to-hex' },
] as const;

export const navItems: NavItem[] = [
  {
    name: 'Color Tools',
    href: '/tools',
    segments: [
      '/tools',
      '/palettes',
      '/gradients',
      '/contrast-checker',
      '/color-scale',
      '/palette-from-image',
      '/color-blindness',
      '/color-wheel',
      '/print-gamut',
      '/compare-colors',
    ],
    viewMore: { name: 'Browse all color tools', href: '/tools' },
    sections: [
      {
        label: 'Generators',
        items: [
          toolNavItem('palettes'),
          toolNavItem('color-wheel'),
          toolNavItem('gradients'),
          toolNavItem('color-scale'),
          toolNavItem('palette-from-image'),
        ],
      },
      {
        label: 'Checkers',
        items: [
          toolNavItem('contrast-checker'),
          toolNavItem('print-gamut'),
          toolNavItem('compare-colors'),
          toolNavItem('color-blindness'),
        ],
      },
    ],
  },
  {
    name: 'Convert',
    href: '/convert-color',
    segments: ['/convert-color', '/convert-'],
    viewMore: { name: 'All 18 converters', href: '/convert-color' },
    childItems: FEATURED_CONVERTER_IDS.map((id) => {
      const c = converters.find((x) => x.id === id)!;
      return {
        title: c.title.replace(' Color Converter', ''),
        href: c.url,
        description: c.description,
      };
    }),
  },
  {
    name: 'Color Models',
    href: '/color-models',
    segments: ['/color-models'],
    childItems: colorModels.map((model) => ({
      title: model.title,
      href: model.href,
      description: model.description,
    })),
  },
  {
    name: 'Blog',
    href: '/blog',
    segments: ['/blog'],
  },
  {
    name: 'Advertise',
    href: '/advertise',
    segments: ['/advertise'],
  },
];

export const footerColorTools = [
  { name: 'All color tools', href: '/tools' },
  { name: 'Palette generator', href: '/palettes' },
  { name: 'Color wheel', href: '/color-wheel' },
  { name: 'Gradient generator', href: '/gradients' },
  { name: 'Contrast checker', href: '/contrast-checker' },
  { name: 'Print gamut checker', href: '/print-gamut' },
  { name: 'Compare colors', href: '/compare-colors' },
  { name: 'Tint & shade scale', href: '/color-scale' },
  { name: 'Palette from image', href: '/palette-from-image' },
  { name: 'Color blindness sim', href: '/color-blindness' },
] as const;

export const footerLearnLinks = [
  { name: 'Color models', href: '/color-models' },
  { name: 'Color theory basics', href: '/blog/color-theory-101' },
  { name: 'WCAG contrast guide', href: '/blog/wcag-contrast-brand-colors' },
  { name: 'Blog', href: '/blog' },
] as const;

export const footerSiteLinks = [
  { name: 'Advertise', href: '/advertise' },
  { name: 'Terms of service', href: '/legal/terms-and-conditions' },
  { name: 'Privacy policy', href: '/legal/privacy-policy' },
] as const;

/** Flatten sections or childItems for mobile / simple lists */
export function getNavDropdownItems(item: NavItem): NavChildItem[] {
  if (item.sections?.length) {
    return item.sections.flatMap((s) => s.items);
  }
  return item.childItems ?? [];
}

export function isNavItemActive(pathname: string | null, item: NavItem): boolean {
  if (!pathname) return false;
  if (item.href && pathname === item.href) return true;
  return (
    item.segments?.some((segment) => {
      if (segment.endsWith('-') || segment.endsWith('/')) {
        return pathname.startsWith(segment);
      }
      return pathname === segment || pathname.startsWith(`${segment}/`);
    }) ?? false
  );
}
