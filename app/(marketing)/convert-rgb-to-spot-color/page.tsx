import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { buildToolMetadata, ToolPageShell } from '@/components/color-tools/tool-page-shell';
import { Container } from '@/components/container';
import FaqAnswer from '@/components/faq-answer';
import FaqJsonLd from '@/components/structured-data/faq-json-ld';
import JsonLd from '@/components/structured-data/json-ld';
import { SPOT_SET_COUNT, SPOT_SET_EXAMPLE_CODE } from '@/lib/spot-set';
import { absoluteUrl } from '@/lib/utils';

const SpotColorMatcher = dynamic(
  () =>
    import('@/components/color-tools/spot-color-matcher').then((mod) => mod.SpotColorMatcher),
  {
    loading: () => (
      <p className="px-4 py-8 text-sm text-gray-700">Enter a color to see its closest matches.</p>
    ),
  },
);

const DISCLAIMER =
  'Color Mapper is an independent tool and is not affiliated with or endorsed by any color-standard or ink company. Results come from our own reference set.';

const SCHEMA_DESCRIPTION =
  "Finds the closest colors to an RGB, HEX, HSL, HSV or CMYK value in Color Mapper's own reference set, ranked by ΔE2000, with a CMYK process build.";

const FAQ = [
  {
    question: "Is this the same as a match from a printer's swatch book?",
    answer:
      "No. Results come from Color Mapper's own reference set, which is a grid of screen colors and not a physical ink library. Use them to compare and communicate colors, then ask your printer to match the values in the swatch system they use and check a printed proof.",
  },
  {
    question: 'Can I order an ink by its reference code?',
    answer:
      'No. The codes label positions in our grid, and no printer stocks inks under them. Send your printer the HEX, RGB and CMYK values shown on this page instead.',
  },
  {
    question: 'Does the converter show coated and uncoated results?',
    answer:
      "Not in this version. Coated and uncoated describe how ink looks on different papers, and our set is made of screen colors that haven't been measured on paper. Tell your printer which stock you're using, and judge the proof on that paper.",
  },
  {
    question: 'What does the ΔE2000 number mean?',
    answer:
      "It's a standard measure of how different two colors look. 0 means the screen values are the same, and higher numbers mean a more visible difference. It compares screen values only and can't tell you how an ink will look on paper.",
  },
] as const;

const RELATED = [
  {
    href: '/convert-rgb-to-cmyk',
    anchor: 'RGB to CMYK converter',
    text: 'see the process build for any RGB value',
  },
  {
    href: '/convert-hex-to-rgb',
    anchor: 'HEX to RGB converter',
    text: 'split a HEX code into red, green and blue',
  },
  { href: '/convert-hsv-to-rgb', anchor: 'HSV to RGB converter', text: '' },
  { href: '/convert-cmyk-to-rgb', anchor: 'CMYK to RGB converter', text: '' },
  {
    href: '/print-gamut',
    anchor: 'Print gamut checker',
    text: 'check a whole palette for CMYK shifts',
  },
  {
    href: '/compare-colors',
    anchor: 'Compare colors (ΔE2000)',
    text: 'measure the difference between two colors',
  },
  {
    href: '/blog/spot-color-process-color',
    anchor: 'Spot color vs process color',
    text: 'which printing method fits your job',
  },
  { href: '/color-models/cmyk', anchor: 'CMYK color model', text: '' },
  {
    href: '/blog/the-complete-guide-to-managing-color-from-screen-to-press',
    anchor: 'Managing color from screen to press',
    text: '',
  },
] as const;

const config = {
  title: 'RGB to Spot Color Converter',
  description:
    'Enter an RGB, HEX, HSL, HSV or CMYK color and get the closest colors in our own spot-color reference set, with ΔE and a CMYK build. Independent, free.',
  url: '/convert-rgb-to-spot-color',
  h1: 'RGB to Spot Color Converter',
  imageAlt:
    'RGB to spot color converter showing the closest reference colors and a CMYK process build',
  intro:
    "Enter a screen color and see the closest matches in Color Mapper's own spot-color reference set, ranked by how different they look (ΔE2000). You also get your color's CMYK process build and how far it shifts on press, so you can see whether four-color print will hold it or a spot ink is worth asking your printer about. It's free, works with RGB, HEX, HSL, HSV or CMYK, and runs in your browser.",
};

export const metadata: Metadata = {
  ...buildToolMetadata(config),
  robots: { index: true, follow: true },
};

