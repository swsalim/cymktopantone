import { Metadata } from 'next';
import Link from 'next/link';

import { GradientGenerator } from '@/components/color-tools/gradient-generator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'CSS Gradient Generator — Free Linear, Radial & Conic | Color Mapper',
  description:
    'Create CSS gradients with live preview. Linear, radial, and conic types with 2–5 color stops, presets, and one-click copy — free, no signup.',
  url: '/gradients',
  h1: 'CSS Gradient Generator',
  intro:
    'Build beautiful gradients and copy production-ready CSS. Import colors from the palette generator or start from presets.',
  faqDescription: 'Questions about CSS gradients and this generator.',
  faq: [
    {
      question: 'What is a CSS gradient generator?',
      answer:
        'A CSS gradient generator lets you pick colors and stops visually, then outputs <code>linear-gradient</code>, <code>radial-gradient</code>, or <code>conic-gradient</code> CSS you can paste into stylesheets or design tools.',
    },
    {
      question: 'What is the difference between linear and radial gradients?',
      answer:
        'Linear gradients transition along a straight line (controlled by angle). Radial gradients radiate outward from a center point — ideal for glows and spotlights.',
    },
    {
      question: 'Can I use three colors in one gradient?',
      answer:
        'Yes. Switch to 3-color mode or add up to five stops with custom positions for fine control.',
    },
    {
      question: 'Will my gradient print correctly in CMYK?',
      answer:
        'Neon RGB gradients often shift on press. For print work, verify key stops in the <Link href="/convert-hex-to-cmyk">HEX to CMYK converter</Link> before production.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function GradientsPage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <>
            <h2>CSS gradient syntax quick reference</h2>
            <pre>
              {`background: linear-gradient(135deg, #5B21B6 0%, #C4B5FD 100%);
background: radial-gradient(circle, #FFFFFF 0%, #7C3AED 100%);
background: conic-gradient(from 90deg, #FF512F, #F09819, #FF512F);`}
            </pre>
            <p>
              Import a palette from the{' '}
              <Link href="/palettes">color palette generator</Link> using the query link, or extract
              colors from a photo with the{' '}
              <Link href="/palette-from-image">palette from image</Link> tool.
            </p>
          </>
        ),
      }}>
      <GradientGenerator />
    </ToolPageShell>
  );
}
