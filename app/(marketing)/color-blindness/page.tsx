import { Metadata } from 'next';
import Link from 'next/link';

import { ColorBlindnessSimulator } from '@/components/color-tools/color-blindness-simulator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Color Blindness Simulator — Protanopia, Deuteranopia, Tritanopia | Color Mapper',
  description:
    'Simulate how colors appear with protanopia, deuteranopia, and tritanopia. Preview palettes before launch — free accessibility tool.',
  url: '/color-blindness',
  h1: 'Color Blindness Simulator',
  intro:
    'Preview triadic palettes under common color vision deficiencies. Pair with contrast checking for inclusive design.',
  faq: [
    {
      question: 'What is color blindness simulation?',
      answer:
        'It approximates how colors appear to people with reduced sensitivity to red, green, or blue cones — helping designers spot collisions between UI states.',
    },
    {
      question: 'Which types are simulated?',
      answer:
        'Protanopia (red), deuteranopia (green), and tritanopia (blue). These cover the most common forms of color vision deficiency.',
    },
    {
      question: 'Is simulation enough for accessibility?',
      answer:
        'No. Always validate contrast ratios with the <Link href="/contrast-checker">WCAG contrast checker</Link> and avoid relying on color alone to convey meaning.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function ColorBlindnessPage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <p>
            Read about value and contrast in our{' '}
            <Link href="/blog/color-theory-101">color theory guide</Link>, then audit palettes with
            the <Link href="/contrast-checker">contrast checker</Link>.
          </p>
        ),
      }}>
      <ColorBlindnessSimulator />
    </ToolPageShell>
  );
}
