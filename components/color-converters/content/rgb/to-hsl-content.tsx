import Link from 'next/link';

import { Container } from '@/components/container';

export default function RgbHslContent() {
  return (
    <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
      <h1>RGB to HSL Conversion – Easily Convert Colors Online</h1>
      <p>
        The <strong>RGB (Red, Green, Blue)</strong> and{' '}
        <strong>HSL (Hue, Saturation, Lightness)</strong> color models are widely used in digital
        design. RGB is the primary format for screens, while HSL provides a more intuitive way to
        adjust colors based on their hue, saturation, and lightness.
      </p>
      <p>
        Our <strong>RGB to HSL converter</strong> allows designers and developers to{' '}
        <em>quickly and accurately</em> switch between these formats, ensuring perfect color harmony
        in UI/UX, web design, and branding.
      </p>

      <h2>What is RGB and HSL?</h2>
      <p>
        <Link href="/color-models/rgb">
          <strong>RGB (Red, Green, Blue)</strong>
        </Link>{' '}
        is an <em>additive color model</em> used in digital displays. Colors are created by
        adjusting the intensity of red, green, and blue light.
      </p>
      <p>
        <Link href="/color-models/hsl">
          <strong>HSL (Hue, Saturation, Lightness)</strong>
        </Link>{' '}
        is a more <em>human-friendly</em> way of defining colors. It represents colors in terms of:
      </p>
      <ul>
        <li>
          <strong>Hue (H):</strong> The color type (0° to 360°, where 0° is red, 120° is green, and
          240° is blue).
        </li>
        <li>
          <strong>Saturation (S):</strong> Intensity of the color (0% is grayscale, 100% is full
          color).
        </li>
        <li>
          <strong>Lightness (L):</strong> The brightness of the color (0% is black, 100% is white).
        </li>
      </ul>

      <h2>Why Convert RGB to HSL?</h2>
      <p>
        <strong>HSL makes color adjustments easier</strong> because it aligns with how people
        perceive color. Some benefits include:
      </p>
      <ul>
        <li>
          <strong>Better UI/UX Design:</strong> Easily adjust colors for web and mobile interfaces.
        </li>
        <li>
          <strong>Simplified Styling:</strong> HSL is widely used in CSS to tweak colors
          efficiently.
        </li>
        <li>
          <strong>Improved Accessibility:</strong> Adjusting saturation and lightness helps with
          contrast and readability.
        </li>
      </ul>

      <h2>How to Convert RGB to HSL for Free?</h2>
      <p>
        Our <strong>RGB to HSL converter</strong> simplifies the process. Just enter your
        <strong>RGB values (0-255)</strong>, and our tool will instantly return the
        <strong>corresponding HSL values</strong>.
      </p>
      <p>
        <strong>Why use our tool?</strong>
      </p>
      <ul>
        <li>
          <strong>Instant and accurate conversions</strong> – No complex calculations required.
        </li>
        <li>
          <strong>Free and unlimited</strong> – Convert as many colors as you need.
        </li>
        <li>
          <strong>Perfect for designers and developers</strong> – Easily adjust colors in CSS and
          digital art.
        </li>
      </ul>

      <h2>RGB to HSL Conversion Formula</h2>
      <p>If you want to manually convert RGB to HSL, use the following formula:</p>
      <p>
        <code>
          R', G', B' = R/255, G/255, B/255 <br />
          Max = max(R', G', B') <br />
          Min = min(R', G', B') <br />
          L = (Max + Min) / 2 <br />
          If Max == Min → H = 0, S = 0 <br />
          Else:
          <br />
          Δ = Max - Min <br />
          S = Δ / (1 - |2L - 1|) <br />
          H = Based on which color is Max:
          <br />
          If R' is Max → H = (G' - B') / Δ (mod 6) * 60° <br />
          If G' is Max → H = (B' - R') / Δ + 2 * 60° <br />
          If B' is Max → H = (R' - G') / Δ + 4 * 60° <br />
        </code>
      </p>
      <p>
        Example: <strong>RGB (255, 87, 51) → HSL (10°, 100%, 60%)</strong>
      </p>

      <h2>Convert More Colors – Try Our Free Tools</h2>
      <p>Need additional color conversions? Explore our:</p>
      <ul>
        <li>
          <Link href="/convert-hsl-to-rgb">HSL to RGB Converter</Link> – Convert back to RGB easily.
        </li>
        <li>
          <Link href="/convert-rgb-to-hex">RGB to Hex Converter</Link> – Perfect for web design.
        </li>
        <li>
          <Link href="/convert-rgb-to-cmyk">RGB to CMYK Converter</Link> – Get print-ready colors.
        </li>
      </ul>
      <p>
        Whether you're working on <strong>web development, digital design, or branding</strong>, our{' '}
        <strong>RGB to HSL converter</strong> is the perfect tool to help you achieve{' '}
        <em>consistent and accessible color designs</em>. Try it now!
      </p>
    </Container>
  );
}
