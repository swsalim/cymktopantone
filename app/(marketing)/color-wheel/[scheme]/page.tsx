import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { harmonySubpages } from '@/config/tools-internal';

import { HarmonyScheme } from '@/lib/palette-harmony';

import { ColorWheel } from '@/components/color-tools/color-wheel';
import { buildToolMetadata, ToolPageShell } from '@/components/color-tools/tool-page-shell';

const SCHEME_COPY: Record<HarmonyScheme, { title: string; description: string; intro: string }> = {
  complementary: {
    title: 'Complementary Color Wheel — Find Opposite Colors',
    description:
      'Interactive color wheel for complementary pairs. Drag to a hue and see its exact opposite — with HEX, RGB, and CMYK values.',
    intro:
      'Complementary colors sit 180° apart on the wheel. Drag the marker to any hue and the wheel shows its opposite instantly.',
  },
  analogous: {
    title: 'Analogous Color Wheel — Neighboring Hues',
    description:
      'Interactive color wheel for analogous schemes. Pick a hue and see its neighbors — cohesive palettes with HEX, RGB, and CMYK values.',
    intro:
      'Analogous colors are neighbors on the wheel. Pick a base hue and the markers show the adjacent hues that pair naturally with it.',
  },
  triadic: {
    title: 'Triadic Color Wheel — Three Balanced Hues',
    description:
      'Interactive color wheel for triadic schemes. Three hues 120° apart — vibrant, balanced palettes with HEX, RGB, and CMYK values.',
    intro:
      'Triadic schemes place three hues 120° apart. Drag the marker and watch the triangle rotate with your base color.',
  },
  'split-complementary': {
    title: 'Split Complementary Color Wheel',
    description:
      'Interactive color wheel for split complementary schemes — a base hue plus the two colors flanking its opposite.',
    intro:
      'Split complementary softens a direct complement: your base hue plus the two colors flanking its opposite — contrast without tension.',
  },
  monochromatic: {
    title: 'Monochromatic Color Wheel — One Hue, Many Shades',
    description:
      'Interactive color wheel for monochromatic schemes. One hue across light and dark steps — clean, unified palettes.',
    intro:
      'Monochromatic schemes keep one hue and vary the lightness. Use the lightness slider to walk the shade range of your base color.',
  },
  tetradic: {
    title: 'Tetradic Color Wheel — Four-Hue Rectangle',
    description:
      'Interactive color wheel for tetradic schemes — four hues forming a rectangle. Rich palettes with HEX, RGB, and CMYK values.',
    intro:
      'Tetradic schemes combine two complementary pairs into a rectangle on the wheel — the richest harmony rule, best with one dominant hue.',
  },
};

const SCHEME_NOTES: Record<
  HarmonyScheme,
  { paragraphs: string[]; faq: { question: string; answer: string }[] }
