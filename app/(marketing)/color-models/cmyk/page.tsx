import { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Everything You Need to Know about CMYK',
  description:
    'Discover how the CMYK color model works and why it’s the gold standard for printing. Learn the differences between CMYK and RGB, and how to convert colors seamlessly.',
  url: '/color-models/cmyk',
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

export default function ColorModelCmyk() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/color-models/cmyk')} />

      <Wrapper>
        <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
          <h1>Everything You Need to Know about CMYK</h1>

          <p>
            Ever sent a design for printing only to find the colors look completely different from
            what you saw on your screen? If so, you’ve likely encountered the differences between{' '}
            <strong>CMYK and RGB</strong>. Understanding the <strong>CMYK color model</strong> is
            crucial for designers, printers, and marketers who want accurate, high-quality print
            results.
          </p>

          <p>
            In this guide, we’ll break down what CMYK is, how it works, and why it’s essential for
            print production. We’ll also show you how to{' '}
            <Link href="/convert-cmyk-to-rgb">convert CMYK to RGB</Link>,{' '}
            <Link href="/convert-cmyk-to-hex">CMYK to HEX</Link>, and even{' '}
            <Link href="/">CMYK to Pantone</Link> for the best color consistency across different
            formats.
          </p>

          <h2>What is CMYK?</h2>

          <p>
            <strong>CMYK</strong> stands for <strong>Cyan, Magenta, Yellow, and Key (Black)</strong>
            . It is a subtractive color model used in the printing industry. Unlike RGB (which is
            additive and used for screens), CMYK is based on the absorption and reflection of light.
          </p>

          <p>
            When printing, tiny dots of these four inks are combined in different amounts to produce
            a wide range of colors. However, because CMYK inks absorb light rather than emit it (as
            RGB does), colors tend to appear slightly less vibrant than on digital screens.
          </p>

          <h2>CMYK vs. RGB: Why They’re Different</h2>

          <p>
            One of the most common issues designers face is color inconsistency between their
            screens and printed materials. This happens because{' '}
            <strong>RGB (Red, Green, Blue)</strong> and CMYK process colors differently.
          </p>

          <table className="my-6 w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  Color Model
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  Used For
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-medium dark:border-gray-700">
                  Color Range
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  RGB
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Digital Screens (Web, TVs, Phones)
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Wide range of bright and vibrant colors
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 px-4 py-3 font-medium dark:border-gray-700">
                  CMYK
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  Printed Materials (Brochures, Posters, Magazines)
                </td>
                <td className="border border-gray-300 px-4 py-3 dark:border-gray-700">
                  More muted, slightly limited color range
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            Since screens emit light and printers rely on ink absorption, some colors (especially
            neon and bright shades) may not print as expected. If your design is intended for both
            digital and print, consider using a conversion tool:
          </p>

          <ul>
            <li>
              <Link href="/convert-cmyk-to-rgb">Convert CMYK to RGB</Link>
            </li>
            <li>
              <Link href="/convert-cmyk-to-hex">Convert CMYK to HEX</Link>
            </li>
            <li>
              <Link href="/">Convert CMYK to Pantone</Link>
            </li>
          </ul>

          <Wrapper className="mx-auto text-center">
            <div className="mx-auto max-w-2xl">
              <iframe
                width="100%"
                height="250"
                frameBorder="0"
                className="ta-widget"
                data-min-height="250"
                id="67ee0a352dfc280f879388c3-4728"
                src="https://app.tinyadz.com/widgets/67ee0a352dfc280f879388c3?seed= 4728&previewMode=false&showInPopup=false&theme=light"></iframe>
            </div>
          </Wrapper>

          <h2>How CMYK Printing Works</h2>

          <p>
            CMYK printing uses a technique called{' '}
            <a href="https://en.wikipedia.org/wiki/Halftone" target="_blank">
              <strong>halftoning</strong>
            </a>
            , where small dots of each ink color are printed in varying sizes and densities to
            create the illusion of a full spectrum of colors.
          </p>

          <p>Here’s how each ink layer contributes:</p>

          <ul>
            <li>
              <strong>Cyan</strong> – Absorbs red light, reflects blue and green
            </li>
            <li>
              <strong>Magenta</strong> – Absorbs green light, reflects red and blue
            </li>
            <li>
              <strong>Yellow</strong> – Absorbs blue light, reflects red and green
            </li>
            <li>
              <strong>Black (Key)</strong> – Adds depth, shadows, and detail
            </li>
          </ul>

          <h2>Why Black is Called “Key” in CMYK</h2>

          <p>
            Instead of using a combination of CMY inks to create black, a <em>separate</em>{' '}
            <strong>black ink (K)</strong> is used. This is because:
          </p>

          <ul>
            <li>
              Mixing cyan, magenta, and yellow often results in a muddy brown rather than true
              black.
            </li>
            <li>Using a separate black ink reduces ink usage and improves clarity.</li>
            <li>Black ink enhances depth, sharpness, and contrast in images.</li>
          </ul>

          <h2>How to Convert CMYK to Other Color Models</h2>

          <p>
            If your design needs to appear both online and in print, converting colors is essential.
            Here’s how you can do it:
          </p>

          <ul>
            <li>
              <Link href="/convert-cmyk-to-rgb">Convert CMYK to RGB</Link> – Best for web and
              digital designs.
            </li>
            <li>
              <Link href="/convert-cmyk-to-hex">Convert CMYK to HEX</Link> – Needed for HTML and CSS
              color codes.
            </li>
            <li>
              <Link href="/">Convert CMYK to Pantone</Link> – Ensures precise color matching in
              branded prints.
            </li>
          </ul>

          <p>
            While conversion tools help, some colors may not translate exactly due to the
            differences in how color models work. Always test your colors before printing.
          </p>

          <h2>Common CMYK Printing Mistakes (And How to Fix Them)</h2>

          <h3>1. Colors Look Different From the Digital Version</h3>

          <p>
            <strong>Problem:</strong> Your printed design looks dull compared to what you saw on
            your screen.
          </p>

          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>Ensure your file is set to CMYK mode in Photoshop, Illustrator, or InDesign.</li>
            <li>
              Use a <Link href="/pantone-colors">Pantone guide</Link> to choose colors that print
              accurately.
            </li>
            <li>Try a soft-proofing feature to preview CMYK colors on your screen.</li>
          </ul>

          <h3>2. Blacks Appear Washed Out</h3>

          <p>
            <strong>Problem:</strong> The black areas of your design print as dark gray rather than
            deep black.
          </p>

          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>
              Use <strong>"rich black"</strong> (e.g., C: 60%, M: 40%, Y: 40%, K: 100%) instead of
              pure K: 100%.
            </li>
            <li>Consult your printer’s recommended black ink settings.</li>
          </ul>

          <h3>3. Colors Print Too Dark</h3>

          <p>
            <strong>Problem:</strong> Your final print appears darker than expected.
          </p>

          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>Avoid overloading ink coverage; keep total ink percentages below 240%.</li>
            <li>Use a color proofing tool to adjust brightness levels before printing.</li>
          </ul>

          <h2>CMYK Printing Tips for Designers</h2>

          <p>To ensure your prints turn out as expected, follow these best practices:</p>

          <ul>
            <li>
              <strong>Use a calibrated monitor</strong> – Ensures your screen displays colors
              accurately.
            </li>
            <li>
              <strong>Design in CMYK mode</strong> – Set up your project in CMYK from the start to
              avoid color shifts later.
            </li>
            <li>
              <strong>Use high-quality images</strong> – Print resolution should be at least 300
              DPI.
            </li>
            <li>
              <strong>Print test samples</strong> – A small batch print lets you catch mistakes
              before mass production.
            </li>
          </ul>

          <h2>Final Thoughts</h2>

          <p>
            Understanding the CMYK color model is essential for designers working in print. While
            RGB is perfect for digital screens, CMYK ensures accurate color reproduction for printed
            materials.
          </p>
          <p>
            Knowing how to <Link href="/convert-cmyk-to-rgb">convert CMYK to RGB</Link> or{' '}
            <Link href="/">CMYK to Pantone</Link> can save you time, money, and frustration when
            preparing your designs.
          </p>

          <p>Looking for more color conversion tools? Check these out:</p>

          <ul>
            <li>
              <Link href="/pantone-colors">Pantone Colors Chart</Link>
            </li>
            <li>
              <Link href="/convert-hex-to-cmyk">Convert HEX to CMYK</Link>
            </li>
            <li>
              <Link href="/convert-pantone-to-rgb">Convert Pantone to RGB</Link>
            </li>
          </ul>

          <p>
            With these insights, you’ll never have to worry about printing colors incorrectly again!
          </p>
        </Container>
      </Wrapper>
    </>
  );
}
