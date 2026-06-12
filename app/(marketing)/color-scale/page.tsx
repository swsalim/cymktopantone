import { Metadata } from 'next';
import Link from 'next/link';

import { ColorScaleGenerator } from '@/components/color-tools/color-scale-generator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Tint & Shade Generator — Tailwind Color Scale | Color Mapper',
  description:
    'Generate tints and shades from one brand HEX. Tailwind 50–950 scale with WCAG contrast badges and CMYK values for print handoff.',
  url: '/color-scale',
  h1: 'Tint & Shade Generator',
  intro:
    'Turn a single brand color into a full UI scale. Every step shows contrast on white and black plus CMYK for print specs.',
  faq: [
    {
      question: 'What is a tint and shade generator?',
      answer:
        'It creates lighter tints (mixed toward white) and darker shades (mixed toward black) from one base color — the foundation of design system color ramps.',
    },
    {
      question: 'Does this match Tailwind naming?',
      answer:
        'Yes. The scale uses steps 50, 100, 200 … 950 matching Tailwind CSS conventions. Export directly into <code>tailwind.config.js</code>.',
    },
    {
      question: 'How do I pick accessible text colors?',
      answer:
        'Check the /white and /black contrast badges on each swatch, or run pairs through the <Link href="/contrast-checker">WCAG contrast checker</Link>.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function ColorScalePage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <p>
            Learn how color models work in our{' '}
            <Link href="/color-models/hsl">HSL color guide</Link>, then convert any swatch with the{' '}
            <Link href="/convert-hex-to-cmyk">HEX to CMYK converter</Link> for vendor handoffs.
          </p>
        ),
      }}>
      <ColorScaleGenerator />
    </ToolPageShell>
  );
}
