import { Metadata } from 'next';
import Link from 'next/link';

import { GradientGenerator } from '@/components/color-tools/gradient-generator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const config = {
  title: 'CSS Gradient Generator — Free Linear, Radial & Conic',
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
            <h2>How stops, angles, and interpolation fit together</h2>
            <p>
              A CSS gradient is a list of color stops painted along a line, a ray, or an angle.
              The browser fills the space between stops. If you leave positions off, CSS Images
              Level 4 spaces the missing stops evenly between the ones you did set. That default is
              fine for a two-color wash. It puts a three-color highlight in the wrong place when
              you needed the middle color near one edge.
            </p>
            <p>
              Linear gradients take an angle or a side keyword. <code>0deg</code> points upward,{' '}
              <code>90deg</code> points right, and <code>135deg</code> is the diagonal used on a
              lot of hero sections. Radial gradients start at a center and move outward, which
              suits a glow or a vignette. Conic gradients sweep around a center, which suits a pie,
              a loading ring, or a color-wheel illustration. The same stop list can feed all three;
              the shape of the blend is what changes.
            </p>
            <p>
              Two stops at the same position make a hard edge, because the blend between them has
              zero length. A color hint, written as a percentage between two colors with no color
              of its own, moves the midpoint of that blend without adding a third color. Both are
              specified in CSS Images Level 4. The generator on this page copies the CSS for the
              stops you set; it does not invent a hint for you.
            </p>
            <p>
              sRGB interpolation between two saturated hues that sit far apart on the wheel often
              passes through a dull middle. CSS Color Level 4 lets you name an interpolation space,
              including Oklch. Provide a plain gradient first so browsers that do not understand{' '}
              <code>in oklch</code> still paint something. Read the longer version in the{' '}
              <Link href="/blog/css-gradients-guide">CSS gradients guide</Link> and the stop-by-stop
              notes in{' '}
              <Link href="/blog/7-practical-ways-to-choose-css-gradient-color-stops">
                7 practical ways to choose CSS gradient color stops
              </Link>
              .
            </p>
            <p>
              Text on a gradient does not have one contrast ratio. WCAG 2.2 Success Criterion 1.4.3
              compares text with the background behind it, and a gradient is many backgrounds.
              Sample the lightest and darkest points the glyphs can occupy in the{' '}
              <Link href="/contrast-checker">contrast checker</Link>. If either fails, put the type
              on a solid card. For print, a continuous blend is a screen effect. Pull the stops you
              care about into flat colors and check them in the{' '}
              <Link href="/print-gamut">print gamut checker</Link> before you send a file to press.
            </p>
          </>
        ),
      }}>
      <GradientGenerator />
    </ToolPageShell>
  );
}
