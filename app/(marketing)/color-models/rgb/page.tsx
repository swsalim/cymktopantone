import { Metadata } from 'next';
import Link from 'next/link';

import { rgbFaqs } from '@/config/colors';
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
  title: 'The RGB Color Model: Mastering Digital Colors for Perfect Screen Display',
  description:
    'Master RGB digital colors for perfect screen display. Learn RGB vs CMYK differences, avoid device inconsistencies, and create stunning digital designs.',
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

const JSONLDbreadcrumbs = [
  {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    name: 'Home',
  },
  {
    url: absoluteUrl(`/color-models/rgb`),
    name: 'RGB Color Model',
  },
];

export default function ColorModelRgb() {
  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={absoluteUrl('/color-models/rgb')} description={config.description} />
      <BreadcrumbJsonLd itemListElements={JSONLDbreadcrumbs} />
      <Wrapper>
        <Container as="section" className="prose max-w-4xl pb-12 dark:prose-invert md:pb-24">
          <h1>The RGB Color Model: Mastering Digital Colors for Perfect Screen Display</h1>
          In 2018, a major streaming platform discovered that their iconic red logo appeared purple
          on nearly 30% of mobile devices. The color that tested perfectly in their design studios
          was failing across millions of screens worldwide, potentially costing the company $2
          million in rebranding efforts. The culprit? A fundamental misunderstanding of how RGB
          colors behave across different display technologies.
          <p>
            If you've ever wondered why your digital designs look different on various devices, or
            struggled to maintain consistent brand colors across platforms, you're facing the same
            RGB challenges that trip up even major corporations. In our screen-dominated world,
            mastering RGB isn't optional—it's essential for digital success.
          </p>
          <p>
            Understanding RGB will transform how you approach digital design, ensuring your colors
            look stunning whether viewed on a smartphone, tablet, desktop monitor, or smart TV.
            Let's dive into the foundation of every pixel you see.
          </p>
          <figure className="text-center">
            <ImageKit
              directory="cymktopantone/images"
              src="rgb-color-model.jpg"
              width={600}
              height={600}
              alt="RGB Color Model"
              className="mx-auto"
            />
            <figcaption>Credit: gotprint.com</figcaption>
          </figure>
          <h2>RGB Decoded: The Building Blocks of Every Pixel You See</h2>
          <p>
            RGB stands for Red, Green, and Blue—the three primary colors of light that combine to
            create every color on your screen. Unlike traditional paint mixing, RGB operates on
            additive color theory, where combining all three colors at full intensity produces pure
            white light.
          </p>
          <p>
            Each RGB color is defined by three values ranging from 0 to 255, representing the
            intensity of each color channel. For example, pure red is RGB(255,0,0), while bright
            yellow combines full red and green at RGB(255,255,0). This system provides access to
            over 16.7 million distinct colors—far more than the human eye can actually distinguish.
          </p>
          <p>
            The RGB model emerged from early television technology, where cathode ray tubes used
            red, green, and blue phosphors to create color images. Modern displays, from LCD
            monitors to OLED smartphones, still rely on this fundamental three-color approach,
            though the underlying technology has evolved dramatically.
          </p>
          <h2>RGB vs. Other Color Models: The Digital Advantage</h2>
          <p>
            Understanding when to use RGB versus other color models is crucial for professional
            results. While <Link href="/color-models/cmyk">CMYK dominates printing</Link>, RGB rules
            the digital realm. The key difference lies in their fundamental physics: RGB adds light
            to create brighter colors, while CMYK subtracts light through ink absorption.
          </p>
          <p>
            RGB offers a significantly wider color gamut than CMYK, meaning you can display vibrant
            electric blues, neon greens, and brilliant magentas on screen that simply cannot be
            reproduced in print. This advantage makes RGB perfect for digital-first content like
            websites, mobile apps, and video production.
          </p>
          <p>
            <Link href="/color-models/hsl">HSL color representation</Link> provides a more intuitive
            way to work with colors, but RGB remains the technical standard that all displays
            ultimately use. When you adjust HSL values in design software, the system converts them
            to RGB for actual display.
          </p>
          <h2>How Your Screen Creates Color</h2>
          <p>
            Modern screens create RGB colors through various technologies, each with unique
            characteristics. LCD displays use LED backlights filtered through red, green, and blue
            sub-pixels, while OLED screens generate colored light directly from organic compounds
            that emit specific wavelengths when electrically stimulated.
          </p>
          <figure className="text-center">
            <ImageKit
              directory="cymktopantone/images"
              src="additive-color-mixing.png"
              width={350}
              height={350}
              alt="Additive Color Mixing"
              className="mx-auto"
            />
            <figcaption>Credit: wikipedia.org</figcaption>
          </figure>
          <p>
            The magic happens at the sub-pixel level, where microscopic elements combine to fool
            your eye into seeing continuous color. When you specify RGB(128,255,64) for a bright
            lime green, the display sets red to half intensity, green to maximum, and blue to
            quarter intensity. Your brain interprets this combination as a single, unified color.
          </p>
          <p>
            Color gamut defines how many colors a display can actually reproduce. Standard sRGB
            covers about 35% of all visible colors, while newer wide-gamut displays supporting Adobe
            RGB or DCI-P3 can show significantly more vibrant colors, particularly in the green and
            cyan ranges.
          </p>
          <h2>Where Digital Colors Matter Most</h2>
          <p>
            Web design represents RGB's most critical application. Every website, from corporate
            homepages to e-commerce platforms, depends on RGB for consistent brand representation
            across browsers and devices. CSS color specifications, whether using RGB values, hex
            codes, or named colors, all ultimately translate to RGB display values.
          </p>
          <p>
            Digital marketing campaigns live or die by RGB accuracy. Social media graphics, online
            advertisements, and email templates must maintain brand consistency across countless
            device combinations. A logo that looks perfect on a designer's calibrated monitor might
            appear washed out on budget smartphones or oversaturated on premium tablets.
          </p>
          <p>
            Video production workflows rely heavily on RGB color grading, where editors adjust RGB
            values to create specific moods, match footage from different cameras, or ensure
            consistent color throughout lengthy productions. Understanding RGB relationships helps
            editors make precise adjustments without introducing unwanted color casts.
          </p>
          <h2>Common RGB Pitfalls and Professional Solutions</h2>
          <p>
            Monitor calibration represents the biggest RGB challenge for professionals. No two
            displays render colors identically due to manufacturing variations, age, and
            environmental factors. What appears as perfect brand red on your monitor might look
            orange or burgundy on client devices.
          </p>
          <p>
            Professional solutions include regular monitor calibration using hardware colorimeters,
            working in controlled lighting environments, and testing designs across multiple devices
            before final approval. Many designers maintain a collection of different devices—various
            smartphones, tablets, and monitors—to verify color consistency.
          </p>
          <p>
            Color accessibility presents another crucial consideration. Approximately 8% of men and
            0.5% of women have some form of color vision deficiency. Designing with sufficient
            contrast ratios and avoiding color-only information conveyance ensures your RGB designs
            work for all users.
          </p>
          <h2>Tools and Techniques for Digital Professionals</h2>
          <p>
            Effective RGB workflow starts with understanding your target audience's devices.
            Corporate websites might prioritize consistency across business laptops and desktop
            monitors, while mobile apps must consider the wide variety of smartphone display
            technologies and quality levels.
          </p>
          <p>
            <Link href="/convert-color">Color conversion tools</Link> help translate between RGB and
            other color models when working across digital and print media. When you need to
            maintain brand consistency from web to print, start with RGB values and convert to CMYK,
            rather than the reverse.
          </p>
          <p>
            Modern design software offers sophisticated RGB management features. Adobe Creative
            Suite, Figma, and Sketch all provide RGB-specific color pickers, gamut warnings, and
            device preview capabilities. Learning these tools' RGB-specific features dramatically
            improves workflow efficiency.
          </p>
          <h2>Conclusion</h2>
          <p>
            RGB mastery transforms digital designers from color guessers into precision
            professionals. Key principles include: understand additive color theory, calibrate your
            primary monitor regularly, test across multiple devices, consider accessibility
            requirements, and leverage RGB's wider gamut advantage over print colors.
          </p>
          <p>
            Start improving your RGB workflow today by auditing your current color management setup.
            Are you working with properly calibrated displays? Do you test your designs across
            different device types? Are you taking advantage of{' '}
            <Link href="/convert-color">RGB to other color model conversions</Link> when needed?
          </p>
        </Container>
      </Wrapper>

      <Wrapper className="bg-gray-50 pb-20 md:pb-24 dark:bg-gray-800">
        <Container>
          <Faqs
            tagline="A list of questions we get asked often"
            description="Have questions about RGB? We've got you covered."
            data={rgbFaqs}
          />
        </Container>
      </Wrapper>
    </>
  );
}
