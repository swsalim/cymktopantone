import { Metadata } from 'next';
import Link from 'next/link';

import { hslFaqs } from '@/config/colors';
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
  title: 'HSL Color Model: The Designer's Guide to Intuitive Color Control',
  description:
    'Master HSL color model for intuitive color adjustments, design systems, and accessible interfaces. Learn how Hue, Saturation, and Lightness work together for professional design workflows.',
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

const JSONLDbreadcrumbs = [
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/color-models/hsl`),
    name: 'HSL Color Model',
  },
];

export default function ColorModelHsl() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/color-models/hsl')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container as="section" className="prose max-w-4xl pb-12 dark:prose-invert md:pb-24">
          <h1>HSL Color Model: The Designer's Guide to Intuitive Color Control</h1>

          <p className="lead">
            While RGB and HEX codes work perfectly for computers, they don't match how humans think
            about color. HSL (Hue, Saturation, Lightness) bridges this gap, providing an intuitive
            color model that makes creating color variations, building palettes, and maintaining
            design consistency remarkably simple.
          </p>

          <p>
            HSL has become the preferred color model for modern designers and developers who need
            intuitive control over color adjustments. Whether you're creating a design system,
            building accessible interfaces, or developing dynamic color themes, understanding HSL
            transforms color work from guesswork into precision.
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

            <figure className="text-center">
              <ImageKit
                directory="cymktopantone/images"
                src="hsl-color-model.png"
                width={600}
                height={600}
                alt="HSL Color Model"
                className="mx-auto"
              />
              <figcaption>Credit: giggster.com</figcaption>
            </figure>

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
              <Link href="/color-models/rgb">RGB (Red, Green, Blue)</Link> is great for{' '}
              <strong>digital displays</strong>, but let’s be honest…{' '}
              <strong>it’s not designer-friendly</strong>.
            </p>
            <p>Why? Because tweaking colors in RGB is a pain.</p>
            <p>
              Let’s say you want a darker blue. In RGB, you have to manually decrease the Red and
              Green values, which feels like a guessing game.
            </p>{' '}
            <blockquote>
              With HSL, you just <strong>reduce</strong> the lightness.
            </blockquote>
            <figure className="text-center">
              <ImageKit
                directory="cymktopantone/images"
                src="hsl-color-wheel.png"
                width={400}
                height={400}
                alt="HSL Color Wheel"
                className="mx-auto"
              />
              <figcaption>Credit: js-craft.io</figcaption>
            </figure>
            <p>Want a less intense red? In RGB, you need to adjust multiple values.</p>{' '}
            <p>In HSL, you only lower the saturation.</p>{' '}
            <p>
              This is why modern design tools (like Figma, Photoshop, and CSS) now support HSL-based
              color adjustments.
            </p>
          </section>

          <section>
            <h2>Converting HSL to Other Color Models</h2>
            
            <p>
              Designers frequently need to convert between HSL and other color models for different
              applications. While HSL excels for design workflows, you'll often need to convert to{' '}
              <Link href="/color-models/rgb">RGB</Link>,{' '}
              <Link href="/color-models/hex">HEX</Link>, or{' '}
              <Link href="/color-models/cmyk">CMYK</Link> depending on your output requirements.
            </p>
            
            <h3>Common Conversion Needs</h3>
            <ul>
              <li>
                <Link href="/convert-hsl-to-rgb">HSL to RGB conversion</Link> – Essential for web
                development, image editing, and when you need RGB values for specific applications
              </li>
              <li>
                <Link href="/convert-hsl-to-hex">HSL to HEX conversion</Link> – Useful for CSS
                styling and web development workflows where HEX codes are preferred
              </li>
              <li>
                <Link href="/convert-hsl-to-cmyk">HSL to CMYK conversion</Link> – Critical for
                print production, ensuring your HSL-designed colors translate accurately to printed
                materials
              </li>
              <li>
                <Link href="/convert-hsl-to-pantone-pms">HSL to Pantone conversion</Link> – Important
                for professional branding where precise color matching across materials is required
              </li>
            </ul>
            
            <p>
              Professional conversion tools account for color gamut differences and use appropriate
              color profiles to ensure accurate results. Always use proper conversion tools rather
              than simple mathematical conversions, which don't account for color space limitations.
            </p>
          </section>

          <section>
            <h2>HSL and Pantone: Bridging Digital and Print Color</h2>

            <p>
              No discussion about colors is complete without mentioning <strong>Pantone</strong>.
            </p>
            <p>
              <a href="https://www.pantone.com/">Pantone LLC</a> is the company renowned for its
              proprietary color space, the Pantone Matching System (PMS). This system is extensively
              used in various industries concerning paint, fabric, and plastics. With a solid
              Pantone reference, you can ensure that specific hues are consistent across different
              producers regardless of location.
            </p>

            <p>
              While Pantone operates in a unique color space, conversions between{' '}
              <strong>Pantone and HSL</strong> are possible. Imagine you’re working on a digital
              project where your brand’s Pantone colors need to be represented on a website.
              Understanding how to{' '}
              <Link href="/convert-pantone-pms-to-hsl">convert Pantone to an HSL model</Link>{' '}
              ensures fidelity across both digital and print realms.
            </p>
          </section>

          <section>
            <h2>Why HSL is Essential for Modern Designers</h2>

            <p>
              For us design aficionados, understanding the HSL model is akin to having a magic wand!
              With its simplicity and practicality, HSL simplifies complex color adjustments, making
              it easier to tweak designs for <em>mood, tone, and brand alignment</em>.
            </p>
            <p>
              Using tools like our <Link href="/convert-hsl-to-cmyk">HSL to CMYK converter</Link>{' '}
              allows seamless transference from screen to print.
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

      <Wrapper className="bg-gray-50 pb-20 md:pb-24 dark:bg-gray-800">
        <Container>
          <Faqs
            tagline="A list of questions we get asked often"
            description="Have questions about HSL? We've got you covered."
            data={hslFaqs}
          />
        </Container>
      </Wrapper>
    </>
  );
}
