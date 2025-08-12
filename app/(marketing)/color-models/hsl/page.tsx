import { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'A Guide to HSL Color Model',
  description:
    'Learn everything about the HSL color model in this comprehensive guide. Discover how Hue, Saturation, and Lightness work together to create vibrant colors for design and web development.',
  url: '/color-models/hsl',
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

export default function ColorModelHsl() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/color-models/hsl')} />

      <Wrapper>
        <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
          <h1>A Guide to HSL Color Model</h1>

          <p>
            Color! It's everywhere around us, adding vibrancy and emotion to our world. Today, let's
            dive into the fascinating realm of <strong>HSL color models</strong> and discover how
            they play a significant role in design and digital spaces. But first things first, what
            exactly is HSL?
          </p>

          <section>
            <h2>What is HSL?</h2>
            <p>
              The <em>HSL</em> color model stands for{' '}
              <strong>Hue, Saturation, and Lightness</strong>. It's a way of understanding and
              representing colors in a manner that's often more intuitive than the standard RGB
              model. Imagine trying to mix paint colors; HSL helps us visualize color adjustments
              the same way!
            </p>
            <p>Here's how it works:</p>
            <ul>
              <li>
                <strong>Hue</strong> - This represents the color type, as in red, blue, or green,
                defined as an angle on the color wheel, ranging from 0° to 360°.
              </li>
              <li>
                <strong>Saturation</strong> - This measures the intensity or purity of the color. A
                fully saturated color means no shades of gray.
              </li>
              <li>
                <strong>Lightness</strong> - This indicates how light or dark a color is. A
                lightness of 0% is black, while a lightness of 100% is white.
              </li>
            </ul>
            <p>
              In other words:
              <ul>
                <li>
                  A <strong>high saturation</strong> color is <strong>bold and vibrant</strong>.
                </li>
                <li>
                  A <strong>low saturation</strong> color is <strong>muted and pastel-like</strong>.
                </li>
                <li>
                  A <strong>low lightness</strong> color is <strong>darker</strong>, while{' '}
                  <strong>high lightness</strong> makes it <strong>brighter</strong>.
                </li>
              </ul>
            </p>
            <p>Here’s an example:</p>
            <ul>
              <li>HSL(0, 100%, 50%) = Pure Red </li>
              <li>HSL(120, 100%, 50%) = Pure Green</li>
              <li> HSL(240, 100%, 50%) = Pure Blue</li>
            </ul>
            <p>Sounds simple, right? But here’s why HSL beats RGB in most real-world use cases.</p>
          </section>

          <Wrapper className="mx-auto text-center">
            <div className="mx-auto">
              <div ta-ad-container=""></div>
            </div>
          </Wrapper>

          <section>
            <h2>Why Designers and Developers Prefer HSL Over RGB</h2>
            <p>
              RGB (Red, Green, Blue) is great for <strong>digital displays</strong>, but let’s be
              honest… <strong>it’s not designer-friendly</strong>.
            </p>
            <p>Why? Because tweaking colors in RGB is a pain.</p>
            <p>
              Let’s say you want a darker blue. In RGB, you have to manually decrease the Red and
              Green values, which feels like a guessing game.
            </p>{' '}
            <p>With HSL, you just reduce the lightness.</p>{' '}
            <p>Want a less intense red? In RGB, you need to adjust multiple values.</p>{' '}
            <p>In HSL, you only lower the saturation.</p>{' '}
            <p>
              This is why modern design tools (like Figma, Photoshop, and CSS) now support HSL-based
              color adjustments.
            </p>
          </section>

          <section>
            <h2>How to Convert HSL to Other Color Models</h2>
            <p>
              Designers often need to <strong>convert between HSL and other color models</strong>{' '}
              like RGB, HEX, or CMYK. These conversions are crucial for web design, printing, and
              more. To make life easier for you, here's a handy{' '}
              <Link href="/convert-hsl-to-rgb">tool for converting HSL to RGB</Link>.
            </p>
          </section>

          <section>
            <h2>Pantone and Its Connection to HSL</h2>

            <p>
              No discussion about colors is complete without mentioning <strong>Pantone</strong>.
              Pantone LLC is the company renowned for its proprietary color space, the Pantone
              Matching System (PMS). This system is extensively used in various industries
              concerning paint, fabric, and plastics. With a solid Pantone reference, you can ensure
              that specific hues are consistent across different producers regardless of location.
            </p>

            <p>
              While Pantone operates in a unique color space, conversions between{' '}
              <strong>Pantone and HSL</strong> are possible. Imagine you’re working on a digital
              project where your brand’s Pantone colors need to be represented on a website.
              Understanding how to{' '}
              <Link href="/convert-pantone-to-hsl">convert Pantone to an HSL model</Link> ensures
              fidelity across both digital and print realms.
            </p>
          </section>

          <section>
            <h2>The Artistic Side of HSL</h2>

            <p>
              Working with the HSL color model can feel like unleashing your inner artist. You get
              to experiment with different hues without worrying about technicalities like luminance
              values which usually come with RGB. Here's a simple creative activity: try adjusting
              only the hue component of a color and observe the spectrum of shades you can produce.
              With <strong>HSL</strong>, creativity is practically limitless!
            </p>

            <h2>Why HSL is Essential for Designers</h2>

            <p>
              For us design aficionados, understanding the HSL model is akin to having a magic wand!
              With its simplicity and practicality, HSL simplifies complex color adjustments, making
              it easier to tweak designs for <em>mood, tone, and brand alignment</em>. Using tools
              like our <Link href="/convert-hsl-to-cmyk">HSL to CMYK converter</Link> allows
              seamless transference from screen to print.
            </p>

            <h2>Conclusion</h2>

            <p>
              To wrap things up, exploring the <strong>HSL color model</strong> opens up a new realm
              of possibilities for creativity, precision, and dynamic designs. Whether you’re
              delving into painting digitally or bridging the gap between digital and physical
              through Pantone, understanding HSL brings exhilarating colorful mastery to your
              fingertips.
            </p>

            <p>
              Have you ever experimented with HSL in your projects or had any ‘happy accidents’
              along the way? Let your hues flow freely, and embrace the colorful spectrum of
              possibilities!
            </p>
          </section>
        </Container>
      </Wrapper>
    </>
  );
}
