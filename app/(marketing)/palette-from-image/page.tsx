import { Metadata } from 'next';
import Link from 'next/link';

import { ImagePaletteExtractor } from '@/components/color-tools/image-palette-extractor';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Extract Colors from Image — Free Palette Tool',
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
        'Up to eight colors are returned, sorted by how often their bucket appears in the sampled pixels.',
    },
    {
      question: 'Why do the extracted hex values look stepped?',
      answer:
        'The sampler groups each RGB channel into coarse buckets before it counts pixels. That keeps a photograph from returning hundreds of near-duplicates. The hex you see is the bucket, not a pixel from a specific coordinate.',
    },
    {
      question: 'Can I use extracted colors for print?',
      answer:
        'Each swatch can be checked in the <a href="/print-gamut">print gamut checker</a> and the <a href="/convert-hex-to-cmyk">HEX to CMYK converter</a>. Those CMYK numbers are a formula, not a press proof.',
    },
    {
      question: 'What should I do after I have the swatches?',
      answer:
        'Open the first color in the <a href="/palettes">palette generator</a>, check text pairs in the <a href="/contrast-checker">contrast checker</a>, and preview problem hues in the <a href="/color-blindness">color blindness simulator</a>.',
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
          <>
            <h2>What the extractor actually samples</h2>
            <p>
              The image stays in your browser. The tool draws it to a canvas, scales the longest
              side down so the sample stays small, and skips pixels that are mostly transparent.
              Each remaining pixel is grouped by rounding the red, green, and blue channels into
              coarse steps. The groups that contain the most pixels are returned, up to eight,
              with the most frequent first.
            </p>
            <p>
              That count is frequency in the sample, not importance. A large white background will
              outrank a small logo. Crop to the region you care about before you upload if the
              background is drowning the subject. A photograph of a sunset and a flat brand board
              will not produce the same kind of list: the sunset has many nearby buckets, and the
              board has a few.
            </p>
            <p>
              The hex values are those buckets. They are a starting palette, not a measurement of
              a brand color and not a match to a named CSS color. If a result happens to be one of
              the catalog colors, its swatch links to that{' '}
              <Link href="/colors">color page</Link>. Otherwise copy the hex and continue in the
              other tools.
            </p>
            <h2>What to do with the palette</h2>
            <p>
              Send the first color to the <Link href="/palettes">palette generator</Link> when you
              need a harmony instead of a photo sample. Send the list to the{' '}
              <Link href="/gradients">gradient generator</Link> when you want stops. A photo palette
              often includes both a very light and a very dark bucket; those are the ones to test
              as text and background in the <Link href="/contrast-checker">contrast checker</Link>.
              Hue pairs that look separate in the photo can sit on top of each other for some
              viewers — preview them in the <Link href="/color-blindness">color blindness simulator</Link>.
            </p>
            <p>
              For print, frequency in a photo does not mean the color is in gamut. Open the
              saturated buckets in the <Link href="/print-gamut">print gamut checker</Link> and
              read <Link href="/blog/cmyk-safe-web-palettes">CMYK-safe web palettes</Link> before
              you treat a screen sample as ink. The converter output is a reference for a
              conversation with the printer, not an approved separation.
            </p>
            <p>
              None of this identifies a person in the photo or a trademark color. It counts
              quantized pixels. If you need a specific brand hex, type that hex into the{' '}
              <Link href="/convert-color">converter hub</Link> instead of sampling a screenshot of
              a logo, which will pick up compression and anti-aliasing.
            </p>
          </>
        ),
      }}>
      <ImagePaletteExtractor />
    </ToolPageShell>
  );
}
