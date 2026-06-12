import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { gradientSubpages } from '@/config/tools-internal';
import { GradientType } from '@/lib/gradient';

import { GradientGenerator } from '@/components/color-tools/gradient-generator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const TYPE_COPY: Record<
  GradientType,
  { title: string; description: string; intro: string }
> = {
  linear: {
    title: 'Linear Gradient Generator — Free CSS Tool | Color Mapper',
    description:
      'Create linear CSS gradients with custom angles and color stops. Live preview and instant copy — free online tool.',
    intro:
      'Linear gradients transition colors along a line. Adjust the angle from 0° to 360° for horizontal, vertical, or diagonal effects.',
  },
  radial: {
    title: 'Radial Gradient Generator — Free CSS Tool | Color Mapper',
    description:
      'Build radial CSS gradients for glows, spotlights, and circular fades. Copy ready-to-use CSS instantly.',
    intro:
      'Radial gradients spread from a center point outward — perfect for hero backgrounds, buttons, and soft vignettes.',
  },
  conic: {
    title: 'Conic Gradient Generator — Free CSS Tool | Color Mapper',
    description:
      'Generate conic CSS gradients for pie charts, color wheels, and angular transitions. Free with live preview.',
    intro:
      'Conic gradients rotate hues around a center point — useful for data viz, loaders, and creative angular patterns.',
  },
};

export function generateStaticParams() {
  return gradientSubpages.map(({ slug }) => ({ type: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type: slug } = await params;
  const entry = gradientSubpages.find((p) => p.slug === slug);
  const gradientType = entry?.type ?? 'linear';
  const copy = TYPE_COPY[gradientType];
  return buildToolMetadata({
    title: copy.title,
    description: copy.description,
    url: `/gradients/${slug}`,
    h1: entry?.title ?? 'Gradient Generator',
  });
}

export default async function GradientTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: slug } = await params;
  const entry = gradientSubpages.find((p) => p.slug === slug);
  if (!entry) notFound();

  const copy = TYPE_COPY[entry.type];

  return (
    <ToolPageShell
      config={{
        title: copy.title,
        description: copy.description,
        url: `/gradients/${slug}`,
        h1: entry.title,
        intro: copy.intro,
        content: (
          <p>
            Explore all gradient types in the main{' '}
            <Link href="/gradients">CSS gradient generator</Link>.
          </p>
        ),
      }}>
      <GradientGenerator initialType={entry.type} />
    </ToolPageShell>
  );
}
