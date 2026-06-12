import { Metadata } from 'next';
import Link from 'next/link';

import { ColorComparator } from '@/components/color-tools/color-comparator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Compare Colors — Delta E Color Difference Calculator | Color Mapper',
  description:
    'Compare two colors side by side with ΔE2000 perceptual difference, match percentage, and HEX, RGB, CMYK, HSL values for both. Free, no signup.',
  url: '/compare-colors',
  h1: 'Compare Colors',
  intro:
    'Put two colors side by side and measure how different they actually look. ΔE2000 difference, perceptual match percentage, and every format value for both colors.',
  faq: [
    {
      question: 'What is Delta E (ΔE)?',
      answer:
        'Delta E measures the perceptual difference between two colors — how different they look to a human, not how far apart their RGB numbers are. This tool uses ΔE2000 (CIEDE2000), the current industry-standard formula.',
    },
    {
      question: 'What is a good Delta E value?',
      answer:
        'Below 1 is imperceptible; below 2.3 is the just-noticeable difference (JND) — safe to treat as the same color. Between 3 and 10 is visibly different. Print production typically targets ΔE under 2 for brand color matching.',
    },
    {
      question: 'Why do two similar RGB values look so different?',
      answer:
        'RGB distance does not match human perception — we are more sensitive to some hue and lightness shifts than others. Delta E works in Lab color space, which is designed to mirror how eyes actually perceive difference.',
    },
    {
      question: 'When would I compare two colors?',
      answer:
        'Checking if a vendor&apos;s printed sample matches your brand color, validating that a redesigned palette stays close to the original, or confirming two near-identical shades in a design system can be merged.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function CompareColorsPage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <p>
            Comparing for accessibility instead? Use the{' '}
            <Link href="/contrast-checker">WCAG contrast checker</Link> — contrast and perceptual
            difference are different measurements. For print matching, run both colors through the{' '}
            <Link href="/print-gamut">print gamut checker</Link> first.
          </p>
        ),
      }}>
      <ColorComparator />
    </ToolPageShell>
  );
}
