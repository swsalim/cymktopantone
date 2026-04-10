import Link from 'next/link';

import { cmykToPantoneFaqs } from '@/config/cmyk-to-pantone-faq';

import { Container } from '@/components/container';
import Faqs from '@/components/faq';
import { Wrapper } from '@/components/wrapper';

export default function CmykPantoneContent() {
  return (
    <>
      <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
        <h2>Understanding CMYK and Pantone</h2>
        <p>
          Most printers use <Link href="/color-models/cmyk">CMYK</Link>—cyan, magenta, yellow, and
          black inks mixed together. It's how your desktop printer works, and how commercial presses
          handle full-color jobs. The colors come from combining these four inks in different
          percentages.
        </p>
        <p>
          <Link href="/pantone-colors">Pantone</Link> works differently. Instead of mixing inks on
          the fly, Pantone provides pre-mixed spot colors with standardized formulas. Think of it
          like paint swatches at a hardware store—everyone knows exactly what "Pantone 286 C" looks
          like, whether it's printed on paper, fabric, or plastic.
        </p>
        <p>
          The problem? Your design software shows CMYK values, but your printer might need Pantone
          numbers. That's where a <Link href="/">CMYK to Pantone converter</Link> comes in handy.
        </p>

        <h2>When You Need Pantone Instead of CMYK</h2>
        <p>
          Brand guidelines often specify Pantone colors because they're predictable. Print that logo
          on business cards, t-shirts, and packaging, and the blue should match every time. With
          CMYK, the same values can look slightly different depending on the paper, printer, or ink
          batch.
        </p>
        <p>
          Pantone also cuts down on back-and-forth with printers. Instead of saying "make it a bit
          more blue," you send Pantone 5415 C and everyone knows exactly what you mean. Fashion
          brands, product designers, and agencies rely on this precision.
        </p>

        <h2>How to Use the Converter</h2>
        <p>
          Type in your CMYK percentages (like C: 100, M: 50, Y: 0, K: 0) and hit convert. You'll get
          the closest Pantone match instantly.
        </p>
        <p>
          No more flipping through Pantone swatch books or guessing which PMS number matches your
          digital color. The converter handles the math so you can focus on the design work.
        </p>

        <h2>CMYK vs. Pantone: What's the Difference?</h2>
        <p>
          <a
            href="https://www.ecoenclose.com/blog/pantone-vs-cmyk-for-custom-branded-packaging"
            target="_blank"
            rel="noopener noreferrer"
          >
            CMYK mixes colors during printing
          </a>
          . It's cheaper for large runs and handles photos well, but colors can shift between print
          jobs. <Link href="/color-models/cmyk">CMYK</Link> works great for magazines, brochures,
          and anything with lots of color variation.
        </p>
        <p>
          Pantone uses pre-mixed inks. More expensive, but you get exact matches every time. Use it
          for logos, brand colors, and anything where consistency matters more than cost.
        </p>

        <h2>Why This Converter Works</h2>
        <p>
          Fast results without the manual lookup. Enter CMYK values, get Pantone numbers. No
          downloads, no accounts, no hassle.
        </p>
        <p>
          Works on phones, tablets, desktops. Whether you're at your desk or showing a client
          options on your phone, the converter is ready when you need it.
        </p>
      </Container>
      <Wrapper className="bg-gray-50 pb-20 md:pb-24 dark:bg-gray-800">
        <Container>
          <Faqs
            tagline="CMYK to Pantone, clarified"
            description="Questions designers and print buyers ask when moving from process builds to Pantone spot specs."
            data={cmykToPantoneFaqs}
          />
        </Container>
      </Wrapper>
    </>
  );
}
