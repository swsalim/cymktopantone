import { Metadata } from 'next';
import Link from 'next/link';

import { hexFaqs } from '@/config/colors';
import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import Faqs from '@/components/faq';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'HEX Color Codes - The Essential Guide for Designers',
  description:
    'Learn everything about HEX color codes in this in-depth guide. Discover how HEX works, and how to convert HEX to other color formats.',
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

const JSONLDbreadcrumbs = [
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/color-models/hex`),
    name: 'HEX Color Model',
  },
];

export default function ColorModelHex() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/color-models/hex')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container as="section" className="prose max-w-4xl pb-12 dark:prose-invert md:pb-24">
          <h1>HEX Color Codes: The Essential Guide for Web Designers and Developers</h1>

          <p className="lead">
            HEX color codes are the universal language of web design. Whether you're styling a
            website, creating digital graphics, or building a design system, understanding HEX codes
            is essential for consistent, professional results across all browsers and devices.
          </p>

          <p>
            HEX codes are the most widely used format for defining colors in web development and
            digital design. But how do HEX colors work? How do they compare to RGB and CMYK? And
            how can you convert HEX to other color formats? This comprehensive guide covers
            everything you need to know about HEX color codes.
          </p>

          <h2>What is a HEX Color Code?</h2>

          <p>
            A <strong>HEX code</strong> (short for hexadecimal) is a six-character code preceded by
            a hash symbol (#) used to represent colors in digital design and web development. HEX
            codes combine{' '}
            <Link href="/color-models/rgb">
              <strong>red, green, and blue (RGB)</strong>
            </Link>{' '}
            values into a single compact string, making them easy to use in CSS, HTML, and design
            software.
          </p>

          <p>
            HEX uses base-16 (hexadecimal) numbering, which includes digits 0-9 and letters A-F to
            represent values from 0 to 255. For example, the HEX code for pure red is{' '}
            <strong>#FF0000</strong>. Each pair of characters represents the intensity of one RGB
            channel:
          </p>

          <ul>
            <li>
              <strong>FF</strong> – Full red intensity (255 in decimal, maximum value)
            </li>
            <li>
              <strong>00</strong> – No green (0 in decimal, minimum value)
            </li>
            <li>
              <strong>00</strong> – No blue (0 in decimal, minimum value)
            </li>
          </ul>

          <p>
            This HEX system provides access to <strong>16.7 million possible color combinations</strong>{' '}
            (256 × 256 × 256), matching RGB's full color range while offering a more compact,
            web-friendly format. The hexadecimal system's efficiency makes HEX codes ideal for CSS
            and HTML, where brevity and universal browser support are essential.
          </p>

          <h2>How HEX Colors Work: Understanding Hexadecimal</h2>

          <p>
            HEX colors use a base-16 numbering system (hexadecimal), which includes digits 0-9 and
            letters A-F. Each color component (red, green, and blue) is represented by a two-digit
            hexadecimal number, ranging from <strong>00</strong> (minimum intensity, 0 in decimal)
            to <strong>FF</strong> (maximum intensity, 255 in decimal). This system allows
            representing 256 levels per channel (0-255) using just two characters.
          </p>

          <p>
            The hexadecimal system works like this: after 9 comes A (10), B (11), C (12), D (13),
            E (14), and F (15). So FF represents 15×16 + 15 = 255 in decimal. This compact
            notation makes HEX codes much shorter than decimal RGB values while maintaining the same
            precision.
          </p>

          <h3>Common HEX Color Examples</h3>
          <p>Here are some frequently used HEX colors:</p>

          <ul>
            <li>
              <strong>#FFFFFF</strong> – Pure white (full red, green, and blue at maximum)
            </li>
            <li>
              <strong>#000000</strong> – Pure black (no color channels active)
            </li>
            <li>
              <strong>#FF0000</strong> – Pure red (maximum red, no green or blue)
            </li>
            <li>
              <strong>#00FF00</strong> – Pure green (maximum green, no red or blue)
            </li>
            <li>
              <strong>#0000FF</strong> – Pure blue (maximum blue, no red or green)
            </li>
            <li>
              <strong>#FFFF00</strong> – Yellow (red and green combined)
            </li>
            <li>
              <strong>#00FFFF</strong> – Cyan (green and blue combined)
            </li>
            <li>
              <strong>#FF00FF</strong> – Magenta (red and blue combined)
            </li>
          </ul>

          <p>
            HEX colors are widely used in web development because they are compact, easy to read,
            universally supported across all browsers, and directly compatible with CSS. They
            also work seamlessly with modern design tools and design systems.
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

          <Wrapper className="mx-auto text-center">
            <div className="mx-auto">
              <div ta-ad-container=""></div>
            </div>
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

          <h2>Converting HEX to Other Color Formats</h2>

          <p>
            Depending on your project requirements, you may need to convert HEX colors into
            different formats for various applications. Here are the most common conversion needs:
          </p>

          <ul>
            <li>
              <Link href="/convert-hex-to-rgb">Convert HEX to RGB</Link> – Essential for web and UI
              design workflows, image editing, and when you need more intuitive color value
              representation.
            </li>
            <li>
              <Link href="/convert-hex-to-cmyk">Convert HEX to CMYK</Link> – Critical for print
              projects, ensuring your digital colors translate accurately to printed materials.
              Always convert before printing to avoid color shifts.
            </li>
            <li>
              <Link href="/convert-hex-to-pantone-pms">Convert HEX to Pantone</Link> – Essential
              for professional branding and print production where precise color matching is
              required across different materials and vendors.
            </li>
            <li>
              <Link href="/convert-hex-to-hsl">Convert HEX to HSL</Link> – Useful for design
              workflows where you need intuitive color adjustments based on hue, saturation, and
              lightness rather than RGB values.
            </li>
          </ul>

          <p>
            Professional conversion tools account for color gamut differences and use appropriate
            color profiles to ensure accurate results. Simple mathematical conversions don't account
            for these differences and can produce inaccurate colors.
          </p>

          <h2>Common HEX Color Mistakes and How to Avoid Them</h2>

          <h3>1. Incorrect HEX Format Usage</h3>

          <p>
            <strong>Problem:</strong> Some designers confuse three-digit and six-digit HEX codes or
            forget the hash symbol (#).
          </p>

          <p>
            <strong>Solution:</strong> Three-digit HEX codes (e.g., #F00 for red) are valid CSS
            shorthand for six-digit codes (#FF0000), where each digit is duplicated. However,
            always use six-digit codes for consistency and clarity. Never forget the hash symbol (#)
            at the beginning—it's required for CSS to recognize HEX values.
          </p>

          <h3>2. Color Inconsistency Across Devices</h3>

          <p>
            <strong>Problem:</strong> HEX colors may appear different depending on the monitor,
            browser, or device due to display calibration and color profile differences.
          </p>

          <p>
            <strong>Solution:</strong> Always test colors on multiple devices and browsers. Use
            standardized color profiles (sRGB for web) and calibrate your primary monitor regularly.
            Consider your target audience's devices when selecting colors, especially for
            brand-critical elements.
          </p>

          <h3>3. Forgetting to Convert HEX to CMYK for Print</h3>

          <p>
            <strong>Problem:</strong> HEX colors print differently than they appear on screen,
            often appearing muted, shifted, or completely different from expectations.
          </p>

          <p>
            <strong>Solution:</strong> Always convert HEX colors to CMYK before printing using
            professional{' '}
            <Link href="/convert-hex-to-cmyk">HEX to CMYK conversion tools</Link> that account for
            color gamut differences. Preview CMYK colors in design software before finalizing print
            files to avoid costly reprints.
          </p>

          <h3>4. Case Sensitivity Confusion</h3>

          <p>
            <strong>Problem:</strong> Some designers wonder if HEX codes are case-sensitive.
          </p>

          <p>
            <strong>Solution:</strong> HEX codes are case-insensitive in CSS (#FF0000 and #ff0000
            are identical). However, many teams adopt uppercase or lowercase conventions for
            consistency. Choose one style and stick with it throughout your project.
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

      <Wrapper className="bg-gray-50 pb-20 md:pb-24 dark:bg-gray-800">
        <Container>
          <Faqs
            tagline="A list of questions we get asked often"
            description="Have questions about HEX? We've got you covered."
            data={hexFaqs}
          />
        </Container>
      </Wrapper>
    </>
  );
}
