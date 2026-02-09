import Link from 'next/link';

import { Container } from '@/components/container';

export default function HexHslContent() {
  return (
    <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
      <h1>Hex to HSL Converter: Adjust Colors Easily</h1>
      <p>
        You've got a HEX code like #FF5733, but you need to make it lighter for a hover state or
        adjust the saturation. HEX doesn't make that easy.
      </p>
      <p>
        <Link href="/color-models/hex">HEX</Link> is great for defining colors in code, but it's
        hard to tweak. <Link href="/color-models/hsl">HSL</Link>—hue, saturation, lightness—lets
        you adjust colors intuitively. Want it brighter? Increase lightness. Need it less intense?
        Lower saturation.
      </p>
      <p>
        A <Link href="/convert-hex-to-hsl">HEX to HSL converter</Link> gives you the flexibility to
        create color variations.
      </p>
      <h2>Why Convert Hex to HSL?</h2>
      <p>
        HSL matches how designers think about color. "Make it lighter" or "reduce the saturation"
        makes sense. With HEX, you're guessing at new codes.
      </p>
      <p>
        Converting HEX to HSL lets you create color variations easily. Build hover states, adjust
        contrast for accessibility, or create a cohesive palette. It's especially useful for CSS,
        where you can manipulate HSL values programmatically.
      </p>
      <p>
        <Link href="/convert-hex-to-hsl">Converting HEX to HSL</Link> is perfect for responsive
        design where colors need to adapt to different backgrounds or themes.
      </p>
      <h2>How to Convert Hex to HSL</h2>
      <p>
        Enter your HEX code and get HSL values instantly. Hue is 0-360 (like a color wheel),
        saturation and lightness are 0-100%.
      </p>
      <p>
        Once you have HSL, tweak individual properties. Need a darker version? Lower lightness. Want
        a muted version? Reduce saturation. HEX doesn't give you that control.
      </p>
      <h2>Hex vs HSL: What's Different?</h2>
      <p>
        HEX is a compact way to represent <Link href="/convert-hex-to-rgb">RGB values</Link>. It's
        perfect for defining colors in CSS and HTML, but it's not intuitive to adjust.
      </p>
      <p>
        HSL describes colors by their visual properties. Hue is the color type (red, blue, green).
        Saturation is how intense it is. Lightness is how bright or dark. This matches how people
        perceive color, making it easier to create variations and relationships between colors.
      </p>
      <h2>Why Use This Converter</h2>
      <p>
        Quick conversion from fixed HEX codes to adjustable HSL values. Enter HEX, get HSL, then
        tweak as needed.
      </p>
      <p>
        Works anywhere. Convert HEX colors to HSL for your next web project, adjust themes, or
        experiment with color palettes. All from your phone or laptop.
      </p>
    </Container>
  );
}
