import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { gradientSubpages } from '@/config/tools-internal';
import { GradientType } from '@/lib/gradient';

import { GradientGenerator } from '@/components/color-tools/gradient-generator';
import { ToolPageShell, buildToolMetadata } from '@/components/color-tools/tool-page-shell';

const TYPE_COPY: Record<
  GradientType,
  {
    title: string;
    description: string;
    intro: string;
    faq: { question: string; answer: string }[];
  }
> = {
  linear: {
    title: 'Linear Gradient Generator — Free CSS Tool',
    description:
      'Create linear CSS gradients with custom angles and color stops. Live preview and instant copy — free online tool.',
    intro:
      'Linear gradients transition colors along a line. Adjust the angle from 0° to 360° for horizontal, vertical, or diagonal effects.',
    faq: [
      {
        question: 'What angle should a linear gradient use?',
        answer:
          '0deg points up, 90deg points to the right, and 180deg points down. 135deg is a common diagonal. Pick the angle that matches where the light or the headline sits, then set stop positions instead of leaving them to the browser.',
      },
      {
        question: 'How do I keep text readable on a linear gradient?',
        answer:
          'A gradient is many backgrounds. Check the lightest and darkest points under the text in the <a href="/contrast-checker">contrast checker</a>. WCAG 2.2 Success Criterion 1.4.3 needs 4.5:1 for normal text and 3:1 for large text where it applies. If a region fails, move the type onto a solid card.',
      },
      {
        question: 'Why does the middle of a two-stop linear gradient look gray?',
        answer:
          'sRGB interpolation between distant saturated hues often passes through a dull color. Add a middle stop, or interpolate in a different space. The <a href="/blog/css-gradients-guide">CSS gradients guide</a> and <a href="/blog/7-practical-ways-to-choose-css-gradient-color-stops">gradient stop guide</a> walk through both.',
      },
      {
        question: 'Can I print a linear CSS gradient?',
        answer:
          'A continuous blend is a screen paint. For press, extract the stops that matter and check those flat colors in the <a href="/print-gamut">print gamut checker</a> or the <a href="/convert-hex-to-cmyk">HEX to CMYK converter</a>. The CMYK values are a reference, not a press proof.',
      },
    ],
  },
  radial: {
    title: 'Radial Gradient Generator — Free CSS Tool',
    description:
      'Build radial CSS gradients for glows, spotlights, and circular fades. Copy ready-to-use CSS instantly.',
    intro:
      'Radial gradients spread from a center point outward — useful for glows, badges, and soft vignettes.',
    faq: [
      {
        question: 'When is a radial gradient a better fit than a linear one?',
        answer:
          'Use radial when the emphasis is a point: a spotlight behind a headline, a circular badge, or a vignette that darkens the edges. Use linear when the change should run from one side of a rectangle to the other.',
      },
      {
        question: 'What is the difference between circle and ellipse?',
        answer:
          'A circle keeps a constant radius. An ellipse stretches to the box, so the same stops look different in a wide hero and a square card. Preview the shape in the component size you will ship.',
      },
      {
        question: 'How do color stops work on a radial gradient?',
        answer:
          'Stops are still positions along the gradient line, measured from the center toward the edge. 0% is the center. The same positioning rules in CSS Images Level 4 apply. See <a href="/blog/7-practical-ways-to-choose-css-gradient-color-stops">how to choose gradient color stops</a>.',
      },
      {
        question: 'Do radial glows meet contrast requirements by themselves?',
        answer:
          'No. The ratio changes as the glow fades. Sample the text against the lightest and darkest pixels behind it with the <a href="/contrast-checker">contrast checker</a>, and read the <a href="/blog/css-gradients-guide">CSS gradients guide</a> before you put a headline on the glow.',
      },
    ],
  },
  conic: {
    title: 'Conic Gradient Generator — Free CSS Tool',
    description:
      'Generate conic CSS gradients for pie charts, color wheels, and angular transitions. Free with live preview.',
    intro:
      'Conic gradients rotate hues around a center point — useful for pies, loaders, and angular patterns.',
    faq: [
      {
        question: 'What is a conic gradient?',
        answer:
          'A conic gradient paints colors around a center, like a sweep. CSS uses conic-gradient(). The from angle sets where the sweep starts. Stops are angles or percentages around the circle.',
      },
      {
        question: 'How do I make hard slices instead of a smooth sweep?',
        answer:
          'Place two stops at the same position. The blend between them has zero length, so the edge is sharp. That is the same hard-stop pattern described in the <a href="/blog/7-practical-ways-to-choose-css-gradient-color-stops">gradient stop guide</a>.',
      },
      {
        question: 'Can a conic gradient replace a color wheel?',
        answer:
          'It can draw a wheel, but it does not compute harmonies. Use the <a href="/color-wheel">interactive color wheel</a> to pick complementary, analogous, or triadic hues, then bring those hex values back here as stops. The relationships are explained in <a href="/blog/color-theory-101">color theory 101</a>.',
      },
      {
        question: 'Should chart slices rely on color alone?',
        answer:
          'No. WCAG 2.2 Success Criterion 1.4.1 says color cannot be the only visual means of conveying information. Label slices or add a pattern. Preview problem pairs in the <a href="/color-blindness">color blindness simulator</a>.',
      },
    ],
  },
};

