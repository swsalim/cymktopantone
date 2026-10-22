import { Metadata } from 'next';
import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { converters } from '@/config/converters';
import { ogImages, siteConfig } from '@/config/site';
import { internalTools } from '@/config/tools-internal';

import { absoluteUrl, cn } from '@/lib/utils';

import { Container } from '@/components/container';
import Faqs from '@/components/faq';
import { Prose } from '@/components/prose';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Free Color Tools — Palettes, Gradients, Contrast & More',
  description:
    'Free online color tools for designers and developers: palette generator, CSS gradients, WCAG contrast checker, tint/shade scales, image extraction, and format converters.',
  url: '/tools',
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: config.url },
  openGraph: {
    title: config.title,
    description: config.description,
    url: config.url,
    images: ogImages(config.title),
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: config.title,
    description: config.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: ogImages(config.title),
  },
};

const categoryLabels: Record<string, string> = {
  generator: 'Generators',
  checker: 'Checkers',
  accessibility: 'Accessibility',
  converter: 'Converters',
};

export default function ToolsHubPage() {
  const byCategory = internalTools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, typeof internalTools>,
  );

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl(config.url)} description={config.description} />
      <BreadcrumbJsonLd
        itemListElements={[
          { url: absoluteUrl('/'), name: 'Home' },
          { url: absoluteUrl('/tools'), name: 'Color Tools' },
        ]}
      />
      <Wrapper className="pb-8 md:pb-12">
        <Container as="section">
          <div className="to-cyan-50 dark:to-cyan-500/10 rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white/90 p-6 shadow-sm md:p-10 dark:border-violet-500/20 dark:from-violet-500/15 dark:via-gray-900">
            <p className="mb-4 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
              Free color toolkit
            </p>
            <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight text-gray-900 md:text-5xl dark:text-gray-100">
              Color Tools for Design, Print & Code
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg dark:text-gray-300">
              Generate palettes, build CSS gradients, check WCAG contrast, extract colors from
              photos, and convert between CMYK, RGB, HEX, HSL, and HSV — all free, no account
              required.
            </p>
          </div>

          {Object.entries(byCategory).map(([category, tools]) => (
            <div key={category} className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {categoryLabels[category] ?? category}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <Link key={tool.id} href={tool.href} className="group block">
                    <Card className="h-full border-violet-200/70 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700">
                      <CardContent className="p-5">
                        <p className="flex items-center justify-between font-medium text-foreground">
                          {tool.title}
                          <ExternalLinkIcon className="size-4 opacity-40 group-hover:opacity-100" />
                        </p>
                        <CardDescription className="mt-2 text-sm leading-relaxed">
                          {tool.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 max-w-3xl">
            <Prose>
              <h2>How the tools fit one color workflow</h2>
              <p>
                Start with a role, not a hex. A signature color, a body-text color, a surface, and a
                chart series are different jobs. If you do not have a seed color yet, the{' '}
                <Link href="/random-color-generator">random color generator</Link> can propose a
                HEX, a five-color palette, or a two-color linear gradient. The{' '}
                <Link href="/color-wheel">color wheel</Link> and the{' '}
                <Link href="/palettes">palette generator</Link> propose hues from a harmony rule.
                The <Link href="/colors">named color index</Link> is the place to look up a CSS
                keyword or a common neutral and see the same color as HEX, RGB, HSL, HSV, CMYK, and
                OKLCH.
              </p>
              <p>
                After the hues exist, check the pairs you will actually ship. The{' '}
                <Link href="/contrast-checker">contrast checker</Link> reports WCAG ratios for text
                on a background. The <Link href="/color-blindness">color blindness simulator</Link>{' '}
                previews protanopia, deuteranopia, and tritanopia so you can see hues that collapse.
                Simulation is not a diagnosis and it does not replace a label when meaning depends
                on color. The <Link href="/compare-colors">compare colors</Link> tool reports a
                Delta E 2000 distance when you need a number for two close swatches.
              </p>
              <p>
                Gradients are a separate step. Build stops in the{' '}
                <Link href="/gradients">CSS gradient generator</Link>, then read the{' '}
                <Link href="/blog/css-gradients-guide">CSS gradients guide</Link> and{' '}
                <Link href="/blog/7-practical-ways-to-choose-css-gradient-color-stops">
                  how to choose color stops
                </Link>
                . A gradient does not have one contrast ratio. Sample the light and dark ends under
                the text.
              </p>
              <p>
                Screen numbers and print numbers are not interchangeable. The{' '}
                <Link href="/print-gamut">print gamut checker</Link> and the format converters show
                a simple CMYK conversion so you can see a shift before you talk to a printer. They
                do not apply a press profile. The{' '}
                <Link href="/blog/the-complete-guide-to-managing-color-from-screen-to-press">
                  screen-to-press guide
                </Link>{' '}
                is the workflow around those tools. Scales for an interface live in the{' '}
                <Link href="/color-scale">tint and shade generator</Link>. Photos can be sampled
                with <Link href="/palette-from-image">palette from image</Link>, which runs in the
                browser and returns the most frequent color buckets, not a brand match.
              </p>
              <p>
                Hue relationships — complementary, analogous, triadic, and the rest — are explained
                in <Link href="/blog/color-theory-101">color theory 101</Link>. Use that article
                when the wheel markers are clear and the reason to pick one scheme is not.
              </p>
            </Prose>
          </div>

          <div className="mt-16">
            <Faqs
              tagline="FAQ"
              description="How the color tools relate, and what they do not decide for you."
              data={[
                {
                  question: 'Do I need an account?',
                  answer:
                    'No. The random color, palette, gradient, contrast, scale, image, simulation, wheel, gamut, compare, and converter tools run without an account.',
                },
                {
                  question: 'Which tool should I open first?',
                  answer:
                    'If you have one brand hex, start with the [palette generator](/palettes) or the [color wheel](/color-wheel). If you have a photo, start with [palette from image](/palette-from-image). If you already know the CSS name, open the [color index](/colors).',
                },
                {
                  question: 'Are the CMYK values a press proof?',
                  answer:
                    'No. Converters and the [print gamut checker](/print-gamut) use a channel conversion so you can see a shift. The printer’s profile, paper, and proof decide the ink.',
                },
                {
                  question: 'Does a passing contrast check mean the page is accessible?',
                  answer:
                    'It means that pair meets the ratio you tested. It does not cover focus, keyboard use, or information that depends on color alone. Preview hues in the [color blindness simulator](/color-blindness) and add a second cue when color carries meaning.',
                },
                {
                  question: 'Where are the format converters?',
                  answer: `The [converter hub](/convert-color) lists all ${converters.length} tools between CMYK, RGB, HEX, HSL, and HSV, including [HSL to HSV](/convert-hsl-to-hsv).`,
                },
              ]}
            />
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Format converters
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/convert-color"
                className="font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                View all {converters.length} converters →
              </Link>
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {converters.slice(0, 8).map((c) => (
                <Link
                  key={c.id}
                  href={c.url}
                  className={cn(
                    'rounded-lg border border-violet-200/70 bg-white/80 px-4 py-3 text-sm font-medium text-gray-900 transition hover:border-violet-400 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100',
                  )}
                >
                  {c.title.replace(' Color Converter', '')}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