> = {
  complementary: {
    paragraphs: [
      'Complementary hues sit opposite each other, 180 degrees apart. The wheel marker for the pair lands straight across from the base hue. That opposition is why the two colors separate so clearly in a layout, and why they can also vibrate when both are fully saturated and placed in equal area.',
      'A practical complementary palette does not use both hues at full strength for text. Keep one as the accent — a button, a chart mark, a headline — and let the other recede as a tint or a darker shade. The generator adds lighter and darker steps for that reason. Lock the brand hue and vary the rest in the palette tool.',
      'Hue is only one of the three channels. Saturation and lightness decide whether the pair is usable for text. Two complementary colors can both fail contrast on white even though they look different from each other. Check each swatch against its actual background.',
      'The relationship is the one described in color theory as a direct complement. It is a layout rule, not a guarantee that the colors will print the same way they look on a bright display. Saturated complements are often the first colors to leave a CMYK gamut.',
    ],
    faq: [
      {
        question: 'What is a complementary color?',
        answer:
          'It is the hue opposite your base color on the wheel, 180 degrees away. The [color theory guide](/blog/color-theory-101) explains hue, saturation, and value before you rely on the pair.',
      },
      {
        question: 'Why do complementary colors sometimes look like they flicker?',
        answer:
          'Equal areas of two saturated opposites compete. Reduce the area or the saturation of one hue, or separate them with a neutral. Neutrals are listed on the [named colors index](/colors).',
      },
      {
        question: 'Does a complementary pair pass WCAG automatically?',
        answer:
          'No. Contrast is a luminance ratio between text and its background, not a hue relationship. Check the pair in the [contrast checker](/contrast-checker).',
      },
      {
        question: 'Where do I turn the wheel colors into a palette?',
        answer:
          'Open the [complementary palette generator](/palettes/complementary). It keeps the opposite hue and adds tints and shades you can export.',
      },
    ],
  },
  analogous: {
    paragraphs: [
      'Analogous hues are neighbors. On this wheel they sit a short step to either side of the base hue, so the scheme stays inside one region of the spectrum. That is why analogous palettes feel calm: nothing in the set is fighting its opposite.',
      'The risk is the opposite of complementary contrast. Neighbors can be too close to tell apart in a small UI, especially once you lower saturation for surfaces. If a selected tab and an unselected tab are analogous and similar in lightness, the state disappears. Change lightness, add a border, or add a label.',
      'Analogous stops also make the least muddy gradients, because the interpolation does not have to cross the wheel. Build the hues here, then place them as stops in the gradient generator. Positions still matter; closeness of hue does not choose the stop positions for you.',
      'A neighbor scheme is still just hue. Read the color theory guide if saturation and value are new. Those two channels are what make one analogous color a background and another a heading.',
    ],
    faq: [
      {
        question: 'What is an analogous color scheme?',
        answer:
          'Hues that sit next to each other on the wheel. The [color theory guide](/blog/color-theory-101) covers why neighboring hues feel related.',
      },
      {
        question: 'How many analogous hues should a UI use?',
        answer:
          'Three is usually enough: a base, one step warmer, one step cooler. More neighbors start to look like one color at small sizes. Separate them with lightness, not with extra hues.',
      },
      {
        question: 'Can analogous colors fail contrast?',
        answer:
          'Yes. Similar hues often have similar luminance. Measure text against the surface in the [contrast checker](/contrast-checker) instead of judging the wheel.',
      },
      {
        question: 'How do I export the scheme?',
        answer:
          'Send it to the [analogous palette generator](/palettes/analogous) to lock swatches and copy CSS or Tailwind tokens.',
      },
    ],
  },
  triadic: {
    paragraphs: [
      'A triad places three hues about 120 degrees apart, an even triangle on the wheel. The triangle rotates when you drag the base hue, so the relationship stays even while the actual colors change. That evenness is why triads show up in brand systems that want energy without a single opposite.',
      'Three saturated triad colors at equal area compete. Pick one dominant hue for large surfaces and use the other two as accents. The extra swatches on the palette page are tints and shades of the triad so you have somewhere to put body text.',
      'Triads are also where sRGB gradients get muddy. A blend from one triad hue to the next crosses a long arc and often grays out in the middle. If you need a blend, add a stop or change the interpolation space, and read the gradient guides before you ship the hero.',
      'The wheel shows the geometry. It does not check contrast, color-vision simulation, or print gamut. Those are separate tools, and a triad that looks balanced on the wheel can still fail all three.',
    ],
    faq: [
      {
        question: 'What is a triadic color scheme?',
        answer:
          'Three hues spaced evenly around the wheel, about 120 degrees apart. See [color theory 101](/blog/color-theory-101) for hue as a wheel position.',
      },
      {
        question: 'How do I keep a triad from looking chaotic?',
        answer:
          'Let one hue dominate the area. Use the other two in smaller marks. Tints of the same hues, from the [triadic palette generator](/palettes/triadic), calm the layout without leaving the scheme.',
      },
      {
        question: 'Will a triad print the way it looks on screen?',
        answer:
          'Not necessarily. Saturated hues often shift in CMYK. Check the swatches in the [print gamut checker](/print-gamut) and treat the result as a reference, not a proof.',
      },
      {
        question: 'Where should text colors come from?',
        answer:
          'From a darker or lighter step that passes contrast, not from the most saturated triad hue. Confirm the pair in the [contrast checker](/contrast-checker).',
      },
    ],
  },
  'split-complementary': {
    paragraphs: [
      'Split complementary starts with a base hue, then takes the two hues on either side of its opposite instead of the opposite itself. You still get contrast, and you avoid a single head-on complement. On the wheel the two accent markers sit just off the 180-degree line.',
      'The scheme is easier to live with in an interface than a pure complement because the two accents are related to each other. They are analogous to one another and both contrast with the base. Use the base for the brand field and one accent for actions. The second accent can mark a different state, as long as that state also has a label or an icon.',
      'Do not assume the two accents are distinguishable to everyone. They sit near each other, so a red-green pair in this arrangement can collapse under a color-vision simulation. Run the colors through the simulator and add a second cue.',
      'Lightness still does the work for text. A split complement chosen only for hue can be too light for body copy on white. The color theory guide is the short version of why value is a separate decision from the wheel position.',
    ],
    faq: [
      {
        question: 'How is split complementary different from complementary?',
        answer:
          'Complementary uses the exact opposite hue. Split complementary uses the two hues beside that opposite. The [color theory guide](/blog/color-theory-101) describes both as hue relationships.',
      },
      {
        question: 'Which color should be dominant?',
        answer:
          'Usually the base hue, in a larger area, with the two split accents used sparingly. Build that balance in the [split complementary palette generator](/palettes/split-complementary).',
      },
      {
        question: 'Can the two accent hues be too close?',
        answer:
          'Yes. They are neighbors of each other. If a status depends on telling them apart, add a label and check the [color blindness simulator](/color-blindness).',
      },
      {
        question: 'Does this scheme handle text contrast?',
        answer:
          'The wheel does not measure contrast. Check text and background in the [contrast checker](/contrast-checker).',
      },
    ],
  },
  monochromatic: {
    paragraphs: [
      'A monochromatic scheme keeps one hue and changes lightness. On this wheel the hue marker stays put while the lightness control walks from a light step to a dark step. That is the whole scheme: one position on the wheel, many values.',
      'This is the safest structure for a product UI. Borders, surfaces, and text can share a hue and still separate if their lightness differs enough. It is also the easiest scheme to get wrong by staying in the middle of the range, where every step looks like the same gray-blue and none of them pass as text on another.',
      'Saturation can stay high while lightness changes, or you can drop saturation on the large surfaces so the saturated step is reserved for the accent. The palette generator’s monochromatic mode outputs a set of steps you can export. The tint and shade tool builds a longer 50–950 ramp from one hex.',
      'One hue does not mean one contrast ratio. A light step of the hue on a white page can fail, while a dark step of the same hue passes. Measure the pair you will actually ship.',
    ],
    faq: [
      {
        question: 'What is a monochromatic palette?',
        answer:
          'One hue at several lightness levels. Hue, saturation, and value are defined in [color theory 101](/blog/color-theory-101).',
      },
      {
        question: 'How is this different from a tint and shade scale?',
        answer:
          'The wheel shows the hue relationship. The [tint and shade generator](/color-scale) builds an eleven-step ramp, and the [monochromatic palette generator](/palettes/monochromatic) keeps five steps you can export.',
      },
      {
        question: 'Why do some steps look identical?',
        answer:
          'If saturation is low, lightness steps are the only difference, and small steps are hard to see. Increase the lightness gap before you add a second hue.',
      },
      {
        question: 'Which step should be body text?',
        answer:
          'A dark step on a light surface, or the reverse, after the [contrast checker](/contrast-checker) shows the ratio you need. The middle step is rarely the text color.',
      },
    ],
  },
  tetradic: {
    paragraphs: [
      'A tetrad is four hues arranged as a rectangle: two complementary pairs. Dragging the base hue rotates the rectangle. You get more colors than a triad, which is useful for an illustration system and easy to overuse in a UI.',
      'Four saturated hues at equal weight do not read as a system. Choose one dominant pair and let the second pair appear in small areas — a chart series, an illustration, a secondary button. The rectangle guarantees hue spacing. It does not assign roles.',
      'Because the scheme contains complements, it also contains the problems of complements: vibration, gamut shift, and gradients that gray out between opposite stops. Use the wheel to find the four hues, then decide which two are allowed to be large.',
      'If the rectangle is hard to hold in your head, go back to the color theory guide and name each hue’s job before you export tokens. A token without a role is how four-hue systems become five-hue systems by accident.',
    ],
    faq: [
      {
        question: 'What is a tetradic scheme?',
        answer:
          'Four hues in a rectangle, made of two complementary pairs. The geometry is the part covered under hue in [color theory 101](/blog/color-theory-101).',
      },
      {
        question: 'How do I stop a tetrad from looking busy?',
        answer:
          'Give most of the area to one hue. Keep the other three for accents. Refine the set in the [tetradic palette generator](/palettes/tetradic).',
      },
      {
        question: 'Are all four hues safe for text?',
        answer:
          'No. Check each text and background pair in the [contrast checker](/contrast-checker). Hue spacing is not a contrast result.',
      },
      {
        question: 'Should I simulate color vision on a four-hue palette?',
        answer:
          'Yes, especially when two of the hues carry different meanings. Use the [color blindness simulator](/color-blindness) and add labels where hues move closer together.',
      },
    ],
  },
};