const TYPE_BODY: Record<GradientType, { heading: string; paragraphs: string[] }> = {
  linear: {
    heading: 'How a linear gradient is built',
    paragraphs: [
      'linear-gradient() paints along a gradient line. You choose the direction, then a list of color stops. Each stop is a color and, optionally, a position. The browser interpolates between stops. If a later stop is positioned before an earlier one, CSS moves the earlier stop forward so positions never run backwards, which turns the blend into a hard edge. Set the positions you mean instead of relying on that fixup.',
      'A first stop at 0% and a last stop at 100% use the whole element. A first stop at 20% paints a solid band from the start edge until that stop, then blends. That band is useful for a header bar and accidental when you wanted a full fade. Two stops that share a position, such as a color at 50% followed by a different color at 50%, create a stripe with no blend.',
      'Angle and stops are independent. Changing 90deg to 180deg rotates the same stop list. It does not change which color is which. Build the palette in the palette generator first if the stops should stay in one family, then paste them here.',
      'Older browsers that do not understand a color interpolation method still need a plain linear-gradient line before any line that uses in oklch or in oklab. The first declaration is the fallback. The second is the one newer browsers keep.',
    ],
  },
  radial: {
    heading: 'How a radial gradient is built',
    paragraphs: [
      'radial-gradient() starts at a center and moves out. The ending shape is a circle or an ellipse. Circle keeps the color rings round. Ellipse stretches them to the box, so a wide section and a square button will not look like the same glow even with the same stops.',
      'Stop positions are distances from the center. 0% sits on the center point. 100% sits on the ending shape. A transparent end stop should name the color you are fading, such as rgb(0 0 0 / 0), instead of the keyword transparent. The keyword still interpolates from a color, and the fade can pick up a cast you did not want.',
      'A radial glow behind text is still a contrast problem. The center may be light while the edge is dark, or the reverse. Check both regions. If the headline crosses the whole glow, every region under the glyphs has to pass the contrast ratio you need.',
      'Radial gradients are a screen treatment. A press does not reproduce a CSS glow as a continuous blend. If the same artwork is going to print, pick the flat colors that matter and check those, not a screenshot of the glow.',
    ],
  },
  conic: {
    heading: 'How a conic gradient is built',
    paragraphs: [
      'conic-gradient() sweeps around a center. The from angle sets the start of the sweep. Stops can be percentages or angles. 0% and 100% meet at the start angle, so a wheel that should close needs the first and last colors to be the ones you want touching.',
      'Hard slices use coincident stops. A pie with three equal parts can place colors at 0%, 0% to 33%, 33% to 66%, and 66% to 100%, repeating the color at each boundary so nothing blends across the cut. A smooth hue sweep leaves the positions out or spaces them on purpose.',
      'Conic gradients show up in dashboards more often than in marketing heroes. A chart that uses hue as the only difference between series fails for people who cannot separate those hues. Add labels. The color wheel is the place to pick the hues; this page is the place to turn them into CSS.',
      'The same interpolation caveat applies. A sweep between saturated, distant hues in sRGB can look muddy on one side of the circle. Compare the rendered result in the browsers you support before you treat the CSS as finished.',
    ],
  },
};

export function generateStaticParams() {
  return gradientSubpages.map(({ slug }) => ({ type: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type: slug } = await params;
  const entry = gradientSubpages.find((p) => p.slug === slug);
  const gradientType = entry?.type ?? 'linear';
  const copy = TYPE_COPY[gradientType];
  return buildToolMetadata({
    title: copy.title,
    description: copy.description,
    url: `/gradients/${slug}`,
    h1: entry?.title ?? 'Gradient Generator',
  });
}

export default async function GradientTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: slug } = await params;
  const entry = gradientSubpages.find((p) => p.slug === slug);
  if (!entry) notFound();

  const copy = TYPE_COPY[entry.type];
  const body = TYPE_BODY[entry.type];

  return (
    <ToolPageShell
      config={{
        title: copy.title,
        description: copy.description,
        url: `/gradients/${slug}`,
        h1: entry.title,
        intro: copy.intro,
        faq: copy.faq,
        faqDescription: `Questions about ${entry.type} CSS gradients and this generator.`,
        content: (
          <>
            <h2>{body.heading}</h2>
            {body.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p>
              Compare this with the other shapes in the{' '}
              <Link href="/gradients">CSS gradient generator</Link>, including{' '}
              <Link href="/gradients/linear">linear</Link>, <Link href="/gradients/radial">radial</Link>
              , and <Link href="/gradients/conic">conic</Link>. The{' '}
              <Link href="/blog/css-gradients-guide">CSS gradients guide</Link> covers syntax, and{' '}
              <Link href="/blog/7-practical-ways-to-choose-css-gradient-color-stops">
                choosing color stops
              </Link>{' '}
              covers positions, hints, and hard edges. Pull seed colors from the{' '}
              <Link href="/palettes">palette generator</Link> or from a photo with{' '}
              <Link href="/palette-from-image">palette from image</Link>.
            </p>
          </>
        ),
      }}>
      <GradientGenerator initialType={entry.type} />
    </ToolPageShell>
  );
}
