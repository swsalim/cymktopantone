import { Metadata } from 'next';
import Link from 'next/link';

import { PrintGamutChecker } from '@/components/color-tools/print-gamut-checker';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'Print Gamut Checker — Will Your Color Survive CMYK? | Color Mapper',
  description:
    'Check if an RGB or HEX color can print accurately in CMYK. Side-by-side screen vs press preview with shift warnings — free, no signup.',
  url: '/print-gamut',
  h1: 'Print Gamut Checker',
  intro:
    'Screens mix light; presses mix ink. Paste a color (or your whole brand palette) and see exactly how it will shift when converted to CMYK for print.',
  faq: [
    {
      question: 'What is the print gamut?',
      answer:
        'The gamut is the range of colors a printing process can reproduce. CMYK ink on paper covers a smaller range than an RGB screen — saturated neons, electric greens, and bright blues often sit outside it.',
    },
    {
      question: 'How does this tool detect a shift?',
      answer:
        'It converts your color to CMYK and back to RGB, then measures the difference. A large round-trip distance means the press cannot reproduce the original color and will substitute a duller one.',
    },
    {
      question: 'My brand color shifts — what should I do?',
      answer:
        'Either adjust the color toward a printable equivalent (the press preview shows what you will actually get), or accept the screen/print difference and document both values in your brand guide.',
    },
    {
      question: 'Is this the same as a professional proof?',
      answer:
        'No. This uses a standard CMYK conversion to flag risk early. Final production work should always be checked against a calibrated press proof with your printer&apos;s ICC profile.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function PrintGamutPage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <p>
            Building a palette that needs to survive print? Generate it with CMYK warnings built in
            using the <Link href="/palettes">palette generator</Link>, or convert exact values with
            the <Link href="/convert-hex-to-cmyk">HEX to CMYK converter</Link>. Background reading:{' '}
            <Link href="/blog/cmyk-safe-web-palettes">why neon HEX colors lie on screen</Link>.
          </p>
        ),
      }}>
      <PrintGamutChecker />
    </ToolPageShell>
  );
}
