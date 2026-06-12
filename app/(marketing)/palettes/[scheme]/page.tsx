import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { harmonySubpages } from '@/config/tools-internal';
import { HarmonyScheme } from '@/lib/palette-harmony';

import { PaletteGenerator } from '@/components/color-tools/palette-generator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const SCHEME_COPY: Record<
  HarmonyScheme,
  { title: string; description: string; intro: string }
> = {
  complementary: {
    title: 'Complementary Palette Generator — Free Online | Color Mapper',
    description:
      'Generate complementary color palettes from one seed color — base, opposite, and tints/shades. High-contrast schemes with CMYK and export options.',
    intro:
      'Complementary colors sit opposite on the color wheel. This generator adds lighter and darker steps so you get a full five-swatch palette, not just a pair.',
  },
  analogous: {
    title: 'Analogous Palette Generator — Free Online | Color Mapper',
    description:
      'Create analogous color schemes from a single hue. Neighboring colors for cohesive UI, packaging, and brand systems.',
    intro:
      'Analogous palettes use hues next to each other on the wheel — naturally harmonious for backgrounds, illustrations, and soft brand systems.',
  },
  triadic: {
    title: 'Triadic Palette Generator — Free Online | Color Mapper',
    description:
      'Build triadic color palettes with three evenly spaced hues. Vibrant, balanced schemes for startups and marketing sites.',
    intro:
      'Triadic schemes use three colors 120° apart. They feel energetic while staying balanced — popular for tech branding and campaign creative.',
  },
  'split-complementary': {
    title: 'Split Complementary Palette Generator | Color Mapper',
    description:
      'Generate split complementary palettes — a base color plus two hues adjacent to its complement. Softer contrast than pure complementary pairs.',
    intro:
      'Split complementary offers contrast without the tension of a direct complement — great for accessible UI with visual interest.',
  },
  monochromatic: {
    title: 'Monochromatic Palette Generator — Free Online | Color Mapper',
    description:
      'Create monochromatic palettes from one hue with varied lightness. Clean, unified schemes for design systems and dashboards.',
    intro:
      'Monochromatic palettes vary lightness and saturation of a single hue — the fastest path to a cohesive, professional look.',
  },
  tetradic: {
    title: 'Tetradic Palette Generator — Free Online | Color Mapper',
    description:
      'Generate tetradic (rectangle) color schemes with four related hues. Rich palettes for complex brand and editorial design.',
    intro:
      'Tetradic schemes combine two complementary pairs — rich and complex. Best when you need multiple accent colors in one system.',
  },
};

export function generateStaticParams() {
  return harmonySubpages.map(({ slug }) => ({ scheme: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scheme: string }>;
}): Promise<Metadata> {
  const { scheme: slug } = await params;
  const entry = harmonySubpages.find((p) => p.slug === slug);
  const scheme = entry?.scheme ?? 'complementary';
  const copy = SCHEME_COPY[scheme];
  return buildToolMetadata({
    title: copy.title,
    description: copy.description,
    url: `/palettes/${slug}`,
    h1: entry?.title ?? 'Color Palette Generator',
  });
}

export default async function PaletteSchemePage({
  params,
}: {
  params: Promise<{ scheme: string }>;
}) {
  const { scheme: slug } = await params;
  const entry = harmonySubpages.find((p) => p.slug === slug);
  if (!entry) notFound();

  const copy = SCHEME_COPY[entry.scheme];

  return (
    <ToolPageShell
      config={{
        title: copy.title,
        description: copy.description,
        url: `/palettes/${slug}`,
        h1: entry.title,
        intro: copy.intro,
        content: (
          <>
            <p>
              Try other harmony rules in the main{' '}
              <Link href="/palettes">color palette generator</Link>, or send colors to the{' '}
              <Link href="/gradients">gradient generator</Link> and{' '}
              <Link href="/contrast-checker">WCAG contrast checker</Link>.
            </p>
          </>
        ),
      }}>
      <PaletteGenerator initialScheme={entry.scheme} showSchemePicker={false} />
    </ToolPageShell>
  );
}
