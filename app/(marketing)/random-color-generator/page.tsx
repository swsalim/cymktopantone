import { Metadata } from 'next';
import Link from 'next/link';

import { RandomColorGenerator } from '@/components/color-tools/random-color-generator';
import { buildToolMetadata, ToolPageShell } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Random Color Generator — HEX, Palette, and CSS Gradient',
  description:
    'Free random color generator. Create a random HEX color with RGB, HSL, and CMYK, a lockable five-color palette, or a two-color CSS linear gradient. Copy the values in your browser.',
  url: '/random-color-generator',
  h1: 'Random Color Generator',
  intro:
    'Generate a random HEX color, keep the palette swatches you like, and copy a two-color CSS linear gradient. Values are chosen in your browser after the page loads.',
  faqDescription: 'Questions about this random color generator.',
  faq: [
    {
      question: 'What is a random color generator?',
      answer:
        'A random color generator picks red, green, and blue channel values and shows them as a HEX code. This page also shows the same color as RGB, HSL, and CMYK, using the same conversion used by the other Color Mapper tools.',
    },
    {
      question: 'Can I generate a palette instead of one color?',
      answer:
        'Yes. The palette section shows five random colors. Lock a swatch to keep it, then generate again to replace only the unlocked colors. You can copy the five HEX values or a small CSS custom-property block.',
    },
    {
      question: 'How do I copy the CSS gradient?',
      answer:
        'The gradient section builds a two-color `linear-gradient` and a copy button for the `background` declaration. For radial or conic gradients, or more than two stops, open the [CSS gradient generator](/gradients).',
    },
    {
      question: 'Does the space bar generate a new color?',
      answer:
        'Yes. Press space to regenerate the single color, the unlocked palette swatches, and the gradient. Space is ignored while you are typing in a field.',
    },
    {
      question: 'Why do only some colors link to a color page?',
      answer:
        'Pages at `/color/HEX` exist for colors in the [named color index](/colors). When a result matches one of those colors, its HEX links there. Every result can still be copied as HEX, RGB, HSL, and CMYK.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function RandomColorGeneratorPage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <>
            <h2>What to do with a random color</h2>
            <p>
              A random color is a starting point. Read the HEX, RGB, HSL, and CMYK values on this
              page, then decide whether the color is a button, a surface, or something you should
              discard. For the reasoning behind that review, read{' '}
              <Link href="/blog/random-color-generator-guide">
                how to use random colors, palettes, and gradients
              </Link>
              .
            </p>
            <p>
              Harmony rules live in the <Link href="/palettes">palette generator</Link>. A
              Tailwind-style ramp lives in the{' '}
              <Link href="/color-scale">tint and shade generator</Link>. Screen notations are
              compared in <Link href="/blog/hex-vs-rgb-vs-hsl">HEX vs RGB vs HSL</Link>, and the
              difference between paint, light, and ink primaries is in{' '}
              <Link href="/blog/primary-colors">primary colors</Link>.
            </p>
          </>
        ),
      }}
    >
      <RandomColorGenerator />
    </ToolPageShell>
  );
}
