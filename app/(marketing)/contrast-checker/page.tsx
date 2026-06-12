import { Metadata } from 'next';
import Link from 'next/link';

import { ContrastChecker } from '@/components/color-tools/contrast-checker';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'WCAG Color Contrast Checker — AA & AAA Free Tool | Color Mapper',
  description:
    'Check color contrast ratios against WCAG 2.1 AA and AAA standards. Live text preview, auto-fix suggestions, and palette contrast matrix — free online.',
  url: '/contrast-checker',
  h1: 'WCAG Color Contrast Checker',
  intro:
    'Test foreground and background colors for accessibility compliance. See contrast ratios, pass/fail badges, and suggested fixes instantly.',
  faqDescription: 'Accessibility and contrast checking FAQ.',
  faq: [
    {
      question: 'What contrast ratio passes WCAG AA?',
      answer:
        'Normal text needs at least <strong>4.5:1</strong>. Large text (18pt+ or 14pt bold+) needs at least <strong>3:1</strong>. AAA requires 7:1 for normal text.',
    },
    {
      question: 'How is contrast ratio calculated?',
      answer:
        'WCAG uses relative luminance of each color in sRGB space, then computes (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color.',
    },
    {
      question: 'What is palette matrix mode?',
      answer:
        'Paste multiple HEX colors to see contrast ratios for every foreground/background pair — useful when auditing an entire brand palette.',
    },
    {
      question: 'What if my brand color fails contrast?',
      answer:
        'Use the suggested fix to find the nearest passing shade, or generate accessible variants with the <Link href="/color-scale">tint & shade generator</Link>.',
    },
  ],
};

export const metadata: Metadata = buildToolMetadata(config);

export default function ContrastCheckerPage() {
  return (
    <ToolPageShell
      config={{
        ...config,
        content: (
          <>
            <h2>Why contrast matters for design and development</h2>
            <p>
              Low contrast text excludes users with low vision and fails legal accessibility
              requirements in many markets. Checking contrast before launch prevents expensive redesigns
              and improves readability for everyone.
            </p>
            <p>
              After validating pairs here, build a full accessible scale with the{' '}
              <Link href="/color-scale">Tailwind color scale generator</Link> or simulate how palettes
              appear to color-blind users with the{' '}
              <Link href="/color-blindness">color blindness simulator</Link>.
            </p>
          </>
        ),
      }}>
      <ContrastChecker />
    </ToolPageShell>
  );
}