export default function ConvertRgbToSpotColorPage() {
  return (
    <>
      <JsonLd id="spot-color-webapp-jsonld">
        {{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: config.h1,
          description: SCHEMA_DESCRIPTION,
          applicationCategory: 'DesignApplication',
          operatingSystem: 'Web',
          url: absoluteUrl(config.url),
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }}
      </JsonLd>
      <ToolPageShell
        config={{
          ...config,
          content: (
            <>
              <h2>What this converter gives you</h2>
              <p>For any color you enter, the converter shows:</p>
              <ul>
                <li>
                  <strong>The closest 3 to 6 colors in our reference set</strong>, each with its
                  code, HEX value, ΔE2000 distance and a plain-language label for how close it is.
                  ΔE2000 is a standard formula for how different two colors look to the eye. Lower
                  means closer, and 0 means the same screen color.
                </li>
                <li>
                  <strong>Your color&apos;s CMYK process build</strong>, plus what it turns into
                  after a standard CMYK round trip. That tells you whether ordinary four-color
                  printing will keep it.
                </li>
              </ul>
              <p>
                The match is the closest one in our own set, measured on screen values. It&apos;s
                useful for comparing options, setting up a palette, or seeing how far a color is
                from anything nearby. When the job is ink on paper, take the values to your
                printer, who will match them in the swatch system they use. The{' '}
                <Link href="/blog/spot-color-process-color">Spot color vs process color guide</Link>{' '}
                explains the difference.
              </p>

              <h2>How are RGB, CMYK and spot color different?</h2>
              <p>
                <strong>RGB</strong> is light. Screens mix red, green and blue light, so an RGB or
                HEX value describes what a display should show, and different displays show it
                slightly differently.
              </p>
              <p>
                <strong>CMYK</strong> is four-color process ink. A press builds the color from cyan,
                magenta, yellow and black dots. Many bright screen colors, especially saturated
                greens, blues and neons, sit outside what CMYK can print, so they shift. You can see
                the numbers with the <Link href="/convert-rgb-to-cmyk">RGB to CMYK converter</Link>.
              </p>
              <p>
                <strong>Spot color</strong> is a single ink mixed to a recipe before printing, with
                its own plate. It can hit colors that CMYK can&apos;t and stays consistent from run
                to run, which is why brands use it for logos.
              </p>
              <p>
                Spot inks are usually chosen from one of the proprietary spot-color systems, and the
                printer matches the ink to a physical chip from that system.
              </p>
              <p>
                The <Link href="/color-models/cmyk">CMYK color model page</Link> covers process
                color in more depth.
              </p>

              <h2>Why can&apos;t a screen show a spot ink faithfully?</h2>
              <p>
                A spot ink is a physical thing: ink on a particular paper, seen under a particular
                light. Coated and uncoated paper make the same ink look different, and so do varnish
                and the paper&apos;s own whiteness. A screen color has none of that. It&apos;s a
                code that each monitor interprets with its own brightness and white point.
              </p>
              <p>
                So every on-screen spot color, ours included, is a simulation. That&apos;s why this
                tool reports a distance instead of claiming a match, and why the final check for
                anything printed is a physical proof on the real stock.
              </p>

              <h2>How do I brief a printer with these results?</h2>
              <ol>
                <li>
                  <strong>Pick your screen color.</strong> Use the HEX or RGB value from your
                  design file or brand guide.
                </li>
                <li>
                  <strong>Check whether CMYK can hold it.</strong> Look at the shift in the process
                  panel. If it&apos;s small, four-color print may be enough. If it&apos;s large, ask
                  about a spot ink.
                </li>
                <li>
                  <strong>Send the values, not our code.</strong> Give the printer the HEX, RGB and
                  CMYK values, and use the closest reference colors to show how much leeway
                  you&apos;re willing to accept.
                </li>
                <li>
                  <strong>Ask which swatch system they use,</strong> and have them propose the
                  nearest ink from it.
                </li>
                <li>
                  <strong>Approve a printed proof</strong> on the paper you&apos;ll actually use
                  before the full run.
                </li>
              </ol>
              <p>
                To compare two candidate colors side by side, paste both into{' '}
                <Link href="/compare-colors">Compare colors</Link>, which reports the ΔE2000 between
                them.
              </p>

              <h2>About this reference set</h2>
              <p>
                The reference set is Color Mapper&apos;s own work. We built it from a regular
                mathematical grid, not from any commercial color library. Here&apos;s how:
              </p>
              <ul>
                <li>
                  <strong>Color space:</strong> OKLCH, a perceptual color space in which equal steps
                  look roughly equal.
                </li>
                <li>
                  <strong>Grid:</strong> 36 hues (every 10°) × 8 lightness steps (0.25 to 0.93) × 5
                  chroma steps (0.04 to 0.20). We keep only the colors a standard sRGB screen can
                  show, then add 10 neutrals. That makes <strong>{SPOT_SET_COUNT} reference colors.</strong>
                </li>
                <li>
                  <strong>Codes:</strong> each code describes where a color sits on the grid, for
                  example {SPOT_SET_EXAMPLE_CODE}. They&apos;re labels for positions on our grid and
                  not ink names.
                </li>
                <li>
                  <strong>Ranking:</strong> your input is converted to sRGB, then to CIELAB, and the
                  set is ranked by CIEDE2000 (ΔE2000).
                </li>
                <li>
                  <strong>What it isn&apos;t:</strong> this isn&apos;t an ink library. Nobody can mix
                  one of our codes on press, and the set hasn&apos;t been measured on coated or
                  uncoated paper. That&apos;s also why this version has no coated or uncoated switch.
                </li>
              </ul>

              <h2>Frequently asked questions</h2>
              <FaqJsonLd questionListElement={[...FAQ]} />
              <dl>
                {FAQ.map((item) => (
                  <div key={item.question}>
                    <dt>
                      <strong>{item.question}</strong>
                    </dt>
                    <dd>
                      <FaqAnswer text={item.answer} />
                    </dd>
                  </div>
                ))}
              </dl>

              <h2>Related color tools</h2>
              <ul>
                {RELATED.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.anchor}</Link>
                    {item.text ? `: ${item.text}` : null}
                  </li>
                ))}
              </ul>
            </>
          ),
        }}>
        <Container className="pt-4">
          <p className="mx-auto max-w-3xl text-sm text-gray-600 dark:text-gray-300">{DISCLAIMER}</p>
        </Container>
        <SpotColorMatcher disclaimer={DISCLAIMER} />
      </ToolPageShell>
    </>
  );
}
