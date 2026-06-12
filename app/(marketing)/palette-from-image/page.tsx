import { Metadata } from 'next';
import Link from 'next/link';

import { ImagePaletteExtractor } from '@/components/color-tools/image-palette-extractor';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Extract Colors from Image — Free Palette Tool | Color Mapper',
  description:
    'Upload a photo to extract dominant colors into a palette. Runs entirely in your browser — private, free, with CMYK values and converter links.',
  url: '/palette-from-image',
  h1: 'Palette from Image',
  intro:
    'Drop any image to extract its dominant colors. Send results to the palette generator, gradient tool, or CMYK converters.',
  faq: [
    {
      question: 'Is my image uploaded to a server?',
      answer:
        'No. Color extraction runs locally in your browser using the Canvas API. Your files never leave your device.',
    },
    {
      question: 'How many colors are extracted?',
      answer:
        'Up to eight dominant colors are returned, sorted by frequency in the sampled pixels.',
    },
    {
      question: 'Can I use extracted colors for print?',
      answer:
        'Each swatch shows CMYK values and gamut warnings. Verify with the <Link href="/convert-hex-to-cmyk">HEX to CMYK converter</Link> before production.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function PaletteFromImagePage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <p>
            Refine extracted colors in the{' '}
            <Link href="/palettes">palette generator</Link> or check accessibility with the{' '}
            <Link href="/contrast-checker">contrast checker</Link>.
          </p>
        ),
      }}>
      <ImagePaletteExtractor />
    </ToolPageShell>
  );
}
