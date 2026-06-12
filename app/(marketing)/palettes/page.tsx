import { Metadata } from 'next';
import Link from 'next/link';

import { PaletteGenerator } from '@/components/color-tools/palette-generator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Color Palette Generator — Free Online Color Schemes | Color Mapper',
  description:
    'Generate harmonious color palettes from one seed color. Complementary, triadic, analogous, and more — with CMYK values, print gamut warnings, and CSS/Tailwind export.',
  url: '/palettes',
  h1: 'Color Palette Generator',
  intro:
    'Enter a color and generate beautiful palettes using color theory rules. Every swatch includes HEX, RGB, and CMYK — with warnings when colors may not print accurately.',
  faqDescription: 'How to use the palette generator for web, brand, and print work.',
  faq: [
    {
      question: 'What is a color palette generator?',
      answer:
        'A color palette generator creates harmonious color combinations based on color theory — complementary, analogous, triadic, and other schemes — from a single starting color.',
    },
    {
      question: 'Can I export palettes for CSS or Tailwind?',
      answer:
        'Yes. Copy your palette as CSS custom properties, a Tailwind <code>theme.extend.colors</code> block, or JSON design tokens.',
    },
    {
      question: 'Why do some colors show a CMYK warning?',
      answer:
        'Bright RGB and HEX colors often fall outside standard CMYK print gamuts. The warning means the color may shift when converted for offset or digital print.',
    },
    {
      question: 'How do I lock a color while regenerating?',
      answer:
        'Click the lock icon on any swatch. Regenerate will keep locked colors and vary the rest — useful when you have a fixed brand color.',
    },
    {
      question: 'Can I share my palette?',
      answer:
        'Use the share link to copy a URL with your seed color and harmony rule encoded. Send it to teammates or save it for later.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function PalettesPage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <>
            <h2>How to build a brand palette</h2>
            <p>
              Start with your primary brand HEX from a style guide or logo file. Triadic is a strong
              default — three balanced hues that export cleanly to CSS or Tailwind. Switch to
              analogous for calm cohesion, or complementary for bold contrast against the opposite
              hue.
            </p>
            <p>
              Check each swatch&apos;s CMYK column before handing colors to a print vendor. Use the{' '}
              <Link href="/convert-hex-to-cmyk">HEX to CMYK converter</Link> for precise percentages,
              or open the <Link href="/contrast-checker">contrast checker</Link> to validate text
              pairings for accessibility.
            </p>
            <h2>Color harmony rules explained</h2>
            <ul>
              <li>
                <strong>Triadic</strong> — three evenly spaced hues; vibrant but balanced for
                marketing sites and the default starting point.
              </li>
              <li>
                <strong>Complementary</strong> — base plus its opposite, with tints and shades;
                high impact for CTAs and hero sections.
              </li>
              <li>
                <strong>Analogous</strong> — neighboring hues; ideal for UI surfaces and soft
                gradients.
              </li>
              <li>
                <strong>Monochromatic</strong> — one hue at different lightness levels; clean design
                systems and dashboards.
              </li>
            </ul>
          </>
        ),
      }}>
      <PaletteGenerator />
    </ToolPageShell>
  );
}
