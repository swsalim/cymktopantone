import { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'All You Need to Know About RGB Color Model',
  description:
    "Learn how the RGB color model works and why it's the standard for digital screens. Discover how Red, Green, and Blue light combine to create millions of colors.",
  url: '/color-models/rgb',
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

export default function ColorModelRgb() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/color-models/rgb')} />

      <Wrapper>
        <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
          <h1>All You Need to Know About RGB Color Model</h1>

          <p>
            Every image you see on a digital screen—whether on a phone, computer, or TV—is created
            using the <strong>RGB color model</strong>. But how does it work? Why do digital screens
            use RGB instead of other color models like CMYK? In this guide, we’ll break down the
            science behind RGB, how it creates vibrant colors, and how you can convert RGB to other
            color formats like <Link href="/convert-rgb-to-hex">HEX</Link>,{' '}
            <Link href="/convert-rgb-to-cmyk">CMYK</Link>, and{' '}
            <Link href="/pantone-colors">Pantone</Link>.
          </p>

          <h2>What is the RGB Color Model?</h2>

          <p>
            <strong>RGB stands for Red, Green, and Blue</strong>, the three primary colors of light
            used in digital displays. Unlike CMYK, which is used for printing, RGB is an{' '}
            <strong>additive color model</strong>, meaning colors are created by adding different
            intensities of red, green, and blue light.
          </p>

          <p>
            The more light you add, the brighter the color becomes. When all three colors are
            combined at full intensity, you get <strong>pure white</strong>. When none are present,
            the result is <strong>black</strong>.
          </p>

          <h2>How RGB Works: The Science of Additive Color Mixing</h2>

          <p>
            Every pixel on a screen is made up of tiny sub-pixels—one red, one green, and one blue.
            By adjusting the intensity of each sub-pixel, a screen can produce millions of different
            colors.
          </p>

          <p>Here’s how different RGB values create colors:</p>

          <ul>
            <li>
              <strong>Red (255, 0, 0)</strong> – Full red, no green or blue.
            </li>
            <li>
              <strong>Green (0, 255, 0)</strong> – Full green, no red or blue.
            </li>
            <li>
              <strong>Blue (0, 0, 255)</strong> – Full blue, no red or green.
            </li>
            <li>
              <strong>White (255, 255, 255)</strong> – Maximum red, green, and blue combined.
            </li>
            <li>
              <strong>Black (0, 0, 0)</strong> – No light emitted.
            </li>
            <li>
              <strong>Yellow (255, 255, 0)</strong> – Red and green combined.
            </li>
            <li>
              <strong>Cyan (0, 255, 255)</strong> – Green and blue combined.
            </li>
            <li>
              <strong>Magenta (255, 0, 255)</strong> – Red and blue combined.
            </li>
          </ul>

          <p>
            Since screens emit light, the colors are much more vibrant compared to printed
            materials, which use <Link href="#">CMYK</Link>.
          </p>

          <Wrapper className="mx-auto text-center">
            <div className="mx-auto">
              <div ta-ad-container=""></div>
            </div>
          </Wrapper>

          <h2>RGB vs. CMYK: What’s the Difference?</h2>

          <table className="my-6 w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  Feature
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  RGB
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  CMYK
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  Used for
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Digital screens (TVs, phones, websites)
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Printed materials (magazines, posters, brochures)
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  Color Model
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Additive (light-based)
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Subtractive (ink-based)
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  Color Gamut
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Wider, more vibrant
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  More muted, smaller range
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  How Colors Are Created
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Adding red, green, and blue light
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Subtracting cyan, magenta, yellow, and black ink
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Since RGB has a larger color range, some colors in digital designs may not print
            accurately in CMYK. That’s why designers often use{' '}
            <Link href="/convert-rgb-to-cmyk">RGB to CMYK conversion tools</Link> before sending a
            design for print.
          </p>

          <h2>How to Convert RGB to Other Color Formats</h2>

          <p>
            Depending on your project, you may need to convert RGB colors into different formats:
          </p>

          <ul>
            <li>
              <Link href="/convert-rgb-to-hex">Convert RGB to HEX</Link> – Best for web design and
              CSS.
            </li>
            <li>
              <Link href="/convert-rgb-to-cmyk">Convert RGB to CMYK</Link> – Essential for print
              projects.
            </li>
            <li>
              <a href="https://www.rgbtopantone.com/">Convert RGB to Pantone</a> – Ensures brand
              consistency across digital and print.
            </li>
          </ul>

          <h2>Common RGB Color Mistakes (And How to Fix Them)</h2>

          <h3>1. Colors Look Different on Different Screens</h3>

          <p>
            <strong>Problem:</strong> The same RGB color looks different on various monitors and
            devices.
          </p>

          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>Use a color-calibrated monitor for accuracy.</li>
            <li>Check colors on multiple devices before finalizing a design.</li>
          </ul>

          <h3>2. RGB Colors Print Too Dull</h3>

          <p>
            <strong>Problem:</strong> Your vibrant RGB colors look faded when printed.
          </p>

          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>
              Convert to <Link href="#">CMYK</Link> before printing.
            </li>
            <li>Use Pantone colors for exact matches.</li>
          </ul>

          <h2>Best Practices for Using RGB Colors</h2>

          <ul>
            <li>
              Use <strong>HEX codes</strong> for web design (e.g., #FF5733).
            </li>
            <li>
              Work in <strong>sRGB mode</strong> to match most screens.
            </li>
            <li>
              Check color contrast for <strong>accessibility</strong>.
            </li>
          </ul>

          <h2>Final Thoughts</h2>

          <p>
            The <strong>RGB color model</strong> is the foundation of all digital displays, from
            websites to TV screens. Unlike CMYK, which is used for print, RGB allows for brighter,
            more vibrant colors.
          </p>

          <p>Want to explore more? Try these tools:</p>

          <ul>
            <li>
              <Link href="/convert-rgb-to-hex">Convert RGB to HEX</Link>
            </li>
            <li>
              <Link href="/convert-rgb-to-cmyk">Convert RGB to CMYK</Link>
            </li>
            <li>
              <a href="https://www.rgbtopantone.com/">Convert RGB to Pantone</a>
            </li>
          </ul>

          <p>
            By mastering RGB, you’ll have more control over how colors appear in your digital
            designs!
          </p>
        </Container>
      </Wrapper>
    </>
  );
}
