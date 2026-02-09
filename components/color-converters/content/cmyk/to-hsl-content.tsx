import Link from 'next/link';

import { Container } from '@/components/container';

export default function CmykHslContent() {
  return (
    <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
      <h1>CMYK to HSL Converter: Print Colors for Digital Design</h1>
      <p>
        You've got CMYK values from a print job, but now you need to tweak that color for a website.
        HSL makes that easy.
      </p>
      <p>
        <Link href="/color-models/cmyk">CMYK</Link> tells printers how to mix ink. It's great for
        paper, but not so helpful when you want to make a color lighter or more saturated for
        digital use. <Link href="/color-models/hsl">HSL</Link>—hue, saturation, lightness—lets you
        adjust colors intuitively. Want it brighter? Increase lightness. Need more pop? Boost
        saturation.
      </p>
      <p>
        A <Link href="/convert-cmyk-to-hsl">CMYK to HSL converter</Link> bridges the gap between
        print and digital workflows.
      </p>
      <h2>Why Convert CMYK to HSL?</h2>
      <p>
        <Link href="/color-models/hsl">HSL</Link> matches how people think about color. "Make it
        lighter" or "turn down the saturation" makes sense. With CMYK, you're guessing at
        percentages.
      </p>
      <p>
        Converting CMYK to HSL lets you adapt print colors for screens. Create variations for hover
        states, adjust contrast for accessibility, or build a color palette that works across
        devices. It's especially useful for CSS, where HSL values are easy to manipulate.
      </p>
      <h2>How to Convert CMYK to HSL</h2>
      <p>
        Enter your CMYK percentages and get HSL values instantly. Hue is 0-360 (like a color wheel),
        saturation and lightness are 0-100%.
      </p>
      <p>
        Once you have HSL, you can adjust individual properties. Need a darker version for text?
        Lower the lightness. Want a muted version? Reduce saturation. CMYK doesn't give you that
        flexibility.
      </p>
      <h2>CMYK vs HSL: What's Different?</h2>
      <p>
        CMYK mixes ink on paper. It's subtractive—more ink means darker colors. Printers use it
        because it matches how physical ink works.
      </p>
      <p>
        HSL describes colors by their visual properties. Hue is the color itself (red, blue, green).
        Saturation is how intense it is. Lightness is how bright or dark. This matches how designers
        think, making it perfect for digital work where you need to create variations and
        relationships between colors.
      </p>
      <h2>Why Use This Converter</h2>
      <p>
        Quick conversion from print to digital. Enter CMYK, get HSL, then tweak as needed.
      </p>
      <p>
        Works anywhere. Convert CMYK values from print specs to HSL for your next web project, all
        from your phone or laptop.
      </p>
    </Container>
  );
}
