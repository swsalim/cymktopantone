import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { harmonySubpages } from '@/config/tools-internal';
import { HarmonyScheme } from '@/lib/palette-harmony';

import { ColorWheel } from '@/components/color-tools/color-wheel';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const SCHEME_COPY: Record<HarmonyScheme, { title: string; description: string; intro: string }> = {
  complementary: {
    title: 'Complementary Color Wheel — Find Opposite Colors | Color Mapper',
    description:
      'Interactive color wheel for complementary pairs. Drag to a hue and see its exact opposite — with HEX, RGB, and CMYK values.',
    intro:
      'Complementary colors sit 180° apart on the wheel. Drag the marker to any hue and the wheel shows its opposite instantly.',
  },
  analogous: {
    title: 'Analogous Color Wheel — Neighboring Hues | Color Mapper',
    description:
      'Interactive color wheel for analogous schemes. Pick a hue and see its neighbors — cohesive palettes with HEX, RGB, and CMYK values.',
    intro:
      'Analogous colors are neighbors on the wheel. Pick a base hue and the markers show the adjacent hues that pair naturally with it.',
  },
  triadic: {
    title: 'Triadic Color Wheel — Three Balanced Hues | Color Mapper',
    description:
      'Interactive color wheel for triadic schemes. Three hues 120° apart — vibrant, balanced palettes with HEX, RGB, and CMYK values.',
    intro:
      'Triadic schemes place three hues 120° apart. Drag the marker and watch the triangle rotate with your base color.',
  },
  'split-complementary': {
    title: 'Split Complementary Color Wheel | Color Mapper',
    description:
      'Interactive color wheel for split complementary schemes — a base hue plus the two colors flanking its opposite.',
    intro:
      'Split complementary softens a direct complement: your base hue plus the two colors flanking its opposite — contrast without tension.',
  },
  monochromatic: {
    title: 'Monochromatic Color Wheel — One Hue, Many Shades | Color Mapper',
    description:
      'Interactive color wheel for monochromatic schemes. One hue across light and dark steps — clean, unified palettes.',
    intro:
      'Monochromatic schemes keep one hue and vary the lightness. Use the lightness slider to walk the shade range of your base color.',
  },
  tetradic: {
    title: 'Tetradic Color Wheel — Four-Hue Rectangle | Color Mapper',
    description:
      'Interactive color wheel for tetradic schemes — four hues forming a rectangle. Rich palettes with HEX, RGB, and CMYK values.',
    intro:
      'Tetradic schemes combine two complementary pairs into a rectangle on the wheel — the richest harmony rule, best with one dominant hue.',
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
    url: `/color-wheel/${slug}`,
    h1: copy.title,
  });
}

export default async function ColorWheelSchemePage({
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
        url: `/color-wheel/${slug}`,
        h1: `${entry.title.replace('Palette Generator', 'Color Wheel')}`,
        intro: copy.intro,
        content: (
          <p>
            Explore all harmony rules on the main{' '}
            <Link href="/color-wheel">interactive color wheel</Link>, or lock and refine swatches
            in the <Link href={`/palettes/${slug}`}>{entry.scheme} palette generator</Link>.
          </p>
        ),
      }}>
      <ColorWheel initialScheme={entry.scheme} showSchemePicker={false} />
    </ToolPageShell>
  );
}
