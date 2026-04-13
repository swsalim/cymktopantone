import { Metadata } from 'next';
import Link from 'next/link';

import { hsvFaqs } from '@/config/colors';
import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import Faqs from '@/components/faq';
import { ImageKit } from '@/components/image-kit';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'HSV Color Model: Hue, Saturation & Value for Digital Design',
  description:
    'Learn the HSV (Hue, Saturation, Value) color model: how pickers and editors use it, how it differs from HSL, and how to convert HSV for web and print.',
  url: '/color-models/hsv',
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: {
    canonical: config.url,
  },
  openGraph: {
    title: config.title,
    description: config.description,
    url: config.url,
    images: [
      {
        url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: config.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: config.title,
    description: config.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: config.title,
      },
    ],
  },
};

const JSONLDbreadcrumbs = [
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/color-models/hsv`),
    name: 'HSV Color Model',
  },
];

export default function ColorModelHsv() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/color-models/hsv')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container as="section" className="prose max-w-4xl pb-12 dark:prose-invert md:pb-24">
          <h1>HSV Color Model: Hue, Saturation &amp; Value Explained</h1>

          <p className="lead">
            Screens and software speak in <Link href="/color-models/rgb">RGB</Link> and{' '}
            <Link href="/color-models/hex">HEX</Link>, but humans rarely think in three channel
            intensities. <strong>HSV</strong> (Hue, Saturation, Value) is a cylindrical model that
            matches how many color pickers, photo tools, and 3D pipelines let you choose and tweak
            color—rotate the hue, dial vividness, then brighten or darken with value.
          </p>

          <p>
            For a practical tour of the same three ideas in branding and UI, see our{' '}
            <Link href="/blog/color-theory-101">Color Theory 101: Hue, Saturation &amp; Value</Link>{' '}
            guide—it pairs well with this technical overview of the HSV model.
          </p>

          <section>
            <h2>What is HSV?</h2>
            <p>
              <em>HSV</em> breaks a screen color into three numbers that are easy to reason about:
            </p>
            <ul>
              <li>
                <strong>Hue (H)</strong> — the &quot;which color&quot; angle on a 360° wheel (red near
                0°, green near 120°, blue near 240°, and so on).
              </li>
              <li>
                <strong>Saturation (S)</strong> — how intense the hue is, from a neutral gray axis at
                0% to full chroma at 100%.
              </li>
              <li>
                <strong>Value (V)</strong> — brightness, often 0–100%. At 0% you get black; with full
                saturation, 100% value is the brightest display of that hue. When saturation is 0%,
                value alone sweeps from black to white.
              </li>
            </ul>

            <figure className="text-center">
              <ImageKit
                directory="cymktopantone/images"
                src="hue-saturation-value.webp"
                width={600}
                height={600}
                alt="Diagram of hue, saturation, and value in the HSV color model"
                className="mx-auto"
              />
              <figcaption>Credit: virtualartacademy.com</figcaption>
            </figure>

            <p>
              Many apps label the same space <strong>HSB</strong> (Hue, Saturation, Brightness).
              HSV and HSB refer to the same family of models; only the naming differs.
            </p>
          </section>

          <Wrapper className="mx-auto text-center">
            <div className="mx-auto">
              <div ta-ad-container=""></div>
            </div>
          </Wrapper>

          <section>
            <h2>HSV vs HSL: same letters, different math</h2>
            <p>
              <Link href="/color-models/hsl">HSL</Link> also uses hue and saturation, but it replaces
              value with <strong>lightness</strong>. Lightness is defined as the midpoint between the
              minimum and maximum of RGB channels, which feels natural in CSS{' '}
              <code>hsl()</code> and many design-system palettes. Value in HSV behaves differently
              near white and black, so <code>hsv(200, 80%, 90%)</code> and{' '}
              <code>hsl(200, 80%, 90%)</code> are not the same color.
            </p>
            <p>
              Rule of thumb: use <strong>HSV</strong> when your tool or pipeline exposes it (photo
              apps, some game engines, classic macOS/Windows pickers). Prefer <strong>HSL</strong>{' '}
              when you are hand-writing web colors or documenting tokens that mirror CSS.
            </p>
          </section>

          <section>
            <h2>Why HSV matters in real workflows</h2>
            <ul>
              <li>
                <strong>Retouching and grading</strong> — adjusting value reads like lifting or
                crushing exposure while keeping hue stable; saturation isolates chroma without
                guessing RGB ratios.
              </li>
              <li>
                <strong>Prototyping UI states</strong> — you can nudge value for hover/disabled
                states, then convert to <Link href="/color-models/hex">HEX</Link> for production CSS.
              </li>
              <li>
                <strong>Handoff to print</strong> — screens stay in RGB; print uses{' '}
                <Link href="/color-models/cmyk">CMYK</Link>. Converting HSV → RGB → CMYK makes the
                gamut limits explicit (neon HSV picks may not be printable).
              </li>
            </ul>
          </section>

          <section>
            <h2>Converting HSV to other models</h2>
            <p>
              HSV is always translated through <Link href="/color-models/rgb">RGB</Link> under the
              hood. Useful links on this site:
            </p>
            <ul>
              <li>
                <Link href="/convert-hsv-to-rgb">HSV to RGB</Link> — for APIs, shaders, and apps that
                expect 0–255 channels
              </li>
              <li>
                <Link href="/convert-hsv-to-hex">HSV to HEX</Link> — for stylesheets and design
                handoffs
              </li>
              <li>
                <Link href="/convert-hsv-to-hsl">HSV to HSL</Link> — when jumping between tools
              </li>
              <li>
                <Link href="/convert-hsv-to-cmyk">HSV to CMYK</Link> — for layout PDFs and press
              </li>
              <li>
                <Link href="/convert-hsv-to-pantone-pms">HSV to Pantone</Link> — approximate matches
                for brand libraries
              </li>
            </ul>
          </section>

          <section>
            <h2>Further reading</h2>
            <p>
              <Link href="/blog/color-theory-101">Color Theory 101</Link> walks through hue,
              saturation, and value with brand examples and accessibility angles—ideal if you want
              the concepts without focusing on conversion math.
            </p>
            <p>
              Return to the <Link href="/color-models">color models overview</Link> for CMYK, RGB,
              HEX, and HSL side by side.
            </p>
          </section>
        </Container>
      </Wrapper>

      <Wrapper className="bg-gray-50 pb-20 md:pb-24 dark:bg-gray-800">
        <Container>
          <Faqs
            tagline="A list of questions we get asked often"
            description="Have questions about HSV? We've got you covered."
            data={hsvFaqs}
          />
        </Container>
      </Wrapper>
    </>
  );
}