export function generateStaticParams() {
  return harmonySubpages.map(({ slug }) => ({ scheme: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scheme: string }>;
}): Promise<Metadata> {
  const { scheme: slug } = await params;
  const entry = harmonySubpages.find((p) => p.slug === slug);
  const scheme = entry?.scheme ?? 'complementary';
  const copy = SCHEME_COPY[scheme];
  return buildToolMetadata({
    title: copy.title,
    description: copy.description,
    url: `/color-wheel/${slug}`,
    h1: copy.title,
  });
}

export default async function ColorWheelSchemePage({
  params,
}: {
  params: Promise<{ scheme: string }>;
}) {
  const { scheme: slug } = await params;
  const entry = harmonySubpages.find((p) => p.slug === slug);
  if (!entry) notFound();

  const copy = SCHEME_COPY[entry.scheme];
  const notes = SCHEME_NOTES[entry.scheme];

  return (
    <ToolPageShell
      config={{
        title: copy.title,
        description: copy.description,
        url: `/color-wheel/${slug}`,
        h1: `${entry.title.replace('Palette Generator', 'Color Wheel')}`,
        intro: copy.intro,
        faq: notes.faq,
        faqDescription: `Questions about the ${entry.scheme} color wheel.`,
        content: (
          <>
            <h2>How this harmony sits on the wheel</h2>
            {notes.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            <p>
              The relationships are introduced in{' '}
              <Link href="/blog/color-theory-101">color theory 101</Link>. Explore every rule on the{' '}
              <Link href="/color-wheel">main color wheel</Link>, or lock swatches in the{' '}
              <Link href={`/palettes/${slug}`}>{entry.scheme} palette generator</Link>. Named
              swatches live in the <Link href="/colors">color index</Link>.
            </p>
          </>
        ),
      }}
    >
      <ColorWheel initialScheme={entry.scheme} showSchemePicker={false} />
    </ToolPageShell>
  );
}
