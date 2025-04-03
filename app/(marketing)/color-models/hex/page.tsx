import { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'HEX Color Codes - The Essential Guide for Designers',
  description:
    'Learn everything about HEX color codes in this in-depth guide. Discover how HEX works, how it compares to RGB and CMYK, and how to convert HEX to other color formats for web and print design.',
  url: '/color-models/hex',
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

export default function ColorModelHex() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/color-models/hex')} />

      <Wrapper>
        <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
          <h1>HEX Color Codes - The Essential Guide for Designers</h1>

          <p>
            Whether you're a web designer, developer, or digital artist, understanding{' '}
            <strong>HEX color codes</strong> is crucial. HEX codes are the most widely used format
            for defining colors on websites, graphics, and digital designs. But how do HEX colors
            work? How do they compare to RGB and CMYK? And how can youconvert HEX to other color
            formats? This guide covers everything you need to know.
          </p>

          <h2>What is a HEX Color Code?</h2>

          <p>
            A <strong>HEX code</strong> (short for hexadecimal) is a six-character code used to
            represent colors in digital design. It combines{' '}
            <Link href="/color-models/rgb">
              <strong>red, green, and blue (RGB)</strong>
            </Link>{' '}
            values into a single string, making it easy to use in web development and graphic
            design.
          </p>

          <p>
            For example, the HEX code for pure red is <strong>#FF0000</strong>. Each pair of
            characters represents the intensity of red, green, and blue:
          </p>

          <ul>
            <li>
              <strong>FF</strong> – Full red (255 in decimal)
            </li>
            <li>
              <strong>00</strong> – No green (0 in decimal)
            </li>
            <li>
              <strong>00</strong> – No blue (0 in decimal)
            </li>
          </ul>

          <p>
            This HEX system allows for <strong>16.7 million possible colors</strong>, making it a
            powerful tool for designers.
          </p>

          <h2>How HEX Colors Work</h2>

          <p>
            HEX colors use a base-16 numbering system (hexadecimal). Each color component (red,
            green, and blue) is represented by a two-digit number, ranging from <strong>00</strong>{' '}
            (minimum intensity) to <strong>FF</strong> (maximum intensity).
          </p>

          <p>Some common HEX colors include:</p>

          <ul>
            <li>
              <strong>#FFFFFF</strong> – White (full red, green, and blue)
            </li>
            <li>
              <strong>#000000</strong> – Black (no red, green, or blue)
            </li>
            <li>
              <strong>#FF0000</strong> – Red
            </li>
            <li>
              <strong>#00FF00</strong> – Green
            </li>
            <li>
              <strong>#0000FF</strong> – Blue
            </li>
            <li>
              <strong>#FFFF00</strong> – Yellow
            </li>
            <li>
              <strong>#00FFFF</strong> – Cyan
            </li>
            <li>
              <strong>#FF00FF</strong> – Magenta
            </li>
          </ul>

          <p>
            HEX colors are widely used in web development because they are compact, easy to read,
            and compatible with CSS.
          </p>

          <h2>HEX vs. RGB: What’s the Difference?</h2>

          <p>
            Since HEX and RGB are both used in digital design, you might wonder how they compare.
            Here’s a quick breakdown:
          </p>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  Feature
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  HEX
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  RGB
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  Format
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">#RRGGBB</td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  rgb(r, g, b)
                </td>
              </tr>
              <tr className="over:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  Usage
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Web design, CSS
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Web design, UI/UX
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  Readability
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Shorter and compact
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Easier to understand individual color values
                </td>
              </tr>
              <tr className="over:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  Color Range
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  16.7 million colors
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  16.7 million colors
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            If you need to switch between them, use our{' '}
            <Link href="/convert-hex-to-rgb">HEX to RGB conversion tool</Link>.
          </p>

          <Wrapper>
            <Container>
              <iframe
                width="100%"
                height="250"
                frameBorder="0"
                className="ta-widget"
                data-min-height="250"
                id="67ee0a352dfc280f879388c3-6603"
                src="https://app.tinyadz.com/widgets/67ee0a352dfc280f879388c3?seed=6603&previewMode=false&showInPopup=false&theme=light"></iframe>
            </Container>
          </Wrapper>

          <h2>HEX vs. CMYK: Why They’re Different</h2>

          <p>
            <Link href="/color-models/cmyk">CMYK</Link> is used for printing, while HEX is designed
            for digital screens. Here’s why they are not interchangeable:
          </p>

          <ul>
            <li>
              <strong>HEX is for screens</strong>, using light-based colors (additive).
            </li>
            <li>
              <strong>CMYK is for print</strong>, using ink-based colors (subtractive).
            </li>
            <li>
              Some HEX colors may not be accurately reproduced in print without{' '}
              <Link href="/convert-hex-to-cmyk">HEX to CMYK conversion</Link>.
            </li>
          </ul>

          <h2>How to Convert HEX to Other Color Formats</h2>

          <p>
            Depending on your project, you may need to convert HEX colors into different formats:
          </p>

          <ul>
            <li>
              <Link href="/convert-hex-to-rgb">Convert HEX to RGB</Link> – Essential for web and UI
              design.
            </li>
            <li>
              <Link href="/convert-hex-to-cmyk">Convert HEX to CMYK</Link> – Best for print
              projects.
            </li>
            <li>
              <Link href="/convert-hex-to-pantone-pms">Convert HEX to Pantone</Link> – For
              professional branding and printing.
            </li>
          </ul>

          <h2>Common HEX Color Mistakes (And How to Avoid Them)</h2>

          <h3>1. Using the Wrong HEX Format</h3>

          <p>
            <strong>Problem:</strong> Some designers mistakenly use three-digit HEX codes
            incorrectly.
          </p>

          <p>
            <strong>Solution:</strong> Three-digit HEX codes (e.g., #F00 for red) are shorthand for
            six-digit codes (#FF0000). Always double-check your codes.
          </p>

          <h3>2. Colors Appear Different on Different Screens</h3>

          <p>
            <strong>Problem:</strong> A HEX color may look different depending on the monitor.
          </p>

          <p>
            <strong>Solution:</strong> Always test colors on multiple devices and calibrate your
            screen.
          </p>

          <h3>3. Forgetting to Convert HEX to CMYK for Print</h3>

          <p>
            <strong>Problem:</strong> Your HEX colors print differently than expected.
          </p>

          <p>
            <strong>Solution:</strong> Convert your HEX colors to CMYK before printing using our{' '}
            <Link href="/convert-hex-to-cmyk">HEX to CMYK tool</Link>.
          </p>

          <h2>Best Practices for Using HEX Colors</h2>

          <ul>
            <li>
              Use <strong>HEX codes</strong> for defining web colors in CSS.
            </li>
            <li>
              Convert to <strong>RGB</strong> when working with digital designs.
            </li>
            <li>
              Use <strong>Pantone matching</strong> for brand consistency in print.
            </li>
          </ul>

          <h2>Final Thoughts</h2>

          <p>
            The <strong>HEX color model</strong> is essential for web design, UI/UX, and branding.
            Whether you're creating a website or designing a digital interface, understanding how
            HEX codes work will help you achieve the perfect color balance.
          </p>

          <p>Explore more with these tools:</p>

          <ul>
            <li>
              <Link href="/convert-hex-to-rgb">Convert HEX to RGB</Link>
            </li>
            <li>
              <Link href="/convert-hex-to-cmyk">Convert HEX to CMYK</Link>
            </li>
            <li>
              <Link href="/convert-hex-to-pantone-pms">Convert HEX to Pantone</Link>
            </li>
          </ul>

          <p>By mastering HEX, you’ll create stunning, accurate digital designs every time!</p>
        </Container>
      </Wrapper>
    </>
  );
}
